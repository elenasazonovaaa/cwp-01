
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
                            directoryScan(filePath);
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