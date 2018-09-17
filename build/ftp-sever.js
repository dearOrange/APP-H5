var path = require("path")
var fs = require('fs');
var Client = require('ftp');
var ftp = new Client();

var list = [];

function readDirSync(dir) {
    var files = fs.readdirSync(dir)

    files.forEach(function(ele, index) {
        var file = dir + '/' + ele;

        var info = fs.statSync(file);
        if (info.isDirectory()) {
            readDirSync(file)
        } else {
            list.push(file);
        }
    })
}


// ftp连接成功后
ftp.on('ready', () => {
    list.forEach((item, index) => {
        uploadFile(item)
    })
})

//文件上传
function uploadFile(item) {
    var ftpFile = item.substring(dist.length);
    var ftpDir = ftpFile.substring(0, ftpFile.lastIndexOf('/') + 1)

    //判断目录是否存在
    ftp.get(config.ftpRoot + ftpDir, (err) => {
        if (err) {
            //创建新目录
            ftp.mkdir(config.ftpRoot + ftpDir, true, (err) => {
                console.log('上传', ftpFile)
                ftp.put(item, config.ftpRoot + ftpFile, (err) => {
                    if (err) {
                        console.log('文件上传失败', err)
                    }

                    ftp.end();
                })
            })
        } else {
            console.log('上传', ftpFile)
            ftp.put(item, config.ftpRoot + ftpFile, (err) => {
                if (err) {
                    console.log('文件上传失败', err)
                }
                ftp.end();
            })
        }
    })
}


//连接配置
var config = {
    host: "192.168.60.190",
    port: 80, // defaults to 21
    user: "gaoxw", // defaults to "anonymous"
    password: "gaoxw", // defaults to "@anonymous"
    ftpRoot: '/www.51cjml.com/'
};
//根目录
var dist = path.resolve(__dirname, '../dist');

//读取根目录下的所有文件
readDirSync(dist);

ftp.connect(config);
