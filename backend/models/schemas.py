from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Course(BaseModel):
    course_code: str
    course_name: str

class PaperMetadata(BaseModel):
    paper_id: str
    course_code: str
    course_name: str
    exam_type: str
    semester: str
    slot: str
    file_url: str
    file_name: str
    uploaded_at: datetime

class NoteMetadata(BaseModel):
    note_id: str
    course_code: str
    course_name: str
    title: str
    semester: str
    slot: str
    file_type: str
    file_url: str
    file_name: str
    uploaded_at: datetime

class SearchResponse(BaseModel):
    course_code: str
    course_name: str

class UploadResponse(BaseModel):
    success: bool
    message: str
    file_url: Optional[str] = None
    file_id: Optional[str] = None