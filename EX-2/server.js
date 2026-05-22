// EX-2: API for Course Records
import express from 'express';
import courses from './course.js';

const app = express();
const PORT = 3000;

// Q1 + Q2 + Q3 + Q4 — GET /departments/:dept/courses
// Supports query params: level, minCredits, maxCredits, semester, instructor
app.get('/departments/:dept/courses', (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;

    // Q4 – Edge case: invalid credit range
    if (minCredits !== undefined && maxCredits !== undefined) {
        const min = parseInt(minCredits);
        const max = parseInt(maxCredits);
        if (!isNaN(min) && !isNaN(max) && min > max) {
            return res.status(400).json({
                error: 'Invalid credit range: minCredits cannot be greater than maxCredits.'
            });
        }
    }

    // Q3 – Filter by dept from route param, then apply query param filters
    let results = courses.filter(course => {
        // Match department (case-insensitive)
        if (course.department.toLowerCase() !== dept.toLowerCase()) return false;

        // Filter by level
        if (level && course.level !== level) return false;

        // Filter by minCredits
        if (minCredits !== undefined) {
            const min = parseInt(minCredits);
            if (!isNaN(min) && course.credits < min) return false;
        }

        // Filter by maxCredits
        if (maxCredits !== undefined) {
            const max = parseInt(maxCredits);
            if (!isNaN(max) && course.credits > max) return false;
        }

        // Filter by semester
        if (semester && course.semester !== semester) return false;

        // Filter by instructor (partial match, case-insensitive)
        if (instructor && !course.instructor.toLowerCase().includes(instructor.toLowerCase())) return false;

        return true;
    });

    // Q4 – Edge case: no matching courses
    if (results.length === 0) {
        return res.status(404).json({
            results: [],
            meta: { total: 0 },
            message: `No courses found for department "${dept}" with the given filters.`
        });
    }

    res.json({
        results,
        meta: { total: results.length }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
