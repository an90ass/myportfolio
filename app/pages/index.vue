<template>
  <main class="min-h-screen bg-bg-primary dark:bg-bg-primary transition-colors duration-300"
        :class="{ 'bg-light-primary': colorMode.value !== 'dark' }">
    <NavBar />
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-6">
      <HeroSection />
      <AboutSection />
          <TechStack />
      <ServicesSection />
      <ProjectGrid />
  
      <ExperienceSection />
      <ContactSection />
    </div>
    <FooterSection />
  </main>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
</script>
