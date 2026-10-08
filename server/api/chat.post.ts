import { GoogleGenerativeAI } from '@google/generative-ai'



export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { messages } = body as { messages: Array<{ role: string; content: string }> }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw createError({ statusCode: 400, statusMessage: 'No messages provided' })
    }

    const config = useRuntimeConfig(event)
    const apiKey = config.geminiApiKey || process.env.GEMINI_API_KEY || ''

    if (!apiKey) {
      throw createError({ statusCode: 500, statusMessage: 'API key not configured' })
    }

    // Clean and validate messages for Gemini API
    const validContents = messages
      .filter((m) => m && m.content && typeof m.content === 'string' && m.content.trim())
      .map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content.trim() }],
      }))

    // Gemini requires conversation history to start with a 'user' message
    while (validContents.length > 0 && validContents[0].role !== 'user') {
      validContents.shift()
    }

    if (validContents.length === 0) {
      throw createError({ statusCode: 400, statusMessage: 'No valid user messages found' })
    }

    const payload = {
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents: validContents,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    }

    const candidateModels = [
      'gemini-2.5-flash-lite',
      'gemini-2.5-flash',
      'gemini-flash-latest',
      'gemini-flash-lite-latest',
    ]

    let replyText = ''
    let lastError: any = null

    for (const model of candidateModels) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          }
        )

        if (res.ok) {
          const data = await res.json()
          replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
          if (replyText) break
        } else {
          const err = await res.json().catch(() => ({}))
          console.error(`Gemini model ${model} failed (${res.status}):`, err)
          lastError = err
        }
      } catch (err: any) {
        console.error(`Gemini fetch error for ${model}:`, err)
        lastError = err
      }
    }

    if (!replyText) {
      console.error('All Gemini models failed. Last error:', lastError)
      throw createError({
        statusCode: 500,
        statusMessage: lastError?.error?.message || 'Failed to generate response from AI',
      })
    }

    // Log to Google Sheets asynchronously in background (non-blocking)
    const lastUserQuestion = validContents[validContents.length - 1]?.parts?.[0]?.text || ''
    const googleSheetWebhookUrl = 'https://script.google.com/macros/s/AKfycbzXuGi-IFDZiI56KaZ5nmfpu_Dgw0HbExhLGgtO4e0uJMFDrUIHspd3p1t26GxDqRT6Ig/exec'
    
    fetch(googleSheetWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: lastUserQuestion,
        reply: replyText,
        lang: (body as any).lang || 'ar',
      }),
    }).catch((err) => console.error('Google Sheet logging error:', err))

    return { reply: replyText }
  } catch (error: any) {
    console.error('Chat endpoint handler error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Internal Server Error',
    })
  }
})
