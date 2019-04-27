exports.handleRequest = ({ req, res, controller }) => {
    const path = req.path.slice(1);
    controller[path] ? controller[path](req, res) : res.status(405).jsonp({ status: "error", message: '不支持该请求类型！' });
};

exports.handleError = ({ res, err, message, code }) => {
    code ? res.status(code).jsonp({ status: "failed", error: err, message}) : res.jsonp({ status: "failed", error: err, message});
};

exports.handleSuccess = ({ res, message, result }) => {
    res.jsonp({ status: "success", message, result });
};