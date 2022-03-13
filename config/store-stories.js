var pool = require('./pool-factory')

module.exports = async function(cod) {
    // req.connection
    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }
    const waitFor = (ms) => new Promise(r => setTimeout(r, ms));



    try {
        const store = await pool.query("SELECT id,cod, name, folder FROM stores WHERE cod = ?", [cod])
        const stories = await pool.query("SELECT * FROM stories WHERE store_id = ? ORDER BY stories.order ASC", [store[0].id])

        var playlist = []
        await asyncForEach(stories, async(storie) => {
            //minikids/stories/1616180055967.mp4
            var st = {
                title: store[0].name,
                date: "Agora",
                // url: `/${store[0].cod}/stories/${storie.name}`,
                url: `/media/${store[0].cod}/stories/${storie.name}`,
                icon: `/media/${store[0].folder}/logo/logo180.webp`,
                action: {
                    text: storie.button,
                    url: storie.url
                }
            }
            playlist.push(st)
        });

        return JSON.stringify(playlist)


    } finally {
        //conn.end();
        //console.log('finally')
    }




};