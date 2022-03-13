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


    await mkdirp(`${dir}/banners`);
    // Code here runs after all directories have been created
    await sharp(file.path)
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .webp()
        .toFormat('webp')
        .rotate()
        .resize(940)
        .toFile(`${dir}/banners/${filename}`)

    return filename




}