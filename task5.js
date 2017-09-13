
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
