
const fs = require('fs');
const path = require('path');

const pathD = process.argv[2];

fs.writeFile(pathD+`\\sammary.js`,`hi`, function (err) {
    if(err) console.log(err);
    else console.log(`File is created!`);
});

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
directoryScan(pathD);

function createNewDirWithTXT(dirPath)
{
    let nameDir = dirPath.split(`\\`).pop();
    fs.mkdir(dirPath+`\\`+nameDir,function (err) {
        if(err) console.log(`Err in create dir for TXT`);
    });
    let config = "";
    fs.readFile(`config.json`,function (err,data) {
        if(err) console.log(`Err in read json`);
        else
        {
            config = JSON.parse(data.toString());
            moveTXT(dirPath,config,nameDir);
        }
    });

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
createNewDirWithTXT(pathD);