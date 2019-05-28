const interceptor = (req, res, next) => {
    // Set Header
    const allowedOrigins = ['http://localhost:3000', 'https://admin.chengmac.top'];
    const origin = req.headers.origin || '';
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    };
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, No-Cache, X-Requested-With, If-Modified-Since,' + 
    'Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With');
    res.header('Access-Control-Allow-Methods', 'PUT,PATCH,POST,GET,DELETE,OPTIONS');
    res.header('Access-Control-Max-Age', '1728000');
    res.header('Content-Type', 'application/json;charset=utf-8');
    res.header('X-Powered-By', 'nodeapp 1.0.0');

    // OPTIONS
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
        return false;
    };
    next();
} 

module.exports = interceptor;