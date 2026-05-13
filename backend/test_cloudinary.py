import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv
import os

load_dotenv()

print("Testing Cloudinary...")
print(f"Cloud Name: {os.getenv('CLOUDINARY_CLOUD_NAME')}")
print(f"API Key: {os.getenv('CLOUDINARY_API_KEY')[:10]}...")

cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET'),
    secure=True
)

# Test upload with a simple text
try:
    result = cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/sample.jpg")
    print("✅ Cloudinary is working!")
    print(f"Test upload URL: {result['secure_url']}")
except Exception as e:
    print(f"❌ Cloudinary error: {e}")