const multer = require('multer');

let index = Math.floor(Math.random() * 100)
let fullName = ''
const headerConfig = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/src/static')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

exports.uplaods = multer({ storage: headerConfig });