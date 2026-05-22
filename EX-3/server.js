// server.js
import express from 'express';
import courses from "./course.js";
import logger from "./logger.js";
import validateQuery from "./validateQuery.js";
import auth from "./auth.js";

const app = express();
const PORT = 3000;

// Q1: Apply logger globally - logs every incoming request
app.use(logger);

// Route: GET /departments/:dept/courses
// Q2: validateQuery applied to this route only
// Q3: auth applied to this route only (Bonus)
app.get('/departments/:dept/courses', auth, validateQuery, (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;

    const min = minCredits !== undefined ? parseInt(minCredits) : null;
    const max = maxCredits !== undefined ? parseInt(maxCredits) : null;

    const results = courses.filter(course => {
        if (course.department.toLowerCase() !== dept.toLowerCase()) return false;
        if (level && course.level !== level) return false;
        if (min !== null && course.credits < min) return false;
        if (max !== null && course.credits > max) return false;
        if (semester && course.semester !== semester) return false;
        if (instructor && !course.instructor.toLowerCase().includes(instructor.toLowerCase())) return false;
        return true;
    });

    res.json({
        results,
        meta: { total: results.length }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});