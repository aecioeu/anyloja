const fs = require('fs'),
    sharp = require('sharp'),
    mkdirp = require('async-mkdirp');


exports.compressImage = async(file, folder) => {
    const newPath = file.path.split('.')[0];

    const today = new Date();
    const year = today.getFullYear();
    const month = `${today.getMonth() + 1}`.padStart(2, "0");
    const filename = `${Date.now()}.webp`;

    const dir = (`./public/media/${folder}`)


    await mkdirp(`${dir}/big`);

    await sharp(file.path)
        .rotate()
        .resize({
            width: 300,
            height : 300,
            fit: 'contain',
            position: 'centre',
            background: {
                r: 255,
                g: 255,
                b: 255,
            }
        })
        .toFormat('webp')
        .toFile(`${dir}/${filename}`)

    await sharp(file.path)
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .toFormat('webp')
        .rotate()
        .resize({
            width: 1280,
            height : 1280,
            fit: 'contain',
            position: 'centre',
            background: {
                r: 255,
                g: 255,
                b: 255,
            }
        })
        .toFile(`${dir}/big/${filename}`)

    return filename
}