// logger.js - Global logging middleware

const logger = (req, res, next) => {
    console.log({
        method: req.method,
        path: req.path,
        query: req.query,
        timestamp: new Date().toISOString()
    });
    next();
};

export default logger;