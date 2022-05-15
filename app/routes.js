// app/routes.js

var pool = require("../config/pool-factory");
const StoreData = require("../config/store-data");
const stories = require("../config/store-stories");
var multer = require("multer");
var upload = multer({
  dest: "./temp",
});
var path = require("path");
const filehelper = require("../config/upload");
const videohelper = require("../config/upload.video");
const bannerhelper = require("../config/upload-banner");
const logofilehelper = require("../config/upload-logo");
var bodyParser = require("body-parser");
var fs = require("fs");
/*const {
    push
} = require('mysql2/lib/constants/charset_encodings');*/

const { Console } = require("console");

/* COMPRESS VIDEO */

var ffmpeg = require("fluent-ffmpeg");

var ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
var ffprobePath = require("@ffprobe-installer/ffprobe").path;

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

/*
var app_url = require('../config/merchant-update');
const StoreData = require('../config/merchant-data');
const Manifest = require('../config/merchant-manifest');*/

module.exports = function (app, passport) {
  function groupByKey(array, key) {
    return array.reduce((hash, obj) => {
      if (obj[key] === undefined) return hash;
      return Object.assign(hash, {
        [obj[key]]: (hash[obj[key]] || []).concat(obj),
      });
    }, {});
  }

  function getFilesizeInBytes(filename) {
    var stats = fs.statSync(filename);
    var fileSizeInBytes = stats.size;
    return fileSizeInBytes;
  }

  var timemark = null;

  function CompressVideo(file, dest) {
    return new Promise((resolve, reject) => {
      var video_w = 720;

      ffmpeg.ffprobe(file, (error, videoInfo) => {
        if (error) {
          return reject(error);
        }

        console.log("Largura do video ", videoInfo.streams[0].width);
        // if (videoInfo.streams[0].width > 720) {
        ffmpeg()
          /*  .on('end', onEnd)
                          .on('progress', onProgress)
                          .on('error', onError)*/
          //.input('logo96.webp')
          //.inputFPS(1 / 6)
          //.videoFilter(["movie=logo96.webp [watermark]; [in][watermark] overlay=10:main_h-overlay_h-10 [out]"])
          .on("progress", (progress) => {
            if (progress.timemark != timemark) {
              timemark = progress.timemark;
              console.log("Time mark: " + timemark + "...");
            }
          })
          .on("end", () => {
            console.log(`Video  rendered`);
            return resolve();
          })
          .on("err", (err) => {
            return reject(err);
          })
          .input(file) //.withVideoCodec('libvpx')
          /*.addOptions(['-qmin 0', '-qmax 50', '-crf 4'])
                        .withVideoBitrate(1024)
                        .withAudioCodec('libvorbis')
                        .size(`${((videoInfo.streams[0].width >= video_w) ? video_w : videoInfo.streams[0].width)}x?`).aspect('9:16').autopad()
                        .saveToFile(dest);*/
          //.videoBitrate(1000)
          .audioCodec("aac")
          .audioChannels(2)
          .audioFrequency(44100)
          .audioBitrate(128)
          //.addOption('-crf', '18')
          .outputOptions(
            //'-preset', 'veryfast',
            "-threads",
            "2"
          ) //Show PSNR measurements in output. Anything above 40dB indicates excellent fidelity
          .videoCodec("libx264")
          .size(
            `${
              videoInfo.streams[0].width >= video_w
                ? video_w
                : videoInfo.streams[0].width
            }x?`
          )
          .aspect("9:16")
          .autopad()
          .output(dest)
          .outputFPS(29)
          .run();
        /*} else {
                            console.log(`Video Não renderizado por ser pequeno demais`)
                            return resolve()
                        }*/
      });

      /*var stats = fs.statSync(file)
                var fileSizeInBytes = stats.size;
                // Convert the file size to megabytes (optional)
                var fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
                console.log(fileSizeInMegabytes)*/
    });
  }

  const { default: PQueue } = require("p-queue");
  const queue = new PQueue({
    concurrency: 1,
  });

  let count = 0;
  queue.on("active", () => {
    //console.log(`Working on item #${count}.  Size: ${queue.size}  Pending: ${queue.pending}`);
    //console.log(queue);
  });
  queue.on("add", () => {
    //console.log(`Item Adicionado #${++count}.  Size: ${queue.size}  Pending: ${queue.pending}`);
    //console.log(queue);
  });

  const waitFor = (ms) => new Promise((r) => setTimeout(r, ms));
  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  function makeid(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVXZ0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // route middleware to make sure
  function isLoggedIn(req, res, next) {
    req.session.urlRedirect = req.url;
    if (req.user) {
      return next();
    } else {
      req.session.save(() => {
        res.redirect("/loja/login");
      });
    }
  }

  app.get("/", function (req, res) {
    // render the page and pass in any flash data if it exists

    res.sendFile(path.join(__dirname + "/../views/site/index.html"));
  });

  const stripe = require("stripe")(
    "pk_test_51IMfNYJsjY5mHcucDcfwwiS2RvBLMHVGBkTOzu63LIOMnma9OOuI6DnTQxBR3K3hzbCZ5Cs11XUK4mmXEfxUZJot00kRoOfk0G"
  );

  app.post(
    "/webhook",
    bodyParser.raw({ type: "application/json" }),
    (request, response) => {
      const payload = request.body;

      console.log("Got payload: " + payload);
      console.log(JSON.stringify(payload));

      response.status(200);
    }
  );

  app.get("/loja/login", function (req, res) {
    // render the page and pass in any flash data if it exists

    res.render("admin/login.ejs", {
      message: req.flash("loginMessage"),
    });
  });

  // process the login form
  app.post(
    "/loja/login",
    passport.authenticate("local-login", {
      failureRedirect: "/loja/login",
      failureFlash: true, // allow flash messages
    }),
    function (req, res) {
      req.session.save(() => {
        res.redirect(
          req.session.urlRedirect ? req.session.urlRedirect : "/loja/dashboard"
        );
      });
    }
  );

  app.get("/loja/register", async function (req, res, next) {
    res.render("admin/register.ejs");
  });

  app.post(
    "/loja/signup",
    passport.authenticate("local-signup", {
      failureRedirect: "/loja/register", // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    }),
    function (req, res) {
      req.session.save(() => {
        res.redirect("/loja/dashboard?tour=true");
      });
    }
  );

  app.get("/loja", isLoggedIn, async function (req, res, next) {
    res.redirect("/loja/dashboard");
  });

  app.get("/loja/dashboard", isLoggedIn, async function (req, res, next) {
    var sellers = await pool.query(
      "SELECT * FROM sellers WHERE store_id = ? ORDER BY sellers.name ASC",
      [req.user.id]
    );

    res.render("admin/dashboard.ejs", {
      store: req.user,
      sellers: sellers,
    });
  });

  app.get("/loja/logout", function (req, res) {
    req.logout();
    req.session.destroy();
    res.redirect("/loja/login");
  });

  app.get("/loja/orders", isLoggedIn, async function (req, res, next) {
    var start = req.query.start;
    var end = req.query.end;

    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    //console.log(firstDay, lastDay)

    res.render("admin/orders/orders.ejs", {
      store: req.user,
      time: `${start ? `${start ? start : ""} to ${end ? end : start}` : ""}`,
    });
  });

  app.get("/loja/order/:order_id", isLoggedIn, async function (req, res, next) {
    var order_id = req.params.order_id;

    var order = await pool.query(
      "SELECT * FROM orders WHERE store_id = ? AND order_cod=? LIMIT 0,1",
      [req.user.id, order_id]
    );
    // var products = await pool.query("SELECT * FROM orders_products WHERE store_id = ? AND order_id=? LIMIT 0,1", [req.user.id, order[0].id])

    if (order[0].read == 0) {
      await pool.query(
        "UPDATE orders SET orders.read=1 WHERE store_id = ? AND order_cod=?",
        [req.user.id, order_id]
      );
    }

    var products_array = [];
    var products = await pool.query(
      "SELECT * FROM orders_products WHERE store_id = ? AND order_id=?",
      [req.user.id, order[0].id]
    );
    await asyncForEach(products, async (product) => {
      var images = await pool.query(
        "SELECT name FROM media WHERE product_id = ? ORDER BY media.order ASC LIMIT 0,1",
        [product.product_id]
      );
      var arrayProd = {
        cod: product.cod,
        product_id: product.product_id,
        name: product.name,
        price: product.price,
        qnt: product.qnt,
        variations: product.variations,
        media: images,
      };

      products_array.push(arrayProd);
    });

    res.render("admin/orders/order.ejs", {
      store: req.user,
      order: order[0],
      products: products_array,
    });

    /*  var start = req.query.start
        var end = req.query.end

        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        //console.log(firstDay, lastDay)

        res.render('admin/orders/orders.ejs', {
                    store: req.user,
                    time: `${((start) ? `${((start) ? start: '')} to ${((end) ? end : start)}`: '' )}`
});*/
  });

  app.post("/loja/api/orders", isLoggedIn, async function (req, res, next) {
    var start = req.body.start + " 00:00:00";
    var end = req.body.end + " 23:59:59";

    // var orders = await pool.query("Select Sum(orders.total) As sum_orders, orders.store_id, Count(orders.id) As total_orders From orders Where orders.store_id = ? AND (created BETWEEN ? AND ?) Group By orders.store_id", [req.user.id, start, end])
    var orders = await pool.query(
      "Select * From orders Where orders.store_id = ? AND (created BETWEEN ? AND ?) Order by created DESC",
      [req.user.id, start, end]
    );

    //var sellers = await pool.query("SELECT * FROM sellers WHERE store_id = ? ORDER BY sellers.name ASC", [req.user.id])

    res.json({
      orders: orders,
    });
  });

  app.post("/loja/api/dashboard", isLoggedIn, async function (req, res, next) {
    var start = req.body.start + " 00:00:00";
    var end = req.body.end + " 23:59:59";

    var order = await pool.query(
      "Select Sum(orders.total) As sum_orders, orders.store_id, Count(orders.id) As total_orders From orders Where orders.store_id = ? AND (created BETWEEN ? AND ?) Group By orders.store_id",
      [req.user.id, start, end]
    );
    //BETWEEN '2012-03-15' AND '2012-04-15'

    res.json({
      sum_orders: order[0] ? order[0].sum_orders : 0,
      total_orders: order[0] ? order[0].total_orders : 0,
    });

    /* var start = req.body.start
        var end = req.body.end

        var order = await pool.query("Select Sum(orders.total) As sum_orders, orders.store_id, Count(orders.id) As total_orders From orders Where orders.store_id = ? AND (created BETWEEN ? AND ?) Group By  orders.store_id", [req.user.id, start, end])
            //BETWEEN '2012-03-15' AND '2012-04-15'

      //console.log(order.sum_orders)

        res.json({
            sum_orders: ((order[0].sum_orders) ? order[0].sum_orders : 0),
            total_orders: ((order[0].total_orders) ? order[0].total_orders : 0)
        })

*/
  });

  app.get("/loja/store", isLoggedIn, async function (req, res, next) {
    res.render("admin/store/store-config.ejs", {
      store: req.user,
    });
  });

  app.post(
    "/loja/store",
    isLoggedIn,
    upload.single("file"),
    async (req, res, next) => {
      var address = req.body.address,
        doc = req.body.doc,
        phone = req.body.phone,
        description = req.body.description,
        min_order = req.body.min_order,
        instagram = req.body.instagram,
        facebook = req.body.facebook,
        message = req.body.message,
        pixel = req.body.pixel,
        categories_home = req.body.categories_home == "on" ? 1 : 0,
        banner_sequential = req.body.banner_sequential == "on" ? 1 : 0;
      show_search_at_home = req.body.show_search_at_home == "on" ? 1 : 0;
      installment = req.body.installment ? req.body.installment : 0;

      var data = {
        address: address,
        doc: doc,
        phone: phone,
        bio: description,
        min_order: min_order,
        instagram: instagram,
        facebook: facebook,
        message: message,
        pixel: pixel,
        show_categories_home: categories_home,
        show_banner_sequential: banner_sequential,
        installment: installment,
        show_search_at_home: show_search_at_home,
      };

      await pool.query("UPDATE stores SET ? WHERE id = ?", [data, req.user.id]);

      if (req.file) {
        //console.log(req.file)
        // Vamos mandar essa imagem para compressão antes de prosseguir
        // Ela vai retornar o a promise com o novo caminho como resultado, então continuamos com o then.
        await logofilehelper
          .compressImage(req.file, req.user.folder + "/logo")
          .then((newPath) => {
            // apagar imagem anterior
            pool.query("UPDATE stores SET logo = ? WHERE id = ?", [
              newPath,
              req.user.id,
            ]);
            /*
                      var filePath = `./public/media/${req.user.folder}/${image.name}`;
                    fs.unlinkSync(filePath);
                    */
            //fs.unlinkSync(req.file.path);
            fs.unlinkSync(req.file.path);
            res.redirect("/loja/store");
          })
          .catch((err) => console.log(err));
      } else {
        res.redirect("/loja/store");
      }

      /* else {
                    return res.send('Houve erro no upload!');
                }*/

      /* var product_info = await pool.query("SELECT id,product_id,name FROM products WHERE store_id = ? AND product_id = ?", [req.user.id, req.body.product_id])
         if (product_info) {
             var product_id = product_info[0].product_id

             // Se houve sucesso no armazenamento
            

         }*/
    }
  );

  app.get("/loja/sellers", isLoggedIn, async function (req, res, next) {
    var sellers = await pool.query(
      "SELECT * FROM sellers WHERE store_id = ? ORDER BY sellers.name ASC",
      [req.user.id]
    );
    res.render("admin/sellers/sellers.ejs", {
      store: req.user,
      sellers: sellers,
    });
  });

  app.get("/loja/clients", isLoggedIn, async function (req, res, next) {
    var clients = await pool.query(
      "SELECT * FROM users WHERE store_id = ? ORDER BY users.name ASC",
      [req.user.id]
    );
    res.render("admin/clients/clients.ejs", {
      store: req.user,
      clients: clients,
    });
  });

  app.post("/loja/clients", isLoggedIn, async function (req, res, next) {
    var name = req.body.name;
    var user = req.body.user;
    var password = req.body.password;

    //console.log(req.body)

    var data = {
      name: name,
      user: user,
      store_id: req.user.id,
      password: password,
    };
    await pool.query("INSERT INTO users SET ?", data, function (err, result) {
      res.redirect("/loja/clients");
    });
  });

  app.post("/loja/client/delete", isLoggedIn, async function (req, res, next) {
    var id = req.body.id;
    //console.log(url)
    if (id) {
      pool.query("DELETE FROM users WHERE store_id = ? AND id = ?", [
        req.user.id,
        id,
      ]);
    }

    res.json({
      status: "updated",
    });
  });

  app.post("/loja/seller/delete", isLoggedIn, async function (req, res, next) {
    var url = req.body.url;
    //console.log(url)
    if (url) {
      await pool.query("DELETE FROM sellers WHERE store_id = ? AND url = ?", [
        req.user.id,
        url,
      ]);
    }

    res.json({
      status: "updated",
    });
  });

  app.post("/loja/product/delete", isLoggedIn, async function (req, res, next) {
    var id_product = req.body.id_product;
    //console.log(id_product)
    if (id_product) {
      var product = await pool.query(
        "DELETE FROM products WHERE store_id = ? AND product_id = ?",
        [req.user.id, id_product]
      );

      if (product) {
        var images = await pool.query(
          "SELECT product_id,name FROM media WHERE store_id = ? AND product_id = ? ORDER BY media.order ASC",
          [req.user.id, id_product]
        );
        //apaga tudo do db
        await pool.query(
          "DELETE FROM media WHERE store_id = ? AND product_id = ?",
          [req.user.id, id_product]
        );

        await asyncForEach(images, async (image) => {
          var filePath = `./public/media/${req.user.folder}/${image.name}`;
          fs.unlinkSync(filePath);
          var filePath = `./public/media/${req.user.folder}/big/${image.name}`;
          fs.unlinkSync(filePath);
        });

        //DELETE FROM NOME_DA_TABELA WHERE id = VALOR_DO_ID;
      }
    }

    res.json({
      status: "updated",
    });
  });

  app.post(
    "/loja/categorie/delete",
    isLoggedIn,
    async function (req, res, next) {
      var id_categorie = req.body.id_categorie;
      //console.log("CATID _>", id_categorie)
      if (id_categorie) {
        var categorie = await pool.query(
          "DELETE FROM categories WHERE store_id = ? AND category_id = ?",
          [req.user.id, id_categorie]
        );

        var products = await pool.query(
          "SELECT * FROM products WHERE store_id = ? AND categorie_id = ?",
          [req.user.id, id_categorie]
        );

        await asyncForEach(products, async (product) => {
          if (product) {
            //console.log(product)
            var images = await pool.query(
              "SELECT * FROM media WHERE store_id = ? AND product_id = ? ORDER BY media.order ASC",
              [req.user.id, product.product_id]
            );
            //apaga tudo do db
            await asyncForEach(images, async (image) => {
              var filePath = `./public/media/${req.user.folder}/${image.name}`;
              fs.unlinkSync(filePath);
              var filePath = `./public/media/${req.user.folder}/big/${image.name}`;
              fs.unlinkSync(filePath);
            });

            await pool.query(
              "DELETE FROM media WHERE store_id = ? AND product_id = ?",
              [req.user.id, product.product_id]
            );
            await pool.query(
              "DELETE FROM products WHERE store_id = ? AND categorie_id = ?",
              [req.user.id, id_categorie]
            );
          }
        });
      }

      res.json({
        status: "updated",
      });
    }
  );

  app.post("/loja/sellers", isLoggedIn, async function (req, res, next) {
    var name = req.body.name;
    var phone = req.body.phone;

    //console.log(req.body)

    var data = {
      name: name,
      phone: phone,
      store_id: req.user.id,
      url: makeid(5),
    };
    await pool.query("INSERT INTO sellers SET ?", data, function (err, result) {
      res.redirect("/loja/sellers");
    });
  });

  app.get("/loja/banners", isLoggedIn, async function (req, res, next) {
    res.render("admin/banners/banners.ejs", {
      store: req.user,
    });
  });

  app.get("/loja/variations", isLoggedIn, async function (req, res, next) {
    // console.log(req.user.id)

    //var tags_title = await pool.query("SELECT * FROM tags_title WHERE store_id = ? ORDER BY tags_title.order ASC", [req.user.id])

    var tags_titles = [];
    var tag_title = await pool.query(
      "SELECT id,name, required, active FROM tags_title WHERE store_id = ? ORDER BY tags_title.order ASC",
      req.user.id
    );

    await asyncForEach(tag_title, async (title) => {
      var tags = await pool.query(
        "SELECT * FROM tags WHERE store_id = ? AND tags_title = ? AND active = 1 ORDER BY tags.name",
        [req.user.id, title.id]
      );
      tags_titles.push({
        id: title.id,
        name: title.name,
        active: title.active,
        required: title.required,
        tags: tags,
      });
    });

    //console.log(data)

    res.render("admin/variations/variations.ejs", {
      store: req.user,
      tags_title: tags_titles,
    });
  });

  app.get(
    "/loja/variations/create",
    isLoggedIn,
    async function (req, res, next) {
      res.render("admin/variations/variations-add.ejs", {
        store: req.user,
        tags_title: null,
      });
    }
  );

  app.get(
    "/loja/variations/editor/:tag_title",
    isLoggedIn,
    async function (req, res, next) {
      var tag_title = req.params.tag_title;
      var title = await pool.query(
        "SELECT * FROM tags_title WHERE tags_title.store_id = ? AND tags_title.id = ? LIMIT 0,1",
        [req.user.id, tag_title]
      );

      res.render("admin/variations/variations-add.ejs", {
        store: req.user,
        tags_title: title[0],
      });
    }
  );

  app.get(
    "/loja/variations/:tag_id/tags/edit",
    isLoggedIn,
    async function (req, res, next) {
      var tag_id = req.params.tag_id;
      var tags = await pool.query(
        "SELECT * FROM tags WHERE tags.store_id = ? AND tags.id = ? LIMIT 0,1",
        [req.user.id, tag_id]
      );

      //console.log(tags)

      res.render("admin/variations/tags/tags-add.ejs", {
        store: req.user,
        tags_title: tags[0].tags_title,
        tags: tags[0],
      });
    }
  );

  app.post(
    "/loja/variations/editor/",
    isLoggedIn,
    async function (req, res, next) {
      var id = req.body.id;
      var name = req.body.name;

      if (id) {
        var data = {
          name: name,
          active: req.body.active == "on" ? 1 : 0,
          required: req.body.required == "on" ? 1 : 0,
          store_id: req.user.id,
        };

        await pool.query(
          "UPDATE tags_title SET ? WHERE tags_title.store_id = ? AND tags_title.id = ? ",
          [data, req.user.id, id],
          function (err, result) {
            res.redirect("/loja/variations");
          }
        );
      } else {
        var data = {
          name: name,
          active: req.body.active == "on" ? 1 : 0,
          required: req.body.required == "on" ? 1 : 0,
          store_id: req.user.id,
        };
        await pool.query(
          "INSERT INTO tags_title SET ?",
          data,
          function (err, result) {
            res.redirect("/loja/variations");
          }
        );
      }
    }
  );
  ///loja/tags/editor/7
  app.post("/loja/tags/editor", isLoggedIn, async function (req, res, next) {
    var id_variation = req.body.id_variation;
    var id = req.body.id;
    var name = req.body.name;

    var data = {
      name: name,
      active: req.body.active == "on" ? 1 : 0,
      store_id: req.user.id,
      tags_title: id_variation,
    };

    // console.log(data, id)

    if (id) {
      await pool.query(
        "UPDATE tags SET ? WHERE tags.store_id = ? AND tags.id = ? ",
        [data, req.user.id, id],
        function (err, result) {
          res.redirect("/loja/variations/" + id_variation + "/tags");
        }
      );
    } else {
      await pool.query("INSERT INTO tags SET ?", data, function (err, result) {
        res.redirect("/loja/variations/" + id_variation + "/tags");
      });
    }
  });

  app.get(
    "/loja/variations/:tag_title/tags",
    isLoggedIn,
    async function (req, res, next) {
      var tag_title = req.params.tag_title;

      var title = await pool.query(
        "SELECT * FROM tags_title WHERE tags_title.store_id = ? AND tags_title.id = ? LIMIT 0,1",
        [req.user.id, tag_title]
      );

      if (title[0]) {
        var tags = await pool.query(
          "SELECT * FROM tags WHERE tags.store_id = ? AND tags.tags_title = ? ORDER BY tags.name ASC",
          [req.user.id, tag_title]
        );

        res.render("admin/variations/tags/tags.ejs", {
          tags_title: title[0],
          tags: tags,
          store: req.user,
        });
      } else {
        res.status(404).send("Not Found");
      }
    }
  );

  app.get(
    "/loja/variations/:tag_title/tags/create",
    isLoggedIn,
    async function (req, res, next) {
      var tag_title = req.params.tag_title;

      var title = await pool.query(
        "SELECT * FROM tags_title WHERE tags_title.store_id = ? AND tags_title.id = ? LIMIT 0,1",
        [req.user.id, tag_title]
      );

      //console.log(title)

      res.render("admin/variations/tags/tags-add.ejs", {
        store: req.user,
        tags_title: title[0].id,
        tags: null,
      });
    }
  );

  app.get("/loja/categories", isLoggedIn, async function (req, res, next) {
    // console.log(req.user.id)

    var categories = await pool.query(
      "SELECT * FROM categories WHERE store_id = ? ORDER BY categories.name ASC",
      [req.user.id]
    );
    var categorie_array = [];

    await asyncForEach(categories, async (categorie) => {
      //`AND (FIND_IN_SET('${categorie}', products.categorie_id))`
      //var sql = 'SELECT COUNT(*) AS namesCount FROM names WHERE age = ?'

      //console.log(['joe', 'jasne', 'mary'].includes('jane')); //true
      const ProdCount = await pool.query(
        `SELECT COUNT(*) AS Total FROM products WHERE store_id = ? AND (FIND_IN_SET('${categorie.category_id}', products.categorie_id))`,
        [req.user.id]
      );

      var arrayCat = {
        category_id: categorie.category_id,
        active: categorie.active,
        name: categorie.name,
        total: ProdCount[0].Total,
      };

      categorie_array.push(arrayCat);
    });

    res.render("admin/categories/categories.ejs", {
      store: req.user,
      categories: categorie_array,
    });
  });

  app.get(
    "/loja/categories/edit/:categoryid",
    isLoggedIn,
    async function (req, res, next) {
      var categorie = await pool.query(
        "SELECT * FROM categories WHERE store_id = ? AND category_id = ?",
        [req.user.id, req.params.categoryid]
      );

      //console.log(categorie)
      if (categorie[0]) {
        res.render("admin/categories/categorie-edit.ejs", {
          store: req.user,
          categorie: categorie[0],
        });
      } else {
        res.status(404).send("Not Found");
      }
    }
  );

  app.post(
    "/loja/categories/edit/:categoryid",
    isLoggedIn,
    async function (req, res, next) {
      var categorie = await pool.query(
        "SELECT * FROM categories WHERE store_id = ? AND category_id = ?",
        [req.user.id, req.params.categoryid]
      );
      if (categorie) {
        var data = {
          active: req.body.active == "on" ? 1 : 0,
          name: req.body.name,
          icon: req.body.icon,
        };
        pool.query(
          "UPDATE categories SET ? WHERE category_id = ?",
          [data, req.params.categoryid],
          function (err, result) {
            res.redirect("/loja/categories/");
          }
        );
      }
      //console.log(req.body)

      //res.json({ status: 'updated' })
    }
  );

  app.get(
    "/loja/categories/create",
    isLoggedIn,
    async function (req, res, next) {
      res.render("admin/categories/categorie-add.ejs", {
        store: req.user,
      });
    }
  );

  app.post(
    "/loja/categories/create",
    isLoggedIn,
    async function (req, res, next) {
      var name = req.body.name;
      var icon = req.body.icon;

      //console.log(req.body)

      var data = {
        name: name,
        icon: icon,
        store_id: req.user.id,
        category_id: makeid(10),
      };
      pool.query("INSERT INTO categories SET ?", data, function (err, result) {
        res.redirect("/loja/categories");
      });
    }
  );

  app.post(
    "/loja/update/category-update",
    isLoggedIn,
    async function (req, res, next) {
      var id = req.body.id;
      var status = req.body.status;
      //req.user
      await pool.query(
        "UPDATE categories SET active = ? WHERE id = ? AND store_id = ?",
        [status, id, req.user.id]
      );
      res.json({
        status: "updated",
      });
    }
  );

  app.post(
    "/loja/update/product-update",
    isLoggedIn,
    async function (req, res, next) {
      var id = req.body.id;
      var status = req.body.status;
      var action = req.body.action;
      //req.user
      if (action == "active") {
        await pool.query(
          "UPDATE products SET active = ? WHERE product_id = ? AND store_id = ?",
          [status, id, req.user.id]
        );
      } else if (action == "featured") {
        await pool.query(
          "UPDATE products SET featured = ? WHERE product_id = ? AND store_id = ?",
          [status, id, req.user.id]
        );
      }

      res.json({
        status: "updated",
      });
    }
  );

  app.get(
    "/loja/categories/:categoryid",
    isLoggedIn,
    async function (req, res, next) {
      //na volta dos produtos vai pra categoria orifinaria

      req.session.urlCategories = req.url;
      //console.log('VOLTAR PARA ' , req.session.urlCategories)

      var products_array = [];

      var category_info = await pool.query(
        "SELECT name, category_id FROM categories WHERE store_id = ? AND category_id = ?",
        [req.user.id, req.params.categoryid]
      );

      const tags_titles = await pool.query(
        "SELECT tags_title.name As title, tags_title.id, tags_title.required FROM tags INNER JOIN tags_title ON tags_title.id = tags.tags_title WHERE tags_title.store_id = ? AND tags_title.active ='1' GROUP BY  tags_title.name, tags_title.id ORDER BY tags_title.order ASC",
        [req.user.id]
      );

      const tags_titles_array = [];
      await asyncForEach(tags_titles, async (tags_title) => {
        tags_titles_array[`title${tags_title.id}`] = tags_title.title;
      });

      //console.log(tags_titles_array)

      const tags = await pool.query(
        "SELECT * FROM tags WHERE store_id = ? AND active ='1'",
        [req.user.id]
      );

      const tags_array = [];
      await asyncForEach(tags, async (tag) => {
        tags_array[`tag${tag.id}`] = {
          id: tag.id,
          name: tag.name,
          title_id: tag.tags_title,
          title_name: [tags_titles_array[`title${tag.tags_title}`]],
        };
      });

      //myArray.find(x => x.id === '45').foo;

      if (category_info[0]) {
        //`membership_number` NOT IN (1,2,3)
        var product_info = await pool.query(
          "SELECT * FROM products WHERE store_id = ? AND categorie_id REGEXP (?) ORDER BY name ASC",
          [req.user.id, category_info[0].category_id]
        );
        //console.log(product_info)

        await asyncForEach(product_info, async (product) => {
          var produtc_tags = [];

          productTags = product.tags.split(",");

          for (var i = 0; i < productTags.length; i++) {
            if (tags_array[`tag${productTags[i]}`]) {
              produtc_tags.push(tags_array[`tag${productTags[i]}`]);
            }
          }

          const groupBy = (items, key) =>
            items.reduce(
              (result, item) => ({
                ...result,
                [item[key]]: [...(result[item[key]] || []), item],
              }),
              {}
            );

          //console.log(groupBy(produtc_tags, 'title_name'))

          /*result = produtc_tags.reduce(function (r, a) {
                            r[a.title_name] = r[a.title_name] || [];
                            r[a.title_name].push(a);
                            return r;
                        }, Object.create(null));
                    
                    console.log(product.name,result);*/

          /*      var grouped = _.mapValues(_.groupBy(cars, 'make'),
                          clist => clist.map(car => _.omit(car, 'make')));

console.log(grouped);
Rendimentos:

{ audi:
   [ { model: 'r8', year: '2012' },
     { model: 'rs5', year: '2013' } ],
  ford:
   [ { model: 'mustang', year: '2012' },
     { model: 'fusion', year: '2015' } ],
  kia: 
   [ { model: 'optima', year: '2012' } ] 
}*/

          // console.log(product.name, produtc_tags)

          /*
let pieces = ['king', 'queen', 'rook', 'knight', 'bishop'];
console.log(pieces.indexOf('rook'));
*/

          /*   await asyncForEach(productTags, async (idx) => {
                            
                            
//myArray.findIndex(x => x.id === '45');
                            console.log(array_tags.find(x => x.id === '47'))
                            if(array_tags.findIndex(x => x.id === idx)){
                          
                            }

                        })

                        console.log(produtc_tags)*/

          /*var search_tags = []
                var productTags = product.tags.split(',');
              
                //pego os tagtitle disponiveis
                const tags_title2 = await pool.query("SELECT tags_title.name As title, tags_title.id, tags_title.required FROM tags INNER JOIN tags_title ON tags_title.id = tags.tags_title WHERE tags_title.store_id = ? AND tags.id IN (?) AND tags_title.active ='1' GROUP BY  tags_title.name, tags_title.id ORDER BY tags_title.order ASC", [req.user.id, productTags])  
                await asyncForEach(tags_title2, async (tag_title) => {
                    var mountTags = []
                  
                    const tags = await pool.query("SELECT * FROM tags WHERE store_id = ? AND active ='1' AND tags_title = ? AND tags.id IN (?)  ORDER BY CAST(tags.name AS UNSIGNED)", [req.user.id, tag_title.id, productTags])
                    await asyncForEach(tags, async (tag) => {
                        productTags.find(el => {
                            if (el == tag.id) {
                                mountTags.push({
                                    "name": tag.name,
                                    "id": tag.id
                                })
                            }
                        })
                    })

                    search_tags.push({
                        "title": tag_title.title,
                        "tags": mountTags
                    })

                })*/

          //console.log(['joe', 'jane', 'mary'].includes('jane')); //true
          const images = await pool.query(
            "SELECT name FROM media WHERE product_id = ? ORDER BY media.order ASC LIMIT 0,3",
            [product.product_id]
          );
          var arrayProd = {
            product_id: product.product_id,
            name: product.name,
            price: product.price,
            discount: product.discount,
            active: product.active,
            featured: product.featured,
            media: images,
            tags: groupBy(produtc_tags, "title_name"),
          };

          products_array.push(arrayProd);
        });

        res.render("admin/products/products.ejs", {
          store: req.user,
          products: products_array,
          category: category_info[0],
        });
      } else {
        res.status(404).send("Products Not Found");
      }
    }
  );

  app.get(
    "/loja/categories/:categoryid/product/create",
    isLoggedIn,
    async function (req, res, next) {
      var tags_titles = [];
      var tag_title = await pool.query(
        "SELECT id,name, required FROM tags_title WHERE store_id = ? AND active = 1",
        req.user.id
      );

      await asyncForEach(tag_title, async (title) => {
        var tags = await pool.query(
          "SELECT * FROM tags WHERE store_id = ? AND tags_title = ? AND active = 1",
          [req.user.id, title.id]
        );
        tags_titles.push({
          tag_title: title.name,
          required: title.required,
          tags: tags,
        });
      });

      // buscar se essa categoria existe na store
      var category_from = await pool.query(
        "SELECT name, category_id FROM categories WHERE store_id = ? AND category_id = ?",
        [req.user.id, req.params.categoryid]
      );

      if (category_from[0]) {
        var category_info = await pool.query(
          "SELECT name, category_id FROM categories WHERE store_id = ?",
          [req.user.id]
        );
        res.render("admin/products/product-add.ejs", {
          store: req.user,
          category: category_info,
          category_from: category_from[0],
          tags: tags_titles,
        });
      } else {
        res.status(404).send("Category Not Found");
      }
    }
  );

  app.post(
    "/loja/:categoryid/create/product",
    isLoggedIn,
    async function (req, res, next) {
      //console.log(req.body)
      //verificar se a categoria existe
      var active = req.body.active,
        featured = req.body.featured,
        name = req.body.name,
        cod = req.body.cod,
        description = req.body.description,
        price = req.body.price,
        discount = req.body.discount,
        //variations_data = req.body.variations_data,
        product_id = makeid(15),
        tags = req.body.tags,
        categories = req.body.categories;

      var data = {
        active: active == "on" ? 1 : 0,
        featured: featured == "on" ? 1 : 0,
        categorie_id: categories.toString(),
        name: name,
        description: description ? description : "",
        price: parseFloat(price) ? parseFloat(price) : 0,
        discount: parseFloat(discount) ? parseFloat(discount) : 0,
        store_id: req.user.id,
        product_id: product_id,
        cod: cod ? cod : "",
        // variations_data: variations_data,
        tags: tags ? tags.toString() : "",
      };

      //console.log(data)
      await pool.query("INSERT INTO products SET ?", data);
      //const LastInsert = order.insertId
      //res.redirect('/categories/' + req.params.categoryid)
      res.redirect("/loja/product/" + product_id + "#imagens");
    }
  );

  app.post("/loja/edit/product", isLoggedIn, async function (req, res, next) {
    console.log(req.body);
    //verificar se a categoria existe
    var active = req.body.active,
      featured = req.body.featured,
      name = req.body.name,
      cod = req.body.cod,
      description = req.body.description,
      price = req.body.price,
      discount = req.body.discount,
      //variations_data = req.body.variations_data,
      product_id = req.body.product_id,
      tags = req.body.tags,
      categories = req.body.categories;

    var data = {
      active: active == "on" ? 1 : 0,
      featured: featured == "on" ? 1 : 0,
      categorie_id: categories.toString(),
      name: name,
      description: description ? description : "",
      price: parseFloat(price) ? parseFloat(price) : 0,
      discount: parseFloat(discount) ? parseFloat(discount) : 0,
      store_id: req.user.id,
      product_id: product_id,
      cod: cod ? cod : "",
      // variations_data: variations_data,
      //tags: tags.toString(),
      tags: tags ? tags.toString() : "",
    };

    //console.log(data)

    await pool.query(
      "UPDATE products SET ? WHERE product_id = ? AND store_id = ?",
      [data, product_id, req.user.id]
    );
    //await pool.query('INSERT INTO products SET ?', data)
    //const LastInsert = order.insertId
    // res.redirect('/loja/categories/')

    //console.log(req.session.urlCategories)
    //console.log('categories edit post')

    // if(req.session.urlBack != null){
    // res.redirect((req.session.urlBack) ? req.session.urlBack : '/loja/categories/');
    /// req.session.urlBack = null
    //}else if(req.session.urlCategories != null){
    res.redirect(
      req.session.urlCategories
        ? req.session.urlCategories
        : "/loja/categories/"
    );
    // req.session.urlCategories = null
    // }
  });

  app.post(
    "/loja/product/update-order",
    isLoggedIn,
    async function (req, res, next) {
      var product_id = req.body.product_id;
      var orders = req.body.order;
      //req.user

      var product_info = await pool.query(
        "SELECT * FROM products WHERE store_id = ? AND product_id = ?",
        [req.user.id, product_id]
      );
      //console.log(product_info)
      if (product_info[0]) {
        //se houver esse produto

        await asyncForEach(orders, async (order) => {
          //await pool.query("UPDATE media SET media.order = ? ", order.i)
          await pool.query(
            "UPDATE media SET media.order = ? WHERE name = ? AND product_id = ? AND store_id = ?",
            [order.i, order.file, product_id, req.user.id]
          );

          //console.log(order)
          /* var tags = await pool.query("SELECT * FROM tags WHERE store_id = ? AND tags_title = ? AND active = 1", [req.user.id, title.id])
                 tags_titles.push({
                         "tag_title": title.name,
                         "required" : title.required,
                         "tags" : tags
                     })*/
        });
      } else {
        res.status(404).send("Product Not Found");
      }

      //

      res.json({
        status: "updated",
      });
    }
  );

  app.get("/loja/product/:product_id", isLoggedIn, async function (req, res) {
    // render the page and pass in any flash data if it exists

    var product_info = await pool.query(
      "SELECT * FROM products WHERE store_id = ? AND product_id = ?",
      [req.user.id, req.params.product_id]
    );
    //console.log(product_info)
    if (product_info[0]) {
      var tags_titles = [];
      var tag_title = await pool.query(
        "SELECT id,name, required FROM tags_title WHERE store_id = ? AND active = 1",
        req.user.id
      );

      await asyncForEach(tag_title, async (title) => {
        var tags = await pool.query(
          "SELECT * FROM tags WHERE store_id = ? AND tags_title = ? AND active = 1",
          [req.user.id, title.id]
        );
        tags_titles.push({
          tag_title: title.name,
          required: title.required,
          tags: tags,
        });
      });
      var category_info = await pool.query(
        "SELECT name, category_id FROM categories WHERE store_id = ?",
        [req.user.id]
      );

      res.render("admin/products/product-edit.ejs", {
        store: req.user,
        thisproduct: product_info[0],
        category: category_info,
        tags: tags_titles,
      });
    } else {
      res.status(404).send("Product Not Found");
    }
  });
  //const uploadController = require("../config/upload");
  //uploadProductImages, resizerImages

  app.post(
    "/loja/upload",
    isLoggedIn,
    upload.single("file"),
    async (req, res, next) => {
      var this_product_id = req.body.product_id;
      var count = req.body.count;

      var product_info = await pool.query(
        "SELECT id,product_id,name FROM products WHERE store_id = ? AND product_id = ?",
        [req.user.id, this_product_id]
      );

      if (product_info) {
        var product_id = product_info[0].product_id;
        // Se houve sucesso no armazenamento
        if (req.file) {
          // Vamos mandar essa imagem para compressão antes de prosseguir
          // Ela vai retornar o a promise com o novo caminho como resultado, então continuamos com o then.
          filehelper
            .compressImage(req.file, req.user.folder)
            .then((newPath) => {
              // Vamos continuar normalmente, exibindo o novo caminho
              //cadastrar a media no bando de dados
              var data = {
                name: newPath,
                store_id: req.user.id,
                product_id: product_id,
                order: count,
              };
              //console.log(data)

              pool.query(
                "INSERT INTO media SET ?",
                data,
                function (err, result) {
                  return res.send(newPath);
                }
              );

              fs.unlinkSync(req.file.path);
            })
            .catch((err) => console.log(err));
        } else {
          return res.send("Houve erro no upload!");
        }
      }
    }
  );

  app.get("/loja/stories", isLoggedIn, async function (req, res, next) {
    res.render("admin/stories/stories.ejs", {
      store: req.user,
    });
  });

  app.post(
    "/loja/StoriesUpload",
    isLoggedIn,
    upload.single("file"),
    async (req, res, next) => {
      // console.log(req.file, req.user.folder)
      var count = req.body.count;
      videohelper
        .compressVideo(req.file, req.user.folder)
        .then((newPath) => {
          // Vamos continuar normalmente, exibindo o novo caminho
          //cadastrar a media no bando de dados
          var data = {
            name: newPath,
            store_id: req.user.id,
            order: count,
            processed: 0,
          };

          //return res.send(newPath);
          //apaga o arquivo temporario no upload
          //fs.unlinkSync(req.file.path);
          pool.query("INSERT INTO stories SET ?", data, function (err, result) {
            let path = `public/media/${req.user.folder}/stories/` + newPath;
            let dest =
              `public/media/${req.user.folder}/stories/compressed_` + newPath;

            //adiciona um job para comprimir o video
            queue.add(async () => {
              await CompressVideo(path, dest).then(() => {
                //console.log('terminou de processar o video')
                //apagar o arquivo original
                //alterar no mysql para processado e novo caminho do arquivo
                //              compress  > antigo
                //console.log(getFilesizeInBytes(dest), getFilesizeInBytes(path))
                if (getFilesizeInBytes(dest) > getFilesizeInBytes(path)) {
                  pool.query(
                    `UPDATE stories SET stories.processed = 1 WHERE name = ?  AND store_id = ?`,
                    [`${newPath}`, req.user.id]
                  );
                  fs.unlinkSync(dest);
                } else {
                  pool.query(
                    `UPDATE stories SET stories.processed = 1, name = ? WHERE name = ?  AND store_id = ?`,
                    [`compressed_${newPath}`, `${newPath}`, req.user.id]
                  );
                  fs.unlinkSync(path);
                }

                //         await pool.query("UPDATE stories SET stories.order = ? WHERE name = ?  AND store_id = ?", [order.i, order.file, req.user.id])
              });
            });

            fs.unlinkSync(req.file.path);

            return res.send(newPath);
          });
        })
        .catch((err) => console.log(err));
      /*var product_info = await pool.query("SELECT id,product_id,name FROM products WHERE store_id = ? AND product_id = ?", [req.user.id, req.body.product_id])

        if (product_info) {

            var product_id = product_info[0].product_id
            // Se houve sucesso no armazenamento
            if (req.file) {
                // Vamos mandar essa imagem para compressão antes de prosseguir
                // Ela vai retornar o a promise com o novo caminho como resultado, então continuamos com o then.
                filehelper.compressImage(req.file, req.user.folder)
                    .then(newPath => {
                        // Vamos continuar normalmente, exibindo o novo caminho
                        //cadastrar a media no bando de dados
                        var data = {
                            name: newPath,
                            store_id: req.user.id,
                            product_id: product_id
                        };
                        fs.unlinkSync(req.file.path);
                        pool.query('INSERT INTO media SET ?', data, function(err, result) {
                            return res.send(newPath);
                        })

                    })
                    .catch(err => console.log(err));
            } else {
                return res.send('Houve erro no upload!');
            }

        }
*/
    }
  );

  app.post(
    "/loja/BannersUpload",
    isLoggedIn,
    upload.single("file"),
    async (req, res, next) => {
      var count = req.body.count;
      bannerhelper
        .compressImage(req.file, req.user.folder)
        .then((newPath) => {
          // Vamos continuar normalmente, exibindo o novo caminho
          //cadastrar a media no bando de dados
          var data = {
            name: newPath,
            store_id: req.user.id,
            order: count,
          };
          //fs.unlinkSync(req.file.path);
          pool.query("INSERT INTO banners SET ?", data, function (err, result) {
            return res.json(newPath);
          });

          fs.unlinkSync(req.file.path);
        })
        .catch((err) => console.log(err));
    }
  );

  app.post(
    "/loja/stories/update-order",
    isLoggedIn,
    async function (req, res, next) {
      var orders = req.body.order;
      //req.user
      await asyncForEach(orders, async (order) => {
        //await pool.query("UPDATE media SET media.order = ? ", order.i)
        await pool.query(
          "UPDATE stories SET stories.order = ? WHERE name = ?  AND store_id = ?",
          [order.i, order.file, req.user.id]
        );
      });

      //

      res.json({
        status: "updated",
      });
    }
  );

  app.post(
    "/loja/story/update-url",
    isLoggedIn,
    async function (req, res, next) {
      var url = req.body.url;
      var name = req.body.name;
      var button = req.body.button;

      //console.log(url, name)
      //req.user

      await pool.query(
        "UPDATE stories SET stories.url = ? , stories.button = ? WHERE name = ?  AND store_id = ?",
        [url, button, name, req.user.id]
      );

      res.json({
        status: "updated",
      });
    }
  );

  app.post(
    "/loja/banner/update-order",
    isLoggedIn,
    async function (req, res, next) {
      var orders = req.body.order;
      //req.user
      await asyncForEach(orders, async (order) => {
        //await pool.query("UPDATE media SET media.order = ? ", order.i)
        await pool.query(
          "UPDATE banners SET banners.order = ? WHERE name = ?  AND store_id = ?",
          [order.i, order.file, req.user.id]
        );
      });
      res.json({
        status: "updated",
      });
    }
  );

  app.post(
    "/loja/banner/update-url",
    isLoggedIn,
    async function (req, res, next) {
      var url = req.body.url;
      var name = req.body.name;

      // console.log(url, name)
      //req.user

      await pool.query(
        "UPDATE banners SET banners.redirect = ? WHERE name = ?  AND store_id = ?",
        [url, name, req.user.id]
      );

      res.json({
        status: "updated",
      });
    }
  );

  app.post("/loja/media", isLoggedIn, async function (req, res) {
    // render the page and pass in any flash data if it exists
    var product_id = req.body.product_id;
    //var count = req.body.count
    var image = await pool.query(
      "SELECT product_id,name FROM media WHERE store_id = ? AND product_id = ? ORDER BY media.order ASC",
      [req.user.id, product_id]
    );
    res.json({
      image,
    });
  });

  app.post("/loja/StoriesMedia", isLoggedIn, async function (req, res) {
    // render the page and pass in any flash data if it exists
    var product_id = req.body.product_id;
    //var count = req.body.count
    var image = await pool.query(
      "SELECT * FROM stories WHERE store_id = ? ORDER BY stories.order ASC",
      [req.user.id]
    );
    res.json({
      image,
    });
  });

  app.post("/loja/subscrible", isLoggedIn, async function (req, res) {
    // render the page and pass in any flash data if it exists
    var token = req.body.token;
    //var count = req.body.count
    var data = {
      token: token,
      store_id: req.user.id,
    };

    const tokenexist = await pool.query(
      "SELECT token FROM notification WHERE token = ? LIMIT 0,1",
      token
    );
    if (!tokenexist[0]) {
      await pool.query("INSERT INTO notification SET ?", data);
    }

    res.json({
      token,
    });
  });

  /* app.post('/loja/notify', async function (req, res) {
        // render the page and pass in any flash data if it exists
        var cod = req.body.cod
        //var count = req.body.count

        var tokens = []
        const store = await pool.query("SELECT id,logo,store,cod, name, address, bio,message, phone, min_order, instagram, facebook, folder, pixel  FROM stores WHERE cod = ?", [cod])
        if (store[0]) {


            var store_id = store[0].id
            // cosultar os devices conectados para enviar notificações
            const devices = await pool.query("SELECT *  FROM notification WHERE store_id = ?", store_id)

            await asyncForEach(devices, async (device) => {
                tokens.push({
                'token': device.token,
                'store_name' : store[0].name
                })
            })
    
        }

   res.json( tokens)
    });*/

  app.post("/loja/BannersMedia", isLoggedIn, async function (req, res) {
    // render the page and pass in any flash data if it exists
    var product_id = req.body.product_id;
    //var count = req.body.count
    var image = await pool.query(
      "SELECT * FROM banners WHERE store_id = ? ORDER BY banners.order ASC",
      [req.user.id]
    );
    res.json({
      image,
    });
  });

  app.post("/loja/media/delete", isLoggedIn, async function (req, res) {
    // render the page and pass in any flash data if it exists
    req.body.name;

    var image = await pool.query(
      "SELECT product_id,name FROM media WHERE store_id = ? AND name = ?",
      [req.user.id, req.body.name]
    );

    //DELETE FROM NOME_DA_TABELA WHERE id = VALOR_DO_ID;
    await pool.query("DELETE FROM media WHERE store_id = ? AND name = ?", [
      req.user.id,
      req.body.name,
    ]);

    var filePath = `./public/media/${req.user.folder}/${image[0].name}`;
    fs.unlinkSync(filePath);
    var filePath = `./public/media/${req.user.folder}/big/${image[0].name}`;
    fs.unlinkSync(filePath);

    res.json({
      image,
    });
  });

  app.post("/loja/tag/delete", isLoggedIn, async function (req, res) {
    // render the page and pass in any flash data if it exists
    //req.body.id

    var tag = await pool.query(
      "SELECT id,name,tags_title FROM tags WHERE store_id = ? AND id = ?",
      [req.user.id, req.body.id]
    );
    //console.log(banner)
    if (tag[0]) {
      //DELETE FROM NOME_DA_TABELA WHERE id = VALOR_DO_ID;
      await pool.query("DELETE FROM tags WHERE store_id = ? AND id = ?", [
        req.user.id,
        req.body.id,
      ]);

      //res.redirect(`/loja/variations/${tag[0].tags_title}/tags`);

      res.json({
        success: `${tag[0].tags_title}`,
      });
    } else {
      res.json({
        erro: "not found",
      });
    }
  });

  app.post("/loja/variations/delete", isLoggedIn, async function (req, res) {
    // render the page and pass in any flash data if it exists
    //req.body.id
    var tags_title = await pool.query(
      "SELECT id,name FROM tags_title WHERE store_id = ? AND id = ?",
      [req.user.id, req.body.id]
    );
    //console.log(banner)
    if (tags_title[0]) {
      //DELETE FROM NOME_DA_TABELA WHERE id = VALOR_DO_ID;
      await pool.query("DELETE FROM tags_title WHERE store_id = ? AND id = ?", [
        req.user.id,
        req.body.id,
      ]);

      //res.redirect(`/loja/variations/${tag[0].tags_title}/tags`);

      res.json({
        success: `true`,
      });
    } else {
      res.json({
        erro: "not found",
      });
    }
  });

  app.post("/loja/banner/delete", isLoggedIn, async function (req, res) {
    // render the page and pass in any flash data if it exists
    //req.body.id

    var banner = await pool.query(
      "SELECT id,name FROM banners WHERE store_id = ? AND name = ?",
      [req.user.id, req.body.name]
    );
    //console.log(banner)
    if (banner[0]) {
      //DELETE FROM NOME_DA_TABELA WHERE id = VALOR_DO_ID;
      await pool.query("DELETE FROM banners WHERE store_id = ? AND name = ?", [
        req.user.id,
        req.body.name,
      ]);
      var filePath = `./public/media/${req.user.folder}/banners/${banner[0].name}`;
      fs.unlinkSync(filePath);

      res.json({
        success: "banner deleted",
      });
    } else {
      res.json({
        erro: "banner not found",
      });
    }
  });

  app.post("/loja/story/delete", isLoggedIn, async function (req, res) {
    // render the page and pass in any flash data if it exists
    //req.body.id

    var storie = await pool.query(
      "SELECT id,name FROM stories WHERE store_id = ? AND name = ?",
      [req.user.id, req.body.name]
    );

    if (storie[0]) {
      //DELETE FROM NOME_DA_TABELA WHERE id = VALOR_DO_ID;
      await pool.query("DELETE FROM stories WHERE store_id = ? AND name = ?", [
        req.user.id,
        req.body.name,
      ]);
      var filePath = `public/media/${req.user.folder}/stories/${req.body.name}`;
      fs.unlinkSync(filePath);

      res.json({
        success: "stories deleted",
      });
    } else {
      res.json({
        erro: "stories not found",
      });
    }
  });

  app.get("/cart/:cod", LoginAcess, async function (req, res, next) {
    try {
      const cod = req.params.cod;
      const store = await pool.query(
        "SELECT id,logo,store,cod, name, address, bio,message, phone, min_order, instagram, facebook, folder, pixel  FROM stores WHERE cod = ?",
        [cod]
      );

      if (store[0]) {
        req.session.urlRedirect = req.url;

        if (req.signedCookies["seller"]) {
          //temos um vendedor no cookie temos que descobrir algumas coisas sobre ele
          var seller_store = req.signedCookies["seller"].store_id;

          if (seller_store != store[0].id) {
            //esse vendedor não pertence a essa lojinha
            //nao tem vendedor temos que escolher um

            const seller = await pool.query(
              "SELECT * FROM sellers WHERE store_id = ?",
              [store[0].id]
            );
            if (seller.length == 1) {
              res.cookie("seller", seller[0], {
                maxAge: 1 * 365 * 24 * 60 * 60 * 1000,
                signed: true,
              });

              await res.render("app/cart.ejs", {
                store: store[0],
                seller: seller[0],
              });
            } else {
              res.redirect(`/${store[0].cod}/find/seller`);
            }
          } else {
            //carrego o carrinho
            await res.render("app/cart.ejs", {
              store: store[0],
              seller: req.signedCookies["seller"],
            });
          }
        } else {
          //nao tem vendedor temos que escolher um
          //vamos marcar para onde devemos ser redirecionados

          const seller = await pool.query(
            "SELECT * FROM sellers WHERE store_id = ?",
            [store[0].id]
          );

          if (seller.length == 1) {
            res.cookie("seller", seller[0], {
              maxAge: 1 * 365 * 24 * 60 * 60 * 1000,
              signed: true,
            });

            await res.render("app/cart.ejs", {
              store: store[0],
              seller: seller[0],
            });
          } else {
            res.redirect(`/${store[0].cod}/find/seller`);
          }
        }
      } else {
        res.status(404).send("Loja Not Found =/");
      }

      /* if (store[0]) {

                req.session.urlRedirect = req.url;
            
                if (req.signedCookies['seller']) {

                    var seller_store = req.signedCookies['seller'].store_id

                    if (seller_store != store[0].id) {
                        //esse vendedor não pertence a essa lojinha
                        //nao tem vendedor temos que escolher um
                        // req.session.urlRedirect = req.url;

                        res.redirect(`/${store[0].cod}/find/seller`);

                    } else {

                        await res.render('app/cart.ejs', {
                            store: store[0],
                            seller: req.signedCookies['seller']
                        });
                    }


                } else {
                    const seller = await pool.query("SELECT * FROM sellers WHERE store_id = ?", [store[0].id])

                    if (seller.length == 1) {
                        res.cookie('seller', seller[0], {
                            maxAge: 1 * 365 * 24 * 60 * 60 * 1000,
                            signed: true
                        })

                        res.redirect(`/${store[0].cod}`);

                    } else {
                        res.redirect(`/${store[0].cod}/find/seller`);

                    }
                }

            } else {
                res.status(404).send('Loja Not Found =/');
            }*/
    } catch (err) {
      console.error(err);
    }
  });

  async function LoginAcess(req, res, next) {
    req.session.urlRedirect = req.url;

    if (!req.user) {
      let access = req.signedCookies["user"];
      if (access) {
        const user = await pool.query("SELECT *  FROM users WHERE id = ?", [
          access.id,
        ]);

        console.log(user);
        console.log(req.user);

        if (user[0]) return next();
        else {
          res.clearCookie("user");
          //res.redirect(req.url + "/login");
          res.redirect("/catalogo/login");
        }
      } else {
        //res.redirect(req.url + "/login");
        res.redirect("/catalogo/login");
      }
    } else {
      return next();
    }
  }

  app.get("/catalogo/login", async function (req, res, next) {
    //console.log(products_array)

    if (req.signedCookies["user"]) {
      const store = await pool.query("SELECT cod FROM stores WHERE id = ?", [
        req.signedCookies["user"].id,
      ]);

      res.redirect(`/${store[0].cod}`);
    } else {
      await res.render("app/login.ejs", {
        error: false,
        store: "",
      });
    }
  });

  app.post("/catalogo/login", async function (req, res) {
    const user = req.body.user;
    const password = req.body.password;

    const thisUser = await pool.query(
      "SELECT * FROM users WHERE user = ? AND password = ?",
      [user, password]
    );

    if (thisUser[0]) {
      res.cookie("user", thisUser[0], {
        maxAge: 1 * 365 * 24 * 60 * 60 * 1000,
        signed: true,
      });

      const store = await pool.query("SELECT cod FROM stores WHERE id = ?", [
        thisUser[0].store_id,
      ]);

      // res.redirect((req.session.urlRedirect) ? req.session.urlRedirect : `/${store[0].cod}`);
      //res.redirect((req.session.urlRedirect) ? req.session.urlRedirect : `/${store[0].cod}`);

      res.redirect(`/${store[0].cod}`);
      //res.redirect((req.session.urlRedirect) ? req.session.urlRedirect : `/${store[0].cod}`);
    } else {
      await res.render("app/login.ejs", {
        error: true,
        store: "",
      });
    }
  });

  app.get("/:cod", LoginAcess, async function (req, res, next) {
    try {
      const cod = req.params.cod;
      const store = await pool.query(
        "SELECT id,logo,store,cod, name, address, bio, phone, min_order, instagram, facebook, folder, pixel, show_categories_home, show_banner_sequential,show_search_at_home  FROM stores WHERE cod = ?",
        [cod]
      );
      const categories = await pool.query(
        "SELECT name, category_id, icon FROM categories WHERE active ='1' AND store_id = ? ORDER BY categories.name ASC",
        [store[0].id]
      );

      if (store[0]) {
        //if (req.signedCookies['seller']) {
        //temos um vendedor no cookie temos que descobrir algumas coisas sobre ele
        //var seller_store = req.signedCookies['seller'].store_id

        /* if (seller_store != store[0].id) {
                        //esse vendedor não pertence a essa lojinha
                        //nao tem vendedor temos que escolher um
                        // req.session.urlRedirect = req.url;
                        res.redirect(`/${store[0].cod}/find/seller`);

                    } else {*/

        var discounts = [];
        var featureds = [];
        var this_products = [];

        var products = await pool.query(
          "SELECT * FROM products WHERE active ='1' AND store_id = ? AND discount > 0 ORDER BY RAND() LIMIT 20",
          [store[0].id]
        );
        await asyncForEach(products, async (product) => {
          //console.log(['joe', 'jane', 'mary'].includes('jane')); //true
          var images = await pool.query(
            "SELECT name FROM media WHERE product_id = ? ORDER BY media.order ASC LIMIT 0,1",
            [product.product_id]
          );
          var arrayProd = {
            product_id: product.product_id,
            name: product.name,
            price: product.price,
            discount: product.discount,
            active: product.active,
            featured: product.featured,
            media: images,
          };
          //products_array.push(arrayProd)
          discounts.push(arrayProd);
        });

        // variações de busca

        var search_tags = [];
        const tags_title = await pool.query(
          "SELECT * FROM tags_title WHERE store_id = ?  AND active ='1' ORDER BY tags_title.order ASC",
          [store[0].id]
        );

        await asyncForEach(tags_title, async (tag_title) => {
          const tags = await pool.query(
            "SELECT * FROM tags WHERE store_id = ? AND tags_title = ? AND active ='1'  ORDER BY CAST(tags.name AS UNSIGNED)",
            [store[0].id, tag_title.id]
          );
          search_tags.push({
            title: tag_title.name,
            tags: tags,
          });
        });

        //console.log(search_tags)

        //produtos em destaque
        var products = await pool.query(
          "SELECT * FROM products WHERE active ='1' AND store_id = ? AND featured = 1 ORDER BY RAND() LIMIT 20",
          [store[0].id]
        );
        await asyncForEach(products, async (product) => {
          //console.log(['joe', 'jane', 'mary'].includes('jane')); //true
          var images = await pool.query(
            "SELECT name FROM media WHERE product_id = ? ORDER BY media.order ASC LIMIT 0,1",
            [product.product_id]
          );
          var arrayProd = {
            product_id: product.product_id,
            name: product.name,
            price: product.price,
            discount: product.discount,
            active: product.active,
            featured: product.featured,
            media: images,
          };
          //products_array.push(arrayProd)
          featureds.push(arrayProd);
        });

        var products = await pool.query(
          "SELECT * FROM products WHERE active ='1' AND store_id = ?  ORDER BY RAND() LIMIT 20",
          [store[0].id]
        );
        await asyncForEach(products, async (product) => {
          //console.log(['joe', 'jane', 'mary'].includes('jane')); //true
          var images = await pool.query(
            "SELECT name FROM media WHERE product_id = ? ORDER BY media.order ASC LIMIT 0,1",
            [product.product_id]
          );
          var arrayProd = {
            product_id: product.product_id,
            name: product.name,
            price: product.price,
            discount: product.discount,
            active: product.active,
            featured: product.featured,
            media: images,
          };
          //products_array.push(arrayProd)
          this_products.push(arrayProd);
        });

        //console.log(this_products)

        var banners = await pool.query(
          "SELECT * FROM banners WHERE store_id = ? ORDER BY banners.order ASC",
          [store[0].id]
        );

        res.render("app/index.ejs", {
          store: store[0],
          discounts: discounts,
          featureds: featureds,
          products: this_products,
          search_tags: search_tags,
          banners: banners,
          admin: req.user ? true : false,
          categories: categories,
        });

        // }

        /* } else {
                    //nao tem vendedor temos que escolher um
                    req.session.urlRedirect = req.url;

                    const seller = await pool.query("SELECT * FROM sellers WHERE store_id = ?", [store[0].id])

                    if (seller.length == 1) {
                        res.cookie('seller', seller[0], {
                            maxAge: 1 * 365 * 24 * 60 * 60 * 1000,
                            signed: true
                        })

                        res.redirect(`/${store[0].cod}`);

                    } else {
                        res.redirect(`/${store[0].cod}/find/seller`);

                    }

                }*/
      } else {
        res
          .status(404)
          .send("Loja Não Encontrada, entre em contato com o suporte =/");
      }
    } catch (err) {
      console.error(err);
    }
  });

  app.get("/:cod/stories/:file", async function (req, res) {
    const cod = req.params.cod;
    const store = await pool.query("SELECT folder FROM stores WHERE cod = ?", [
      cod,
    ]);

    if (store[0]) {
      //path.resolve(__dirname, '../', 'public/media/no-pic.jpg')
      const fileName = req.params.file;
      //\media\folder1234\stories
      let path = `public/media/${store[0].folder}/stories/` + fileName;

      if (fs.existsSync(path)) {
        //file exists

        fs.stat(path, (err, stat) => {
          // Handle file not found
          if (err !== null && err.code === "ENOENT") {
            res.sendStatus(404);
          }

          const fileSize = stat.size;
          const range = req.headers.range;

          if (range) {
            const parts = range.replace(/bytes=/, "").split("-");

            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

            const chunksize = end - start + 1;
            const file = fs.createReadStream(path, {
              start,
              end,
            });
            const head = {
              "Content-Range": `bytes ${start}-${end}/${fileSize}`,
              "Accept-Ranges": "bytes",
              "Content-Length": chunksize,
              "Content-Type": "video/mp4",
            };

            res.writeHead(206, head);
            file.pipe(res);
          } else {
            const head = {
              "Content-Length": fileSize,
              "Content-Type": "video/mp4",
            };

            res.writeHead(200, head);
            fs.createReadStream(path).pipe(res);
          }
        });
      } else {
        res.status(404).send("Não encontramos o story, Not Found");
      }
    } else {
      res.status(404).send("Não encontramos o story, Not Found");
    }

    /*  const stat = fs.statSync(path)
           console.log(stat)
           const fileSize = stat.size
           const range = req.headers.range
         
           if (range) {
             const parts = range.replace(/bytes=/, "").split("-")
             const start = parseInt(parts[0], 10)
             const end = parts[1]
               ? parseInt(parts[1], 10)
               : fileSize-1
         
             if(start >= fileSize) {
               res.status(416).send('Requested range not satisfiable\n'+start+' >= '+fileSize);
               return
             }
             
             const chunksize = (end-start)+1
             const file = fs.createReadStream(path, {start, end})
             const head = {
               'Content-Range': `bytes ${start}-${end}/${fileSize}`,
               'Accept-Ranges': 'bytes',
               'Content-Length': chunksize,
               'Content-Type': 'video/mp4',
             }
         
             res.writeHead(206, head)
             file.pipe(res)
           } else {
             const head = {
               'Content-Length': fileSize,
               'Content-Type': 'video/mp4',
             }
             res.writeHead(200, head)
             fs.createReadStream(path).pipe(res)
           }*/
  });

  app.get("/:cod/catalog", async function (req, res, next) {
    try {
      const cod = req.params.cod;
      const store = await pool.query(
        "SELECT id,logo,store,cod, name, address, bio, phone, min_order, instagram, facebook, folder, pixel, show_categories_home, show_banner_sequential,show_search_at_home  FROM stores WHERE cod = ?",
        [cod]
      );

      if (store[0]) {
        var item = "";

        var products = await pool.query(
          "SELECT * FROM products WHERE active ='1' AND store_id = ?",
          [store[0].id]
        );
        await asyncForEach(products, async (product) => {
          //console.log(['joe', 'jane', 'mary'].includes('jane')); //true
          var images = await pool.query(
            "SELECT name FROM media WHERE product_id = ? ORDER BY media.order ASC LIMIT 0,1",
            [product.product_id]
          );
          /* var arrayProd = {
                    "product_id": product.product_id,
                    "name": product.name,
                    "price": product.price,
                    "discount": product.discount,
                    "active": product.active,
                    "featured": product.featured,
                    "media": images
                }*/
          ///media/loja-de-camisas/1620202407673.webp
          //products_array.push(arrayProd)

          item += `<Item>
                <id>${product.id}</id>
                <title>${product.name}</title>
                <description>${product.description}</description>
                <link>https://anyloja.com.br/${cod}/product/${
            product.product_id
          }</link>
                <image_link>https://anyloja.com.br/media/${cod}/${
            images[0].name
          }</image_link>
                <brand>${store[0].name}</brand>
                <condition>new</condition>
                <availability>${
                  product.active == 0 ? "out of stock" : "in stock"
                }</availability>
                <price>${(product.price - product.discount).toFixed(2)}</price>
                <google_product_category>1604</google_product_category>
                </Item>`;
        });

        res.type("text/xml").send(`<rss><Channel>${item}</Channel></rss>`);
      } else {
        res
          .status(404)
          .send("Loja Não Encontrada, entre em contato com o suporte =/");
      }
    } catch (err) {
      console.error(err);
    }
  });

  app.get("/:cod/promotions", LoginAcess, async function (req, res, next) {
    try {
      const cod = req.params.cod;

      var products_array = [];
      // var products = await pool.query("SELECT * FROM products WHERE categorie_id = ?", [req.user.id, category_id])
      const store = await pool.query(
        "SELECT id,logo,store,cod, name, address, bio, phone, min_order, instagram, facebook, folder, pixel  FROM stores WHERE cod = ?",
        [cod]
      );

      const products = await pool.query(
        "SELECT * FROM products WHERE active ='1' AND discount > 0 AND store_id = ?  ORDER BY products.name ASC",
        store[0].id
      );
      await asyncForEach(products, async (product) => {
        //console.log(['joe', 'jane', 'mary'].includes('jane')); //true
        const images = await pool.query(
          "SELECT name FROM media WHERE product_id = ? ORDER BY media.order ASC LIMIT 0,1",
          [product.product_id]
        );
        var arrayProd = {
          product_id: product.product_id,
          name: product.name,
          price: product.price,
          discount: product.discount,
          active: product.active,
          featured: product.featured,
          media: images,
        };

        products_array.push(arrayProd);
      });

      //console.log(products_array)
      await res.render("app/promotions.ejs", {
        store: store[0],
        products: products_array,
      });
    } catch (err) {
      console.error(err);
    }
  });

  app.get("/:cod/featured", LoginAcess, async function (req, res, next) {
    try {
      const cod = req.params.cod;

      var products_array = [];
      // var products = await pool.query("SELECT * FROM products WHERE categorie_id = ?", [req.user.id, category_id])
      const store = await pool.query(
        "SELECT id,logo,store,cod, name, address, bio, phone, min_order, instagram, facebook, folder, pixel  FROM stores WHERE cod = ?",
        [cod]
      );

      const products = await pool.query(
        "SELECT * FROM products WHERE active ='1' AND featured = 1 AND store_id = ?  ORDER BY products.name ASC",
        store[0].id
      );
      await asyncForEach(products, async (product) => {
        //console.log(['joe', 'jane', 'mary'].includes('jane')); //true
        const images = await pool.query(
          "SELECT name FROM media WHERE product_id = ? ORDER BY media.order ASC LIMIT 0,1",
          [product.product_id]
        );
        var arrayProd = {
          product_id: product.product_id,
          name: product.name,
          price: product.price,
          discount: product.discount,
          active: product.active,
          featured: product.featured,
          media: images,
        };

        products_array.push(arrayProd);
      });

      //console.log(products_array)

      await res.render("app/featured.ejs", {
        store: store[0],
        products: products_array,
      });
    } catch (err) {
      console.error(err);
    }
  });

  app.get("/order/:order_id", async function (req, res, next) {
    var order_id = req.params.order_id;

    if (req.user) {
      res.redirect(`/loja/order/${order_id}`);
    } else {
      var order = await pool.query(
        "SELECT * FROM orders WHERE order_cod=? LIMIT 0,1",
        order_id
      );
      // var products = await pool.query("SELECT * FROM orders_products WHERE store_id = ? AND order_id=? LIMIT 0,1", [req.user.id, order[0].id])

      var store = await pool.query(
        "SELECT id,logo,store,cod, name, address, bio, phone, min_order, instagram, facebook, folder, pixel  FROM stores WHERE id = ?",
        [order[0].store_id]
      );

      var products_array = [];
      var products = await pool.query(
        "SELECT * FROM orders_products WHERE store_id = ? AND order_id=?",
        [order[0].store_id, order[0].id]
      );
      await asyncForEach(products, async (product) => {
        var images = await pool.query(
          "SELECT name FROM media WHERE product_id = ? ORDER BY media.order ASC LIMIT 0,1",
          [product.product_id]
        );
        var arrayProd = {
          product_id: product.product_id,
          name: product.name,
          price: product.price,
          qnt: product.qnt,
          variations: product.variations,
          media: images,
        };

        products_array.push(arrayProd);
      });

      res.render("app/order_check.ejs", {
        store: store[0],
        order: order[0],
        products: products_array,
      });
    }
  });

  app.get("/:cod/buscar", LoginAcess, async function (req, res, next) {
    var query = require("url").parse(req.url, true).query;
    var variations = query.por;
    var term = query.term;
    var order_price = query.price;
    const categorie = query.categories;
    var SearchName = "";

    const cod = req.params.cod;
    const store = await pool.query(
      "SELECT id,logo,store,cod, name, address, bio, phone, min_order, instagram, facebook, folder, pixel  FROM stores WHERE cod = ?",
      [cod]
    );

    //se o variations for vazia busca todas as variações
    var categories_search = "";
    //    if(searchTag.tags.length > 1){
    if (categorie) {
      const cat = await pool.query(
        "SELECT name, category_id FROM categories WHERE category_id = ? AND store_id = ?",
        [categorie, store[0].id]
      );
      if (cat[0]) {
        var categories_search = `AND (FIND_IN_SET('${categorie}', products.categorie_id))`;
        SearchName = cat[0].name;
      }
      //}
    }

    if (term) {
      term = ` AND products.name like _utf8'%${term}%' collate utf8_general_ci  `;
    } else {
      term = "";
    }

    // console.log(categorie, categories_search)

    //var productTags =  product_variations.split(',');

    //AND tags.id IN (?)

    if (["high", "lower", "discount", "discount_price"].includes(order_price)) {
      if (order_price == "lower") {
        var order = `ORDER BY finalprice ASC`;
      } else if (order_price == "high") {
        var order = `ORDER BY finalprice DESC`;
      } else if (order_price == "discount_price") {
        var order = `ORDER BY IFNULL(products.discount, products.price) DESC`;
      } else if (order_price == "discount") {
        var order = `ORDER BY discount_price DESC`;
      } else {
        var order = `ORDER BY finalprice ASC`;
      }
    } else {
      var order = `ORDER BY finalprice ASC`;
    }

    var search_tags = [];
    var searchTPL = ``;
    var totalResults = 0;

    if (variations) {
      // HA VARIAÇÕES
      var productTags = variations.split(",");

      //pego os tagtitle disponiveis
      const tags_title2 = await pool.query(
        "SELECT tags_title.name As title, tags_title.id, tags_title.required FROM tags INNER JOIN tags_title ON tags_title.id = tags.tags_title WHERE tags_title.store_id = ? AND tags.id IN (?) AND tags_title.active ='1' GROUP BY  tags_title.name, tags_title.id ORDER BY tags_title.order ASC",
        [store[0].id, productTags]
      );

      await asyncForEach(tags_title2, async (tag_title) => {
        var mountTags = [];
        const tags = await pool.query(
          "SELECT * FROM tags WHERE store_id = ? AND active ='1' AND tags_title = ? AND tags.id IN (?)  ORDER BY CAST(tags.name AS UNSIGNED)",
          [store[0].id, tag_title.id, productTags]
        );
        await asyncForEach(tags, async (tag) => {
          productTags.find((el) => {
            if (el == tag.id) {
              mountTags.push({
                name: tag.name,
                id: tag.id,
              });
            }
          });
        });

        search_tags.push({
          title: tag_title.title,
          tags: mountTags,
        });
      });

      await asyncForEach(search_tags, async (searchTag, i) => {
        // console.log(searchTag, i, searchTag.tags.length)

        if (searchTag.tags.length > 1) {
          await asyncForEach(searchTag.tags, async (tag, i) => {
            if (i == 0) {
              searchTPL += ` AND (FIND_IN_SET('${tag.id}',products.tags) `;
            } else if (searchTag.tags.length == i + 1) {
              searchTPL += ` OR FIND_IN_SET('${tag.id}',products.tags)) `;
            } else {
              searchTPL += ` OR FIND_IN_SET('${tag.id}',products.tags) `;
            }
          });
        } else {
          searchTPL += ` AND FIND_IN_SET('${searchTag.tags[0].id}',products.tags) `;
        }
        //console.log(searchTPL)
      });
    } else {
      const tags_title2 = await pool.query(
        "SELECT tags_title.name As title, tags_title.id, tags_title.required FROM tags INNER JOIN tags_title ON tags_title.id = tags.tags_title WHERE tags_title.store_id = ? AND tags_title.active ='1' GROUP BY  tags_title.name, tags_title.id ORDER BY tags_title.order ASC",
        [store[0].id]
      );

      await asyncForEach(tags_title2, async (tag_title) => {
        var mountTags = [];
        const tags = await pool.query(
          "SELECT * FROM tags WHERE store_id = ? AND active ='1' AND tags_title = ?  ORDER BY CAST(tags.name AS UNSIGNED)",
          [store[0].id, tag_title.id]
        );
        await asyncForEach(tags, async (tag) => {
          mountTags.push({
            name: tag.name,
            id: tag.id,
          });
        });

        search_tags.push({
          title: tag_title.title,
          tags: mountTags,
        });
      });

      searchTPL = ``;
    }

    var query = `SELECT products.store_id, products.tags, products.id, products.name, products.categorie_id, products.product_id, products.price, products.discount, products.active, products.featured , (products.price-IFNULL(products.discount,0)) as finalprice,(IFNULL(products.discount,1)/products.price*100) as discount_price FROM products WHERE products.store_id = ? ${term} ${searchTPL} ${categories_search} GROUP BY products.id ${order}`;
    ////${Math.round((product.discount/product.price) * 100)}
    //console.log(query)

    const products = await pool.query(`${query}`, store[0].id);
    //console.log(products)
    var products_array = [];

    await asyncForEach(products, async (product) => {
      var search_tags3 = [];

      var product_variations = product.tags;

      if (product_variations.length > 0) {
      } else {
      }

      var productTags = product_variations.split(",");
      //pego os tagtitle disponiveis
      const tags_title = await pool.query(
        "SELECT tags_title.name As title, tags_title.id, tags_title.required FROM tags INNER JOIN tags_title ON tags_title.id = tags.tags_title WHERE tags_title.store_id = ? AND tags.id IN (?) AND tags_title.required = 1 AND tags_title.active ='1' GROUP BY  tags_title.name, tags_title.id ORDER BY tags_title.order ASC",
        [store[0].id, productTags]
      );
      await asyncForEach(tags_title, async (tag_title) => {
        var mountTags = [];
        //console.log(tag_title.title, tag_title.id)
        const tags = await pool.query(
          "SELECT * FROM tags WHERE store_id = ? AND tags_title= ? AND active ='1'  ORDER BY CAST(tags.name AS UNSIGNED)",
          [store[0].id, tag_title.id]
        );
        //console.log(tags)
        await asyncForEach(tags, async (tag) => {
          productTags.find((el) => {
            if (el == tag.id)
              //pega as caracteristicas obrigatorias
              mountTags.push({
                name: tag.name,
                id: tag.id,
              });
          });
        });

        search_tags3.push({
          title: tag_title.title,
          tags: mountTags,
        });
      });

      //console.log(['joe', 'jane', 'mary'].includes('jane')); //true
      const images = await pool.query(
        "SELECT name FROM media WHERE product_id = ? ORDER BY media.order ASC LIMIT 0,1",
        [product.product_id]
      );
      var arrayProd = {
        product_id: product.product_id,
        name: product.name,
        price: product.price,
        discount: product.discount,
        active: product.active,
        featured: product.featured,
        media: images,
        categories: product.categorie_id,
        tags: product.tags,
        off: product.discount_price,
        product_required_tag: search_tags3,
      };
      totalResults++;
      products_array.push(arrayProd);
    });

    var search_tags2 = [];
    const tags_title = await pool.query(
      "SELECT * FROM tags_title WHERE store_id = ?  AND active ='1' ORDER BY tags_title.order ASC",
      [store[0].id]
    );

    await asyncForEach(tags_title, async (tag_title) => {
      const tags = await pool.query(
        "SELECT * FROM tags WHERE store_id = ? AND tags_title = ? AND active ='1'  ORDER BY CAST(tags.name AS UNSIGNED)",
        [store[0].id, tag_title.id]
      );
      search_tags2.push({
        title: tag_title.name,
        tags: tags,
      });
    });

    await res.render("app/search.ejs", {
      store: store[0],
      products: products_array,
      tags: productTags,
      totalResults: totalResults,
      result_search_tags: search_tags ? search_tags : "",
      search_tags: search_tags2 ? search_tags2 : "",
      searchType: order_price,
      searchname: SearchName,
    });

    //  }else{
    // nao encontrou
    //  res.status(404).send('Problemas na Busca, Not Found');
    // }

    //}else{

    //erro da string nao é valida pois nao contem so numeros
    //   res.status(404).send('Problemas na Busca Numerica, Not Found');
    //}
  });

  app.post("/:cod/search", LoginAcess, async function (req, res) {
    try {
      const cod = req.params.cod;
      const term = req.body.term;

      var products_array = [];
      var totalResults = 0;
      // var products = await pool.query("SELECT * FROM products WHERE categorie_id = ?", [req.user.id, category_id])
      const store = await pool.query(
        "SELECT id,logo,store,cod, name, address, bio, phone, min_order, instagram, facebook, folder, pixel  FROM stores WHERE cod = ?",
        [cod]
      );

      const products = await pool.query(
        "SELECT * FROM products WHERE active ='1' AND store_id = ? AND name LIKE ?  ORDER BY products.name ASC",
        [store[0].id, `%${term}%`]
      );
      await asyncForEach(products, async (product) => {
        //console.log(['joe', 'jane', 'mary'].includes('jane')); //true
        const images = await pool.query(
          "SELECT name FROM media WHERE product_id = ? ORDER BY media.order ASC LIMIT 0,1",
          [product.product_id]
        );
        var arrayProd = {
          product_id: product.product_id,
          name: product.name,
          price: product.price,
          discount: product.discount,
          active: product.active,
          featured: product.featured,
          media: images,
        };
        totalResults++;

        products_array.push(arrayProd);
      });

      //console.log(products_array)

      await res.render("app/search.ejs", {
        store: store[0],
        products: products_array,
        term: term,
        totalResults: totalResults,
      });
    } catch (err) {
      console.error(err);
    }
  });

  app.get("/:cod/:url", LoginAcess, async function (req, res, next) {
    try {
      const cod = req.params.cod;
      const url = req.params.url;
      const store = await pool.query(
        "SELECT id,logo,store,cod, name, address, bio, phone, min_order, instagram, facebook, folder, pixel  FROM stores WHERE cod = ?",
        [cod]
      );
      const seller = await pool.query(
        "SELECT * FROM sellers WHERE url = ? AND store_id = ? ",
        [url, store[0].id]
      );

      //contador de abertura da loja

      if (seller[0]) {
        // existe um vendedor
        res.cookie("seller", seller[0], {
          maxAge: 1 * 365 * 24 * 60 * 60 * 1000,
          signed: true,
        });

        // res.redirect((req.session.urlRedirect) ? req.session.urlRedirect : `/${store[0].cod}`);
        //res.redirect((req.session.urlRedirect) ? req.session.urlRedirect : `/${store[0].cod}`);

        res.redirect(`/${store[0].cod}`);
      } else {
        // não existe o vendedor
        if (store[0]) {
          // existe essa loja
          //res.redirect((req.session.urlRedirect) ? req.session.urlRedirect : `/${store[0].cod}`);
          res.redirect(`/${store[0].cod}`);

          // res.redirect((req.session.urlRedirect) ? req.session.urlRedirect : `/${store[0].cod}`);
        } else {
          res.status(404).send("Catalogo Not Found");
        }
      }
    } catch (err) {
      console.error(err);
    }
  });

  app.get("/:cod/find/seller", async function (req, res, next) {
    try {
      const cod = req.params.cod;
      const store = await pool.query(
        "SELECT id,logo,store,cod, name, address, bio, phone, min_order, instagram, facebook, folder, pixel  FROM stores WHERE cod = ?",
        [cod]
      );
      const seller = await pool.query(
        "SELECT * FROM sellers WHERE store_id = ?",
        [store[0].id]
      );

      if (store[0]) {
        res.render("app/sellers.ejs", {
          store: store[0],
          sellers: seller,
        });
      } else {
        res.status(404).send("Catalogo Not Found");
      }
    } catch (err) {
      console.error(err);
    }
  });

  async function arrayProd(products) {
    return products_array;
  }

  app.get(
    "/:cod/category/:category_id",
    LoginAcess,
    async function (req, res, next) {
      try {
        const cod = req.params.cod;
        const category_id = req.params.category_id;

        // var products = await pool.query("SELECT * FROM products WHERE categorie_id = ?", [req.user.id, category_id])
        const store = await pool.query(
          "SELECT id,logo,store,cod, name, address, bio, phone, min_order, instagram, facebook, folder, pixel  FROM stores WHERE cod = ?",
          [cod]
        );
        const categorie = await pool.query(
          "SELECT name, category_id FROM categories WHERE category_id = ? AND store_id = ?",
          [category_id, store[0].id]
        );

        var query = require("url").parse(req.url, true).query;
        const buscar = query.buscar;

        var search_tags = [];
        const tags_title = await pool.query(
          "SELECT * FROM tags_title WHERE store_id = ?  AND active ='1' ORDER BY tags_title.order ASC",
          [store[0].id]
        );

        await asyncForEach(tags_title, async (tag_title) => {
          const tags = await pool.query(
            "SELECT * FROM tags WHERE store_id = ? AND tags_title = ? AND active ='1'  ORDER BY CAST(tags.name AS UNSIGNED)",
            [store[0].id, tag_title.id]
          );
          search_tags.push({
            title: tag_title.name,
            tags: tags,
          });
        });

        //console.log(search_tags)

        if (buscar) {
          var data = [store[0].id, category_id, buscar];
        } else {
          var data = [store[0].id, category_id];
        }

        const products = await pool.query(
          `SELECT * FROM products WHERE store_id = ?  AND active ='1' AND categorie_id REGEXP (?) ${
            buscar ? "AND tags REGEXP(?)" : ""
          } ORDER BY products.name ASC`,
          data
        );

        var products_array = [];
        await asyncForEach(products, async (product) => {
          //console.log(['joe', 'jane', 'mary'].includes('jane')); //true
          const images = await pool.query(
            "SELECT name FROM media WHERE product_id = ? ORDER BY media.order ASC LIMIT 0,1",
            [product.product_id]
          );
          var arrayProd = {
            product_id: product.product_id,
            name: product.name,
            price: product.price,
            discount: product.discount,
            active: product.active,
            featured: product.featured,
            media: images,
            categories: category_id,
            variations: product.variations_data,
          };

          products_array.push(arrayProd);
        });

        //const variations = await pool.query("SELECT variations.variation_value,variations.variation_name FROM variations WHERE category_id = ? AND store_id = ? GROUP BY variations.variation_name, variations.variation_value", [category_id, store[0].id])
        // tamanho
        /*var variationPreSearch = variations.reduce(function (r, a) {
                    r[a.variation_name] = r[a.variation_name] || [];
                    r[a.variation_name].push(a);
                    return r;
                }, Object.create(null));   */

        //FROM ads WHERE
        //ads.id_category IN (" . implode(',', $BestCategoriesForLead) . ")

        //
        //var v = JSON.parse(product.variations_data)

        //console.log(products_array)

        await res.render("app/products.ejs", {
          store: store[0],
          products: products_array,
          categorie: categorie[0],
          search_tags: search_tags,
          //variationPreSearch: variationPreSearch,
          //show: show ? show : '',
          //variation_text: variation_text ? variation_text : ''
        });
      } catch (err) {
        console.error(err);
        res.status(404).send("Not found");
      }
    }
  );

  app.post("/:cod/send/whatsapp", async function (req, res) {
    // render the page and pass in any flash data if it exists
    const url = req.signedCookies["seller"].url;
    const products = JSON.parse(req.body.order);

    var produtcs_DB = [];
    var totalOrder = 0;
    const cod = req.params.cod;
    const store = await pool.query("SELECT id FROM stores WHERE cod = ?", [
      cod,
    ]);

    if (store[0]) {
      const seller = await pool.query("SELECT * FROM sellers WHERE url = ?", [
        url,
      ]);

      if (seller[0]) {
        //console.log('encontramos um vendedor')

        const order_cod =
          seller[0].name.substring(0, 3).toUpperCase() + "-" + makeid(3);

        // inserindo novo pedido
        var data = {
          name: products.customer.name ? products.customer.name : "",
          phone: products.customer.whatsapp ? products.customer.whatsapp : "",
          seller_id: url,
          seller_name: seller[0].name,
          store_id: store[0].id,
          order_cod: order_cod,
          total: 0,
        };

        await pool.query(
          "INSERT INTO orders SET ?",
          data,
          async function (err, result) {
            var order_id = result.insertId;
            console.log(result);
            // Inserindo os produtos vendidos
            //console.log("inserido a order")

            await asyncForEach(products.cart.itens, async (produtc) => {
              var DbProduct = await pool.query(
                "SELECT * FROM products WHERE product_id = ?",
                [produtc.id]
              );
              //console.log("produto encontrado", DbProduct[0].name)

              // procurando as variacoes
              if (produtc.variation) {
                var variation_tpl = [];
                produtc.variation.forEach((variation) => {
                  //console.log(variation);
                  variation_tpl.push(
                    ` ${
                      variation.variation.charAt(0).toUpperCase() +
                      variation.variation.substr(1).toLowerCase()
                    }: ${
                      variation.choice.charAt(0).toUpperCase() +
                      variation.choice.substr(1).toLowerCase()
                    }`
                  );
                });
              }

              // inserindo so produtos
              if (DbProduct[0]) {
                var productsData = {
                  store_id: store[0].id,
                  product_id: DbProduct[0].product_id,
                  categorie_id: DbProduct[0].categorie_id,
                  name: DbProduct[0].name,
                  price: parseFloat(DbProduct[0].price - DbProduct[0].discount),
                  description: DbProduct[0].description,
                  variations: `${variation_tpl}`,
                  qnt: produtc.qnt,
                  order_id: order_id,
                  cod: DbProduct[0].cod ? DbProduct[0].cod : "",
                };

                produtcs_DB.push(productsData);

                totalOrder +=
                  parseFloat(DbProduct[0].price - DbProduct[0].discount) *
                  produtc.qnt;

                console.log(productsData);

                await pool.query(
                  "INSERT INTO orders_products SET ?",
                  productsData
                );
              }
            });

            //console.log(totalOrder)
            var data = {
              total: totalOrder,
            };
            await pool.query("UPDATE orders SET ? WHERE order_cod = ?", [
              data,
              order_cod,
            ]);

            await res.json({
              name: seller[0].name,
              phone: seller[0].phone.replace(/\D/g, ""),
              order_url: order_cod,
              products: produtcs_DB,
            });
          }
        );
      } else {
        res.json({
          notfound: "Nenhum vendedor foi Encontrado",
        });
      }
    }
  });

  app.get(
    "/:cod/product/:product_id",
    LoginAcess,
    async function (req, res, next) {
      try {
        const cod = req.params.cod;
        const product_id = req.params.product_id;
        var products_array = [];

        req.session.urlBack = req.url;

        const store = await pool.query(
          "SELECT id,logo,store,cod, name, address, bio, phone, min_order, instagram, facebook, folder, pixel, installment  FROM stores WHERE cod = ?",
          [cod]
        );
        const products = await pool.query(
          "SELECT * FROM products WHERE active ='1' AND product_id = ? LIMIT 0,1",
          product_id
        );
        const images = await pool.query(
          "SELECT name FROM media WHERE product_id = ? ORDER BY media.order ASC",
          product_id
        );

        if (products[0]) {
          var product_variations = products[0].tags;
          var productTags = product_variations.split(",");

          var search_tags = [];

          //pego os tagtitle disponiveis
          const tags_title = await pool.query(
            "SELECT tags_title.name As title, tags_title.id, tags_title.required FROM tags INNER JOIN tags_title ON tags_title.id = tags.tags_title WHERE tags_title.store_id = ? AND tags.id IN (?) AND tags_title.required = 1 AND tags_title.active ='1' GROUP BY  tags_title.name, tags_title.id ORDER BY tags_title.order ASC",
            [store[0].id, productTags]
          );
          await asyncForEach(tags_title, async (tag_title) => {
            var mountTags = [];
            //console.log(tag_title.title, tag_title.id)
            const tags = await pool.query(
              "SELECT * FROM tags WHERE store_id = ? AND tags_title= ? AND active ='1'  ORDER BY CAST(tags.name AS UNSIGNED)",
              [store[0].id, tag_title.id]
            );
            //console.log(tags)
            await asyncForEach(tags, async (tag) => {
              productTags.find((el) => {
                if (el == tag.id)
                  //pega as caracteristicas obrigatorias
                  mountTags.push({
                    name: tag.name,
                    id: tag.id,
                  });
              });
            });

            if (mountTags.length > 0) {
              search_tags.push({
                title: tag_title.title,
                tags: mountTags,
              });
            }
          });

          var searchTPL = "";
          // buscando itens similares
          //console.log(search_tags)

          await asyncForEach(search_tags, async (searchTag, i) => {
            // console.log(searchTag, i, searchTag.tags.length)
            if (searchTag.tags.length > 1) {
              await asyncForEach(searchTag.tags, async (tag, i) => {
                if (i == 0) {
                  searchTPL += ` AND (FIND_IN_SET('${tag.id}',products.tags) `;
                } else if (searchTag.tags.length == i + 1) {
                  searchTPL += ` OR FIND_IN_SET('${tag.id}',products.tags)) `;
                } else {
                  searchTPL += ` OR FIND_IN_SET('${tag.id}',products.tags) `;
                }
              });
            } else {
              //searchTPL += ` AND FIND_IN_SET('${searchTag.tags[0].id}',products.tags) `
            }
            //console.log(searchTPL)
          });

          var query = `SELECT products.store_id, products.tags, products.id, products.name, products.categorie_id, products.product_id, products.price, products.discount, products.active, products.featured , (products.price-IFNULL(products.discount,0)) as finalprice,(IFNULL(products.discount,1)/products.price*100) as discount_price FROM products WHERE products.store_id = '${store[0].id}' ${searchTPL} ORDER BY RAND() LIMIT 10`;

          const productsSuggest = await pool.query(`${query}`);

          ////////////////////////////////////////////////////////////////////////

          var totalResults = 0;

          var productsSuggest_array = [];

          await asyncForEach(productsSuggest, async (product) => {
            const images = await pool.query(
              "SELECT name FROM media WHERE product_id = ? ORDER BY media.order ASC LIMIT 0,1",
              [product.product_id]
            );
            var arrayProd = {
              product_id: product.product_id,
              name: product.name,
              price: product.price,
              discount: product.discount,
              active: product.active,
              featured: product.featured,
              media: images,
              categories: product.categorie_id,
              tags: product.tags,
              off: product.discount_price,
              product_required_tag: "",
            };
            totalResults++;
            productsSuggest_array.push(arrayProd);
          });

          //console.log(productsSuggest_array)

          ////////////////////////////////////////////////////////////////////////

          if (products[0]) {
            //console.log(images)

            var arrayProd = {
              product_id: products[0].product_id,
              name: products[0].name,
              codigo: products[0].cod,
              price: products[0].price,
              discount: products[0].discount,
              active: products[0].active,
              featured: products[0].featured,
              description: products[0].description,
              variations: search_tags,
              //"variations": JSON.parse(products[0].variations_data)
            };
            products_array.push(arrayProd);

            // console.log(products_array[0])
            await res.render("app/product.ejs", {
              store: store[0],
              product: products_array[0],
              images: images,
              productsSuggest: productsSuggest_array,
              admin: req.user ? true : false,
            });
          }
        } else {
          res.status(404).send("Erro 404");
        }
      } catch (err) {
        console.error(err);
      }
    }
  );

  app.post("/status/whatsapp", async function (req, res) {
    const order_cod = req.body.order_cod;
    const status = req.body.status;

    var data = {
      status:
        status == "true"
          ? `Pedido Enviado com sucesso pelo cliente.`
          : `Segundo o cliente houve halgum erro ao enviar o pedido.`,
    };
    await pool.query("UPDATE orders SET ? WHERE order_cod = ?", [
      data,
      order_cod,
    ]);

    var thisstatus = status == "true" ? "ok" : "erro";
    await res.json({
      status: thisstatus,
    });
  });

  app.get("/:cod/order/:order_cod", async function (req, res) {
    const order_cod = req.params.order_cod;
    const cod = req.params.cod;
    const store = await pool.query(
      "SELECT id,logo,store,cod, name, address, bio, phone, min_order, instagram, facebook, folder, pixel  FROM stores WHERE cod = ?",
      [cod]
    );

    await res.render("app/order.ejs", {
      store: store[0],
      order: order_cod,
    });
  });

  app.get("/api/:cod/store.js", async function (req, res) {
    const cod = req.params.cod;
    var data = await StoreData(cod);
    var story = await stories(cod);

    res.setHeader("content-type", "text/javascript");

    if (story) {
      await res.write(`var data = ${data};
            var socialStory = new Story({
                playlist: ${story},
            });
            
            `);
    } else {
      await res.write(`var data = ${data}`);
    }

    res.end();
  });

  app.post("/api/find/item", async function (req, res) {
    const item_id = req.body.id;
    //console.log(item_id)

    var t_product = [];

    var this_product = await pool.query(
      "SELECT * FROM products WHERE active ='1' AND product_id = ? LIMIT 0,1",
      [item_id]
    );

    if (this_product[0]) {
      await asyncForEach(this_product, async (product) => {
        //console.log(['joe', 'jane', 'mary'].includes('jane')); //true
        const images = await pool.query(
          "SELECT name FROM media WHERE product_id = ? ORDER BY media.order ASC",
          [product.product_id]
        );
        var arrayProd = {
          product_id: product.product_id,
          name: product.name,
          price: product.price,
          discount: product.discount,
          active: product.active,
          featured: product.featured,
          media: images,
        };
        t_product.push(arrayProd);
      });

      await res.json(t_product[0]);
    } else {
      await res.json("not found");
    }
  });

  /*  
    app.get('/media/:merchant/:file', function(req, res) {
        if (res.status(404)) {
            var path = require("path");
            res.status(200).sendFile(path.resolve(__dirname, '../', 'public/media/no-pic.jpg'));
        } else {
            return next()
        }

    });
    */

  app.get("*", function (req, res) {
    res.status(404).send("Erro 404");
  });
};
