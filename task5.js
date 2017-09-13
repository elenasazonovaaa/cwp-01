
var fs = require('fs');
var path = require('path');

var pathD = process.argv[2];

var stringScript = "";
if (pathD != undefined){

    fs.stat(pathD, function(err, stats) {

        if (err || !(stats.isDirectory())) {
            console.error("Неверный путь!");
        }
        else {

            fs.writeFile(pathD + '\\summary.js', stringScript, function(error){
                if (error)
                    console.error("Ошибка создания файла!");
            });

            console.log("Файл создан!");
        }
    });
} else {
    console.error("Введите путь к файлу!");
}
