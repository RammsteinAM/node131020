module.exports = (f) => (req, res, next) => {
    try {
        f(req, res, next);
        next();
    } catch (error) {
        next(error);
    }
}