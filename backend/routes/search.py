from fastapi import APIRouter, Query
from typing import List
from services.course_data import search_courses, get_all_courses

router = APIRouter()

@router.get("/search")
async def search_courses_endpoint(q: str = Query(..., min_length=1)):
    """Search for courses by code or name"""
    results = search_courses(q)
    return results

@router.get("/courses")
async def get_all_courses_endpoint():
    """Get all available courses"""
    return get_all_courses()