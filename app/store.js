app.get('/:cod', async function(req, res, next) {
    try {
        const cod = req.params.cod
        const store = await pool.query("SELECT id,logo,store,cod, name, address, bio, phone, min_order, instagram, facebook, folder FROM stores WHERE cod = ?", [cod])
        if (store[0]) {

            

            if (req.signedCookies['seller']) {
                res.render('app/index.ejs', {
                    store: store[0]
                });
            } else {
                //caso não enconte o cookie do vendedor manda escolher um
                
                res.redirect(`/${store[0].cod}/seller`);
            }

        } else {
            res.status(404).send('Catalogo Not Found =/');
        }

    } catch (err) {
        console.error(err)
    }
});


app.get('/:cod/:url', async function(req, res, next) {
    try {
        const cod = req.params.cod
        const url = req.params.url
        const store = await pool.query("SELECT id,logo,store,cod, name, address, bio, phone, min_order, instagram, facebook, folder FROM stores WHERE cod = ?", [cod])
        const seller = await pool.query("SELECT * FROM sellers WHERE url = ? AND store_id = ? ", [url, store[0].id])

        if (seller[0]) {
            res.cookie('seller', seller[0], {
                maxAge: 1 * 365 * 24 * 60 * 60 * 1000,
                signed: true
            })

            res.render('app/index.ejs', {
                store: store[0]
            });
        } else {
            // não existe o vendedor

            if (store[0]) {
                // existe essa loja
                res.redirect(`/${store[0].cod}/find/seller`);
            } else {
                res.status(404).send('Catalogo Not Found');
            }
        }

    } catch (err) {
        console.error(err)
    }
});