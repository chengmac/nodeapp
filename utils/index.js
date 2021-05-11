module.exports = {
    cookieToJson(cookie) {
        if (!cookie) return {}
        let cookieArr = cookie.split(';')
        let obj = {}
        cookieArr.forEach((i) => {
        let arr = i.split('=')
        obj[arr[0]] = arr[1]
        })
        return obj
    },
    /**
     * @getClientIP
     * @desc 获取用户 ip 地址
     * @param {Object} req - 请求
     */
    getClientIP(req) {
        return req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
            req.connection.remoteAddress || // 判断 connection 的远程 IP
            req.socket.remoteAddress || // 判断后端的 socket 的 IP
            req.connection.socket.remoteAddress;
    }
}
