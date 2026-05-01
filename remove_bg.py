from PIL import Image
import sys

def make_transparent(input_path, output_path):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()

    new_data = []
    # Identify the background color (assuming top-left pixel is background)
    bg_color = datas[0]
    
    # We allow some tolerance for near-white pixels
    tolerance = 30 
    
    for item in datas:
        # Check if pixel is white-ish
        if item[0] > 255 - tolerance and item[1] > 255 - tolerance and item[2] > 255 - tolerance:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Transparency applied. Saved to {output_path}")

if __name__ == "__main__":
    input_file = r"C:\Users\Systems\.gemini\antigravity\brain\354f49e5-feb8-4700-8c24-a713cb72647f\rota4mundos_logo_variations_1_1777642415292.png"
    output_file = r"C:\Users\Systems\.gemini\antigravity\brain\354f49e5-feb8-4700-8c24-a713cb72647f\rota4mundos_logo_transparent.png"
    make_transparent(input_file, output_file)
