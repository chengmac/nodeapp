exports.handleRequest = ({ req, res, controller }) => {
    const method = req.method;
    controller[method] ? controller[method](req, res) : res.status(405).jsonp({ code: 0, message: '不支持该请求类型！' });
};

exports.handleError = ({ res, message = '请求失败', err }) => {
    res.jsonp({ code: 0, message, err });
};

exports.handleSuccess = ({ res, message = '请求成功', result }) => {
    res.jsonp({ code: 1, message, result });
};