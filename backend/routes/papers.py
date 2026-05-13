from fastapi import APIRouter, File, UploadFile, Form, HTTPException
from typing import List
import uuid
from datetime import datetime
from services.firebase_service import upload_file_to_storage, save_paper_metadata, get_papers_by_course

router = APIRouter()

@router.post("/upload-paper")
async def upload_paper(
    file: UploadFile = File(...),
    course_code: str = Form(...),
    course_name: str = Form(...),
    exam_type: str = Form(...),
    semester: str = Form(...),
    slot: str = Form(...)
):
    """Upload a question paper PDF"""
    try:
        if not file.filename.endswith('.pdf'):
            raise HTTPException(status_code=400, detail="Only PDF files are allowed")
        
        file_extension = file.filename.split('.')[-1]
        unique_filename = f"papers/{course_code}/{uuid.uuid4()}.{file_extension}"
        
        file_url = await upload_file_to_storage(file, unique_filename)
        
        metadata = {
            "paper_id": str(uuid.uuid4()),
            "course_code": course_code,
            "course_name": course_name,
            "exam_type": exam_type,
            "semester": semester,
            "slot": slot,
            "file_url": file_url,
            "file_name": file.filename,
            "uploaded_at": datetime.now().isoformat(),
            "type": "question_paper"
        }
        
        await save_paper_metadata(metadata)
        
        return {
            "success": True,
            "message": "Paper uploaded successfully",
            "paper_id": metadata["paper_id"],
            "file_url": file_url
        }
        
    except Exception as e:
        print(f"Upload error: {e}")
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

@router.get("/papers/{course_code}")
async def get_papers(course_code: str):
    """Get all question papers for a specific course"""
    try:
        papers = await get_papers_by_course(course_code)
        return papers
    except Exception as e:
        print(f"Error fetching papers: {e}")
        return []