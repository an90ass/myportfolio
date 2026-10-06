import qrcode
from PIL import Image, ImageDraw, ImageFont
import os
from pyzbar.pyzbar import decode as zbar_decode


def build_qr_image(data, center_text,
                    box_size=50,
                    quiet_zone_modules=4,   # QR STANDARD: >=4 modules
                    decor_gap_modules=0.2,  # تقريب الإطار من الـ QR
                    logo_scale=0.16):

    # --- الألوان الأساسية ---
    c_navy  = (4, 120, 87, 255)    # #047857 - الأساسي الداكن
    c_slate = (16, 185, 129, 255)  # #10B981 - الثانوي الزمردي
    c_white = (255, 255, 255, 255) # الأبيض

    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=1,
        border=0,
    )
    qr.add_data(data)
    qr.make(fit=True)

    matrix = qr.get_matrix()
    matrix_size = len(matrix)

    quiet_zone_px = quiet_zone_modules * box_size
    decor_gap_px = int(decor_gap_modules * box_size)
    frame_thickness = 25

    qr_dim = matrix_size * box_size
    margin = quiet_zone_px + decor_gap_px + frame_thickness
    img_size = qr_dim + (margin * 2)

    img = Image.new("RGBA", (img_size, img_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    def is_finder_pattern(row, col):
        if (row < 7 and col < 7) or (row < 7 and col >= matrix_size - 7) or (row >= matrix_size - 7 and col < 7):
            return True
        return False

    # --- center logo badge ---
    max_badge_w = qr_dim * logo_scale * 1.8
    max_badge_h = qr_dim * logo_scale

    def load_font(size):
        try:
            return ImageFont.truetype("arialbd.ttf", size)
        except IOError:
            try:
                return ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", size)
            except IOError:
                return ImageFont.load_default()

    font_size = max(24, int(qr_dim * logo_scale * 0.6))
    badge_pad_x = int(font_size * 0.5)
    badge_pad_y = int(font_size * 0.35)

    font = load_font(font_size)
    bbox = font.getbbox(center_text)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]

    while (tw + 2 * badge_pad_x > max_badge_w or th + 2 * badge_pad_y > max_badge_h) and font_size > 12:
        font_size -= 2
        badge_pad_x = int(font_size * 0.5)
        badge_pad_y = int(font_size * 0.35)
        font = load_font(font_size)
        bbox = font.getbbox(center_text)
        tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]

    bw = tw + (badge_pad_x * 2)
    bh = th + (badge_pad_y * 2)

    qr_origin = margin
    center_x = img_size // 2
    center_y = img_size // 2

    clear_margin = 15
    clear_box_left = center_x - (bw // 2) - clear_margin
    clear_box_top = center_y - (bh // 2) - clear_margin
    clear_box_right = center_x + (bw // 2) + clear_margin
    clear_box_bottom = center_y + (bh // 2) + clear_margin

    cleared_dark_modules = 0
    total_dark_modules = 0

    for r in range(matrix_size):
        for c in range(matrix_size):
            if matrix[r][c]:
                total_dark_modules += 1
                x1 = qr_origin + (c * box_size)
                y1 = qr_origin + (r * box_size)
                x2 = x1 + box_size
                y2 = y1 + box_size

                if not (x2 < clear_box_left or x1 > clear_box_right or y2 < clear_box_top or y1 > clear_box_bottom):
                    cleared_dark_modules += 1
                    continue

                if is_finder_pattern(r, c):
                    draw.rectangle([x1, y1, x2, y2], fill=c_navy)
                else:
                    draw.rounded_rectangle([x1 + 3, y1 + 3, x2 - 4, y2 - 4], radius=10, fill=c_navy)

    cleared_pct = cleared_dark_modules / total_dark_modules * 100

    # --- decorative frame ---
    frame_outer_pad = 10
    border_outer = [frame_outer_pad, frame_outer_pad, img_size - frame_outer_pad, img_size - frame_outer_pad]
    draw.rounded_rectangle(border_outer, radius=25, outline=c_slate, width=6)

    frame_inner_edge = qr_origin - decor_gap_px
    border_inner = [frame_inner_edge, frame_inner_edge, img_size - frame_inner_edge, img_size - frame_inner_edge]
    draw.rounded_rectangle(border_inner, radius=15, outline=c_navy, width=3)

    corner_radius = 8
    corners = [(frame_outer_pad, frame_outer_pad), (img_size - frame_outer_pad, frame_outer_pad),
               (frame_outer_pad, img_size - frame_outer_pad), (img_size - frame_outer_pad, img_size - frame_outer_pad)]
    for cx, cy in corners:
        draw.ellipse([cx - corner_radius, cy - corner_radius, cx + corner_radius, cy + corner_radius], fill=c_slate)

    # --- center badge ---
    badge_rect = [center_x - (bw // 2), center_y - (bh // 2), center_x + (bw // 2), center_y + (bh // 2)]
    draw.rounded_rectangle(badge_rect, radius=30, fill=c_navy, outline=c_slate, width=7)
    draw.rounded_rectangle([badge_rect[0] + 8, badge_rect[1] + 8, badge_rect[2] - 8, badge_rect[3] - 8],
                           radius=22, outline=c_slate, width=2)

    tx = center_x - (tw // 2) - bbox[0]
    ty = center_y - (th // 2) - bbox[1]
    draw.text((tx, ty), center_text, font=font, fill=c_white)

    return img, cleared_pct


def verify_scan(img):
    flat = Image.new("RGB", img.size, (255, 255, 255))
    flat.paste(img, mask=img.split()[3])
    results = zbar_decode(flat)
    if results:
        return True, results[0].data.decode("utf-8")
    return False, None


if __name__ == "__main__":
    data = "https://an90ass.github.io/myportfolio/"
    center_text = "#anas.dev"

    img, cleared_pct = build_qr_image(data, center_text)
    print(f"Cleared {cleared_pct:.1f}% of dark modules for the center logo.")

    ok, decoded = verify_scan(img)
    print(f"Scan test: {'PASS' if ok else 'FAIL'} -> {decoded}")

    if not ok:
        raise SystemExit("QR failed to decode.")

    output_filename = "anasqr2.png"
    img.save(output_filename)
    print(f"Saved successfully as '{output_filename}'. Final size: {img.size[0]}x{img.size[1]} px")