
const fs = require('fs');
const path = require('path');

const pathD = process.argv[2];
var config = "";
if(pathD == undefined) console.log(`Write PATH!!!!!!`);
else
{
    fs.readFile(`config.json`,function (err,data) {
        if(err) console.log(`Err in read json`);
        else
        {
            config = JSON.parse(data.toString());
            let strForSammary = "const fs = require('fs');\n" +
                "const path = require('path');\n" +
                "const pathD =\`" + pathD.replace(`\\`,`\\\\`) + "\`;\n" +
                "const config = \"" + config.copyright + "\";\n" +
                "function directoryScan (dirPath)\n" +
                "{\n" +
                "    fs.readdir(dirPath,function (err,items) {\n" +
                "        if(err) console.log(`Err in readdir function!`);\n" +
                "        else\n" +
                "        {\n" +
                "            for(let i = 0; i < items.length; i++)\n" +
                "            {\n" +
                "                let filePath = path.join(dirPath,items[i]);\n" +
                "                fs.stat(filePath,function (err,stat) {\n" +
                "                    if(err) console.log(err);\n" +
                "                    else\n" +
                "                    {\n" +
                "                        if(stat.isDirectory())\n" +
                "                        {\n" +
                "                            console.log(filePath.replace(pathD+`\\\\`,``));\n" +
                "                            directoryScan(filePath.toString());\n" +
                "                        }\n" +
                "                        if(stat.isFile())\n" +
                "                        {\n" +
                "                            console.log(filePath.replace(pathD+`\\\\`,``));\n" +
                "                        }\n" +
                "                    }\n" +
                "                })\n" +
                "            }\n" +
                "        }\n" +
                "\n" +
                "    });\n" +
                "}\n" +
                "directoryScan(pathD);" +
                "function createNewDirWithTXT(dirPath)\n" +
                "{\n" +
                "    let nameDir = dirPath.split(`\\\\`).pop();\n" +
                "    fs.mkdir(dirPath+`\\\\`+nameDir,function (err) {\n" +
                "        if(err) console.log(`Err in create dir for TXT`);\n" +
                "    });\n" +
                "    moveTXT(dirPath,nameDir);\n" +
                "}\n" +
                "createNewDirWithTXT(pathD);" +
                "function moveTXT(dirPath,nameDir)\n" +
                "{\n" +
                "    fs.readdir(dirPath,function (err,items) {\n" +
                "        if(err) console.log(`Err in seartch TXT`);\n" +
                "        else\n" +
                "        {\n" +
                "            for(let k = 0; k <items.length;k++)\n" +
                "            {\n" +
                "                if(path.extname(items[k]) === `.txt`)\n" +
                "                {\n" +
                "                    fs.readFile(dirPath+`\\\\`+items[k],function (err,data) {\n" +
                "                        if(err) console.log(` It's bad` + err);\n" +
                "                        else\n" +
                "                        {\n" +
                "                            fs.writeFile(\n" +
                "                                dirPath+`\\\\`+nameDir+`\\\\`+items[k],config+data.toString()+config,\n" +
                "                                function( err ) { if (err) console.log(`Err in move TXT`); }\n" +
                "                            )\n" +
                "                            fs.watch(dirPath,function (eventType,filename) {\n" +
                "                                if(filename) console.log(filename.toString()+`---`+eventType.toString());\n" +
                "                            })\n" +
                "                        }\n" +
                "                    });\n" +
                "\n" +
                "                }\n" +
                "            }\n" +
                "        }\n" +
                "    })\n" +
                "}\n"
            fs.writeFile(pathD+`\\sammary.js`,strForSammary, function (err) {
                    if(err) console.log(`Err in create summary file!`);
                    else console.log(`File is created!`);
                });
        }
    });
}
/*
function directoryScan (dirPath)
{
    fs.readdir(dirPath,function (err,items) {
        if(err) console.log(`Err in readdir function!`);
        else
        {
            for(let i = 0; i < items.length; i++)
            {
                let filePath = path.join(dirPath,items[i]);
                fs.stat(filePath,function (err,stat) {
                    if(err) console.log(err);
                    else
                    {
                        if(stat.isDirectory())
                        {
                            console.log(filePath.replace(pathD+`\\`,``));
                            directoryScan(filePath.toString());
                        }
                        if(stat.isFile())
                        {
                            console.log(filePath.replace(pathD+`\\`,``));
                        }
                    }
                })
            }
        }

    });
}
function createNewDirWithTXT(dirPath)
{
    let nameDir = dirPath.split(`\\`).pop();
    fs.mkdir(dirPath+`\\`+nameDir,function (err) {
        if(err) console.log(`Err in create dir for TXT`);
    });
    moveTXT(dirPath,config,nameDir);
}
function moveTXT(dirPath,config,nameDir)
{
    fs.readdir(dirPath,function (err,items) {
        if(err) console.log(`Err in seartch TXT`);
        else
        {
            for(let k = 0; k <items.length;k++)
            {
                if(path.extname(items[k]) === `.txt`)
                {
                    fs.readFile(dirPath+`\\`+items[k],function (err,data) {
                        if(err) console.log(` It's bad` + err);
                        else
                        {
                            fs.writeFile(
                                dirPath+`\\`+nameDir+`\\`+items[k],config.copyright+data.toString()+config.copyright,
                                function( err ) { if (err) console.log(`Err in move TXT`); }
                            )
                            fs.watch(dirPath,function (eventType,filename) {
                                if(filename) console.log(filename.toString()+`---`+eventType.toString());
                            })
                        }
                    });

                }
            }
        }
    })
}

*/