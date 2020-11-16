exports.handleError = ({ res, err, message, code }) => {
    code ? res.status(code).jsonp({ success: false, error: err, message}) : res.jsonp({ success: false, error: err, message});
};

exports.handleSuccess = ({ res, message, result }) => {
    res.jsonp({ success: true, message, result });
};