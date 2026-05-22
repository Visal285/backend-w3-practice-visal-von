// validateQuery.js - Route-specific query validation middleware

const validateQuery = (req, res, next) => {
    const { minCredits, maxCredits } = req.query;

    // Check if minCredits is present and is a valid integer
    if (minCredits !== undefined) {
        const min = Number(minCredits);
        if (!Number.isInteger(min)) {
            return res.status(400).json({ error: 'Bad Request: minCredits must be a valid integer.' });
        }
    }

    // Check if maxCredits is present and is a valid integer
    if (maxCredits !== undefined) {
        const max = Number(maxCredits);
        if (!Number.isInteger(max)) {
            return res.status(400).json({ error: 'Bad Request: maxCredits must be a valid integer.' });
        }
    }

    // Check if minCredits > maxCredits
    if (minCredits !== undefined && maxCredits !== undefined) {
        if (Number(minCredits) > Number(maxCredits)) {
            return res.status(400).json({ error: 'Bad Request: minCredits cannot be greater than maxCredits.' });
        }
    }

    next();
};

export default validateQuery;