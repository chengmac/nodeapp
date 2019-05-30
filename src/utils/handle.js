exports.handleError = ({ res, err, message, code }) => {
    code ? res.status(code).jsonp({ status: "failed", error: err, message}) : res.jsonp({ status: "failed", error: err, message});
};

exports.handleSuccess = ({ res, message, result }) => {
    res.jsonp({ status: "success", message, result });
};