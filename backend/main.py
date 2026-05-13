from fastapi import FastAPI, File, UploadFile, Form, HTTPException, Query, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, RedirectResponse
from sqlalchemy.orm import Session
from dotenv import load_dotenv
import uuid
from datetime import datetime
import os
import re
import cloudinary
import cloudinary.uploader

load_dotenv()

from database import get_db, Paper, Note, engine
from services.course_data import search_courses, get_all_courses

from database import Base
Base.metadata.create_all(bind=engine)

CLOUD_NAME = os.getenv('CLOUDINARY_CLOUD_NAME')
API_KEY = os.getenv('CLOUDINARY_API_KEY')
API_SECRET = os.getenv('CLOUDINARY_API_SECRET')

cloudinary.config(
    cloud_name=CLOUD_NAME,
    api_key=API_KEY,
    api_secret=API_SECRET,
    secure=True
)

app = FastAPI(title="Software Engineering Archive API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def clean_filename(text):
    """Remove special characters that cause URL issues"""
    text = text.replace('+', '_')
    text = text.replace(' ', '_')
    text = re.sub(r'[^a-zA-Z0-9_]', '_', text)
    return text

# ============ SEARCH ============
@app.get("/api/search")
async def search_courses_endpoint(q: str = Query(..., min_length=1)):
    return search_courses(q)

@app.get("/api/courses")
async def get_all_courses_endpoint():
    return get_all_courses()

# ============ UPLOAD PAPER - USING image RESOURCE TYPE FOR PDFs ============
@app.post("/api/upload-paper")
async def upload_paper(
    file: UploadFile = File(...),
    course_code: str = Form(...),
    course_name: str = Form(...),
    exam_type: str = Form(...),
    semester: str = Form(...),
    slot: str = Form(...),
    db: Session = Depends(get_db)
):
    try:
        is_pdf = file.filename.lower().endswith('.pdf')
        
        # CRITICAL: Use "image" resource type for PDFs (NOT "raw")
        # Cloudinary handles PDFs correctly when uploaded as "image"
        resource_type = "image"  # For both PDFs and images
        
        # Clean special characters
        clean_slot = clean_filename(slot)
        clean_exam = clean_filename(exam_type)
        
        # Create public ID
        public_id = f"{clean_exam}_{clean_slot}_{uuid.uuid4().hex[:8]}"
        
        upload_params = {
            "file": file.file,
            "folder": f"se_archive/{course_code}",
            "public_id": public_id,
            "resource_type": resource_type,
            "use_filename": True,
            "unique_filename": True
        }
        
        # Add format for PDFs to ensure proper handling
        if is_pdf:
            upload_params["format"] = "pdf"
        
        upload_result = cloudinary.uploader.upload(**upload_params)
        
        file_url = upload_result.get('secure_url')
        
        paper = Paper(
            paper_id=str(uuid.uuid4()),
            course_code=course_code,
            course_name=course_name,
            exam_type=exam_type,
            semester=semester,
            slot=slot,
            file_url=file_url,
            file_name=file.filename,
            file_type="PDF" if is_pdf else "Image",
            uploaded_at=datetime.now()
        )
        
        db.add(paper)
        db.commit()
        
        return {
            "success": True,
            "message": "Upload successful",
            "paper_id": paper.paper_id,
            "file_url": file_url
        }
        
    except Exception as e:
        print(f"Error: {e}")
        return JSONResponse(status_code=500, content={"success": False, "message": str(e)})

# ============ GET PAPERS ============
@app.get("/api/papers/{course_code}")
async def get_papers(course_code: str, db: Session = Depends(get_db)):
    papers = db.query(Paper).filter(Paper.course_code == course_code).all()
    return [{
        "paper_id": p.paper_id,
        "course_code": p.course_code,
        "course_name": p.course_name,
        "exam_type": p.exam_type,
        "semester": p.semester,
        "slot": p.slot,
        "file_url": p.file_url,
        "file_name": p.file_name,
        "file_type": p.file_type,
        "uploaded_at": p.uploaded_at.isoformat() if p.uploaded_at else None
    } for p in papers]

# ============ UPLOAD NOTE ============
@app.post("/api/upload-note")
async def upload_note(
    file: UploadFile = File(...),
    course_code: str = Form(...),
    course_name: str = Form(...),
    title: str = Form(...),
    semester: str = Form(...),
    slot: str = Form(...),
    file_type: str = Form(...),
    db: Session = Depends(get_db)
):
    try:
        is_pdf = file.filename.lower().endswith('.pdf')
        resource_type = "image"  # Use "image" for both PDFs and images
        
        clean_title = clean_filename(title)
        clean_slot = clean_filename(slot)
        
        public_id = f"{clean_title}_{clean_slot}_{uuid.uuid4().hex[:8]}"
        
        upload_params = {
            "file": file.file,
            "folder": f"se_archive/{course_code}/notes",
            "public_id": public_id,
            "resource_type": resource_type,
            "use_filename": True,
            "unique_filename": True
        }
        
        if is_pdf:
            upload_params["format"] = "pdf"
        
        upload_result = cloudinary.uploader.upload(**upload_params)
        
        file_url = upload_result.get('secure_url')
        
        note = Note(
            note_id=str(uuid.uuid4()),
            course_code=course_code,
            course_name=course_name,
            title=title,
            semester=semester,
            slot=slot,
            file_type=file_type,
            file_url=file_url,
            file_name=file.filename,
            uploaded_at=datetime.now()
        )
        
        db.add(note)
        db.commit()
        
        return {
            "success": True,
            "message": "Note uploaded successfully",
            "note_id": note.note_id,
            "file_url": file_url
        }
        
    except Exception as e:
        print(f"Error: {e}")
        return JSONResponse(status_code=500, content={"success": False, "message": str(e)})

# ============ GET NOTES ============
@app.get("/api/notes/{course_code}")
async def get_notes(course_code: str, db: Session = Depends(get_db)):
    notes = db.query(Note).filter(Note.course_code == course_code).all()
    return [{
        "note_id": n.note_id,
        "course_code": n.course_code,
        "course_name": n.course_name,
        "title": n.title,
        "semester": n.semester,
        "slot": n.slot,
        "file_type": n.file_type,
        "file_url": n.file_url,
        "file_name": n.file_name,
        "uploaded_at": n.uploaded_at.isoformat() if n.uploaded_at else None
    } for n in notes]

@app.get("/api/notes/search")
async def search_notes(course_code: str, db: Session = Depends(get_db)):
    notes = db.query(Note).filter(Note.course_code == course_code).all()
    return [{
        "note_id": n.note_id,
        "course_code": n.course_code,
        "course_name": n.course_name,
        "title": n.title,
        "semester": n.semester,
        "slot": n.slot,
        "file_type": n.file_type,
        "file_url": n.file_url,
        "file_name": n.file_name,
        "uploaded_at": n.uploaded_at.isoformat() if n.uploaded_at else None
    } for n in notes]

# ============ VIEW FILE ============
@app.get("/api/view/{item_type}/{item_id}")
async def view_file(item_type: str, item_id: str, db: Session = Depends(get_db)):
    if item_type == "paper":
        item = db.query(Paper).filter(Paper.paper_id == item_id).first()
    else:
        item = db.query(Note).filter(Note.note_id == item_id).first()
    
    if item:
        return RedirectResponse(url=item.file_url)
    
    raise HTTPException(status_code=404, detail="File not found")

# ============ DOWNLOAD FILE ============
@app.get("/api/download/{item_type}/{item_id}")
async def download_file(item_type: str, item_id: str, db: Session = Depends(get_db)):
    if item_type == "paper":
        item = db.query(Paper).filter(Paper.paper_id == item_id).first()
    else:
        item = db.query(Note).filter(Note.note_id == item_id).first()
    
    if item:
        if '?' in item.file_url:
            download_url = item.file_url + "&attachment=true"
        else:
            download_url = item.file_url + "?attachment=true"
        
        return RedirectResponse(url=download_url)
    
    raise HTTPException(status_code=404, detail="File not found")

# ============ STATS ============
@app.get("/api/stats")
async def get_stats(db: Session = Depends(get_db)):
    total_papers = db.query(Paper).count()
    total_notes = db.query(Note).count()
    total_courses = len(get_all_courses())
    
    return {
        "totalPapers": total_papers,
        "totalNotes": total_notes,
        "totalCourses": total_courses
    }

# ============ CLEAR DATABASE ============
@app.delete("/api/clear-all")
async def clear_all(db: Session = Depends(get_db)):
    db.query(Paper).delete()
    db.query(Note).delete()
    db.commit()
    return {"message": "All data cleared"}

@app.get("/")
async def root():
    return {"message": "Software Engineering Archive API", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)