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

    await mkdirp(`${dir}`);


    async function sharpTo(file, square) {



        await sharp(file)
            .resize({
                width: square,
                height: square,
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 1 }
            }).composite([{
                input: Buffer.from(
                    `<svg><rect x="0" y="0" width="${square}" height="${square}" rx="100" ry="100"/></svg>`
                ),
                blend: 'dest-in'
            }])
            .webp()
            .toFormat('webp')
            //.toFormat('png')
            //.png()
            .toFile(`${dir}/logo${square}.webp`)

    }

    await sharpTo(file.path, 32)
    await sharpTo(file.path, 96)
    await sharpTo(file.path, 152)
    await sharpTo(file.path, 167)
    await sharpTo(file.path, 180)


    return filename

}