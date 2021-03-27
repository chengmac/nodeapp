/**
 * 路由拦截器
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const interceptor = (req, res, next) => {
    // Set Header
    const allowedOrigins = [
        'http://localhost:8000',
        'http://localhost:8001',
        'https://admin.chengmac.cn',
        'https://chengmac.cn',
        'https://www.chengmac.cn'
    ];
    const origin = req.headers.origin || '';
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, No-Cache, X-Requested-With, If-Modified-Since,' +
    'Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With');
    res.header('Access-Control-Allow-Methods', 'PUT,PATCH,POST,GET,DELETE,OPTIONS');
    res.header('Access-Control-Max-Age', '1728000');
    res.header('Access-Control-Allow-Credentials', true);
    // res.header('Content-Type', 'application/json;charset=utf-8');
    res.header('X-Powered-By', 'nodeapp 0.0.1');

    // OPTIONS
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
        return false;
    }
    console.log(getClientIP(req))
    next();
}

/**
 * @getClientIP
 * @desc 获取用户 ip 地址
 * @param {Object} req - 请求
 */
function getClientIP(req) {
    return req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
        req.connection.remoteAddress || // 判断 connection 的远程 IP
        req.socket.remoteAddress || // 判断后端的 socket 的 IP
        req.connection.socket.remoteAddress;
}

module.exports = interceptor;
