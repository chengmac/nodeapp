exports.handleError = ({ res, err, message, code }) => {
    code ? res.status(code).send({ success: false, err, message}) : res.send({ success: false, err, message});
};

exports.handleSuccess = ({ res, message, result }) => {
    res.send({ success: true, message, result });
};
