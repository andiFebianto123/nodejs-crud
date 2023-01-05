const fs = require('fs');

// read file
// fs.readFile('./docs/test1s.txt', (err, data) => {
//     if(err){
//         console.log(err.message)
//     }else{
//         console.log(data.toString())
//     }
// })

// write file
// fs.writeFile('./docs/test1.txt', 'hallo world...', () => {
//     console.log('file was writen');
// });

// fs.writeFile('./docs/test12.txt', 'hallo again', () => {
//     console.log('file was writen');
// });


if(!fs.existsSync('./assets')){
    fs.mkdir('./assets', (err) => {
        if(err){
            console.log(err.message);
        }else{
            console.log('directory is writen');
        }
    })
}else{
    fs.rmdir('./assets', (err) => {
        if(err){
            console.log(err.message);
        }
        console.log('remove directory');
    })
}

if(fs.existsSync('./docs/test12.txt')){
    fs.unlink('./docs/test12.txt', (err) => {
        if(err){
            console.log(err.message)
        }
        console.log('file delete');
    })
}

