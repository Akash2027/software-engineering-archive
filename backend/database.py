from sqlalchemy import create_engine, Column, String, Integer, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from datetime import datetime

DATABASE_URL = "sqlite:///./vit_archive.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Paper(Base):
    __tablename__ = "papers"
    
    id = Column(Integer, primary_key=True, index=True)
    paper_id = Column(String, unique=True, index=True)
    course_code = Column(String, index=True)
    course_name = Column(String)
    exam_type = Column(String)
    semester = Column(String)
    slot = Column(String)
    file_url = Column(String)
    file_name = Column(String)
    file_type = Column(String, default="PDF")  # PDF, JPEG, PNG, etc.
    uploaded_at = Column(DateTime, default=datetime.now)

class Note(Base):
    __tablename__ = "notes"
    
    id = Column(Integer, primary_key=True, index=True)
    note_id = Column(String, unique=True, index=True)
    course_code = Column(String, index=True)
    course_name = Column(String)
    title = Column(String)
    semester = Column(String)
    slot = Column(String)
    file_type = Column(String)
    file_url = Column(String)
    file_name = Column(String)
    uploaded_at = Column(DateTime, default=datetime.now)

# Create tables
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()