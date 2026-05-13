from fastapi import APIRouter, File, UploadFile, Form, HTTPException
from typing import List
import uuid
from datetime import datetime
from services.firebase_service import upload_file_to_storage, save_note_metadata, get_notes_by_course, search_notes_by_course

router = APIRouter()

@router.post("/upload-note")
async def upload_note(
    file: UploadFile = File(...),
    course_code: str = Form(...),
    course_name: str = Form(...),
    title: str = Form(...),
    semester: str = Form(...),
    slot: str = Form(...),
    file_type: str = Form(...)
):
    """Upload notes (PDF or Image)"""
    try:
        allowed_extensions = ['.pdf', '.jpg', '.jpeg', '.png']
        is_valid = False
        for ext in allowed_extensions:
            if file.filename.lower().endswith(ext):
                is_valid = True
                break
        
        if not is_valid:
            raise HTTPException(status_code=400, detail="Only PDF and image files are allowed")
        
        file_extension = file.filename.split('.')[-1]
        unique_filename = f"notes/{course_code}/{uuid.uuid4()}.{file_extension}"
        
        file_url = await upload_file_to_storage(file, unique_filename)
        
        metadata = {
            "note_id": str(uuid.uuid4()),
            "course_code": course_code,
            "course_name": course_name,
            "title": title,
            "semester": semester,
            "slot": slot,
            "file_type": file_type,
            "file_url": file_url,
            "file_name": file.filename,
            "uploaded_at": datetime.now().isoformat(),
            "type": "note"
        }
        
        await save_note_metadata(metadata)
        
        return {
            "success": True,
            "message": "Note uploaded successfully",
            "note_id": metadata["note_id"],
            "file_url": file_url
        }
        
    except Exception as e:
        print(f"Upload error: {e}")
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

@router.get("/notes/{course_code}")
async def get_notes(course_code: str):
    """Get all notes for a specific course"""
    try:
        notes = await get_notes_by_course(course_code)
        return notes
    except Exception as e:
        print(f"Error fetching notes: {e}")
        return []

@router.get("/notes/search")
async def search_notes(course_code: str):
    """Search notes by course code"""
    try:
        notes = await search_notes_by_course(course_code)
        return notes
    except Exception as e:
        print(f"Error searching notes: {e}")
        return []