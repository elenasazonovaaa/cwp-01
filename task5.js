
var fs = require('fs');
var path = require('path');

var pathDirectory = process.argv[2];

var stringScript = "\
var fs = require('fs');\n\
var path = require('path');\n\
var pathDirectory = '" + pathDirectory.replace(/\\/gi, '/') + "/' \n\
function readDir(base){\n \
    fs.readdir(base, function(err, files){\n \
        files.forEach(function(item){ \n\
            fs.stat(base + '/' + item, function(err, state){\n \
                if(state.isDirectory()){\n \
                    localBase = base + '/' + item;\n \
                    readDir(localBase);\n \
                } else {\n \
                    console.log(path.relative(pathDirectory, base + '/' + item));\n \
                } \n \
            });\n \
        });\n \
    });}\n\n\
readDir(pathDirectory); \n\
function createDir(base){\n" +
    "        var normPath = path.normalize(base);\n" +
    "        var dirs = normPath.split('\\\\');\n" +
    "        var lastDir = dirs.pop();\n" +
    "        if(lastDir == '') {\n" +
    "            lastDir = dirs.pop();\n" +
    "        }\n" +
    "        var newDir = base + '\\\\' + lastDir;\n" +
    "        fs.mkdir(newDir, function (error) {\n" +
    "        if (error) {\n" +
    "            console.error('');\n" +
    "        }\n" +
    "    });\n" +
    "    return newDir;\n" +
    "};\n" +
    "var dirForTxt = createDir(pathDirectory);\
      ";

if (pathDirectory != undefined){

    fs.stat(pathDirectory, function(err, stats) {

        if (err || !(stats.isDirectory())) {
            console.error("Неверный путь!");
        }
        else {

            fs.writeFile(pathDirectory + '\\summary.js', stringScript, function(error){
                if (error)
                    console.error("Ошибка создания файла!");
            });

            console.log("Файл создан!");
        }
    });
} else {
    console.error("Введите путь к файлу!");
}
