from fastapi import APIRouter, HTTPException
from services.firebase_service import get_stats

router = APIRouter()

@router.get("/stats")
async def get_platform_stats():
    """Get real-time platform statistics"""
    try:
        stats = await get_stats()
        return stats
    except Exception as e:
        print(f"Stats error: {e}")
        from services.course_data import get_all_courses
        return {
            "totalPapers": 0,
            "totalNotes": 0,
            "totalCourses": len(get_all_courses())
        }