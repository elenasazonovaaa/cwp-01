
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
      function moveTxtFile(from, to){\n" +
    "fs.readFile('config.json', function (err, data) {\n" +
    "    if(err){\n" +
    "        console.error('Ошибка чтения коппирайта!');\n" +
    "    } else {\n" +
    "        var copyright = JSON.parse(data.toString());\n" +
    "        fs.readdir(from, function(err, files){\n" +
    "            files.forEach(function(item){\n" +
    "                fs.stat(from + '/' + item, function(err, state){\n" +
    "                    if(state.isDirectory()){\n" +
    "                        localBase = from + '/' + item;\n" +
    "                        moveTxtFile(localBase, to);\n" +
    "                    } else {\n" +
    "                        if (path.extname(item).toLowerCase() == '.txt') {\n" +
    "                            var newData = '';\n" +
    "                            fs.readFile(from + '/' + item, function(err, data) {\n" +
    "                                if (err) {\n" +
    "                                    console.error('');\n" +
    "                                } else {\n" +
    "                                    newData = copyright.copyright + data.toString() + copyright.copyright;\n" +
    "                                    fs.writeFile(from + '/' + item, newData, 'utf8', function () {});\n" +
    "                                    fs.rename(from + '/' + item, to + '/' + item, function () {});\n" +
    "                                }\n" +
    "                            });\n" +
    "                        }\n" +
    "                    }\n" +
    "                });\n" +
    "            });\n" +
    "        });\n" +
    "    }\n" +
    "});\n" +
    "}\n" +
    "moveTxtFile(pathDirectory, dirForTxt);"
;

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
