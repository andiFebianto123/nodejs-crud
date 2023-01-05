const fs = require('fs');

const readStream = fs.createReadStream('./docs/test2.txt', {encoding:'utf8'});

const createStream = fs.createWriteStream('./docs/test3.txt');

// readStream.on('data', (chunk) => {
//     console.log("---- NEW CHUNK ----");
//     createStream.write('\n--- NEW CHUNK ---\n')
//     createStream.write(chunk.toString());
// })

readStream.pipe(createStream);