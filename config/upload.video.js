const path = require('path');
const fs = require('fs'),
    mkdirp = require('async-mkdirp');

exports.compressVideo = async(file, folder) => {
    console.log('aqui2')
    const newPath = file.path.split('.')[0];
    //const ext = file.path.split('.')[1];
    console.log(newPath)

    const today = new Date();
    console.log(today)
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`.padStart(2, "0");
    const filename = `${Date.now()}.mp4`;

    console.log('filename: ' + filename)

    const dir = (`./public/media/${folder}`)


    await mkdirp(`${dir}/stories`);

    let writer = fs.createWriteStream(`${dir}/stories/${filename}`)
    let reader = fs.createReadStream(file.path).pipe(writer)
    writer.on("finish", () => {})
    return filename

}