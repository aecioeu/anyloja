var pool = require('./pool-factory')

module.exports = async function(cod) {
    // req.connection
    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }
    const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

    /* var merchant_ = {};
     var menu = {};
     var featured = [];
     var image_cache = [];
     var serviceworkerimages = [];*/

    var data = {}
    var products_array = {}


    try {

        const store = await pool.query("SELECT id,cod,name,require_client, folder, installment FROM stores WHERE cod = ?", [cod])
        const categories = await pool.query("SELECT name, category_id, icon FROM categories WHERE active ='1' AND store_id = ? ORDER BY categories.name ASC", [store[0].id])

        /*await asyncForEach(categories, async(categorie) => {

                console.log(categorie)

                const products = await pool.query("SELECT * FROM products WHERE active ='1' AND store_id = ? AND categorie_id = ? ORDER BY products.name ASC", [store[0].id, categorie.category_id])
                await asyncForEach(products, async(product) => {

                    //console.log(['joe', 'jane', 'mary'].includes('jane')); //true
                    const images = await pool.query("SELECT name FROM media WHERE product_id = ?", [product.product_id])
                    var arrayProd = {
                        "product_id": product.product_id,
                        "name": product.name,
                        "price": product.price,
                        "discount": product.discount,
                        "active": product.active,
                        "featured": product.featured,
                        "media": images,
                        "categories": categories
                    }

                    //products_array.push(arrayProd)
                    products_array[product.product_id] = arrayProd

                })

            }) // fim da categorie

*/

        data.store = {
                "cod": store[0].cod,
                "name": store[0].name,
                "folder": store[0].folder,
                "require_client": parseFloat(store[0].require_client), 
                "installment": parseFloat(store[0].installment) 
            }
            //data.products = products_array
        data.categories = categories

        return JSON.stringify(data)


    } finally {
        //conn.end();
        //console.log('finally')
    }




};