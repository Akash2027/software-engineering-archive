import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv
import os
import base64

load_dotenv()

# Configure Cloudinary
cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
    api_key=os.getenv('CLOUDINARY_API_KEY'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET'),
    secure=True
)

async def upload_to_cloudinary(file, folder, filename):
    """Upload a file to Cloudinary"""
    try:
        contents = await file.read()
        file_base64 = base64.b64encode(contents).decode('utf-8')
        
        upload_result = cloudinary.uploader.upload(
            f"data:{file.content_type};base64,{file_base64}",
            folder=folder,
            public_id=filename,
            resource_type="auto"
        )
        
        return upload_result.get('secure_url')
    except Exception as e:
        print(f"Cloudinary upload error: {e}")
        return None