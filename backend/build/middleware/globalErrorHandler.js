"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalErrorHandler = (err, req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
        const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
        return res.status(statusCode).json({
            status: err.status,
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack,
            error: process.env.NODE_ENV === 'production' ? null : err,
        });
    }
    // RENDERED WEBSITE
    // console.error('ERROR 💥', err);
    // return res.status(err.statusCode).render('error', {
    //   title: 'Something went wrong!',
    //   msg: err.message,
    // });
};
exports.default = globalErrorHandler;
