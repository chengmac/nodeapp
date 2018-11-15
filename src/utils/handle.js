exports.handleRequest = ({ req, res, controller }) => {
    const method = req.method;
    controller[method] ? controller[method](req, res) : res.status(405).jsonp({ code: 0, message: '不支持该请求类型！' });
};

exports.handleError = ({ res, err = null, message = '请求失败', code }) => {
    code ? res.status(code).jsonp({ code: 0, debug: err, message}) : res.jsonp({ code: 0, debug: err, message});
};

exports.handleSuccess = ({ res, message = '请求成功', result }) => {
    res.jsonp({ code: 1, message, result });
};