!(function (r) {
  "use strict";

  function t() {
    (this.$body = r("body")),
      (this.$chatInput = r(".chat-input")),
      (this.$chatList = r(".conversation-list")),
      (this.$chatSendBtn = r(".chat-send")),
      (this.$chatForm = r("#chat-form"));
  }
  (t.prototype.save = function () {
    var t = this.$chatInput.val(),
      e = moment().format("h:mm");
    return "" == t
      ? (this.$chatInput.focus(), !1)
      : (r(
          '<li class="clearfix odd"><div class="chat-avatar"><img src="assets/images/users/avatar-7.jpg" alt="male"><i>' +
            e +
            '</i></div><div class="conversation-text"><div class="ctext-wrap"><i>Shreyu</i><p>' +
            t +
            "</p></div></div></li>"
        ).appendTo(".conversation-list"),
        this.$chatInput.focus(),
        this.$chatList.animate(
          {
            scrollTop: this.$chatList.prop("scrollHeight"),
          },
          1e3
        ),
        !0);
  }),
    (t.prototype.init = function () {
      var e = this;
      e.$chatInput.keypress(function (t) {
        if (13 == t.which) return e.save(), !1;
      }),
        e.$chatForm.on("submit", function (t) {
          return (
            t.preventDefault(),
            e.save(),
            e.$chatForm.removeClass("was-validated"),
            e.$chatInput.val(""),
            !1
          );
        });
    }),
    (r.ChatApp = new t()),
    (r.ChatApp.Constructor = t);
})(window.jQuery),
  (function (o) {
    "use strict";

    function t() {}
    (t.prototype.initCharts = function () {
      var t = {
        chart: {
          type: "area",
          height: 45,
          width: 90,
          sparkline: {
            enabled: !0,
          },
        },
        series: [
          {
            data: [25, 66, 41, 85, 63, 25, 44, 12, 36, 9, 54],
          },
        ],
        stroke: {
          width: 2,
          curve: "smooth",
        },
        markers: {
          size: 0,
        },
        colors: ["#727cf5"],
        tooltip: {
          fixed: {
            enabled: !(window.Apex = {
              chart: {
                parentHeightOffset: 0,
                toolbar: {
                  show: !1,
                },
              },
              grid: {
                padding: {
                  left: 0,
                  right: 0,
                },
              },
              colors: ["#5369f8", "#43d39e", "#f77e53", "#ffbe0b"],
              tooltip: {
                theme: "dark",
                x: {
                  show: !1,
                },
              },
            }),
          },
          x: {
            show: !1,
          },
          y: {
            title: {
              formatter: function (t) {
                return "";
              },
            },
          },
          marker: {
            show: !1,
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            type: "vertical",
            shadeIntensity: 1,
            inverseColors: !1,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [45, 100],
          },
        },
      };
      new ApexCharts(
        document.querySelector("#today-revenue-chart"),
        t
      ).render(),
        new ApexCharts(
          document.querySelector("#today-product-sold-chart"),
          o.extend({}, t, {
            colors: ["#f77e53"],
          })
        ).render(),
        new ApexCharts(
          document.querySelector("#today-new-customer-chart"),
          o.extend({}, t, {
            colors: ["#43d39e"],
          })
        ).render(),
        new ApexCharts(
          document.querySelector("#today-new-visitors-chart"),
          o.extend({}, t, {
            colors: ["#ffbe0b"],
          })
        ).render();
    }),
      (t.prototype.init = function () {
        o("#dash-daterange").flatpickr({
          mode: "range",
          defaultDate: [
            moment().startOf("month").format("YYYY-MM-DD"),
            moment().endOf("month").format("YYYY-MM-DD"),
          ],
          onClose: function (selectedDates, dateStr, instance) {
            dash(dateStr);
          },
          onReady: function (selectedDates, dateStr, instance) {
            //console.log(dateStr)
            //quando começar

            dash(dateStr);
          },
        }),
          o("#order-daterange").flatpickr({
            mode: "range",
            //defaultDate: [moment().startOf('month').format('YYYY-MM-DD'), moment().endOf('month').format('YYYY-MM-DD')],
            onClose: function (selectedDates, dateStr, instance) {
              order(dateStr);
            },
            onReady: function (selectedDates, dateStr, instance) {
              var date = `${moment()
                .startOf("month")
                .format("YYYY-MM-DD")} to ${moment()
                .endOf("month")
                .format("YYYY-MM-DD")}`;
              if (!dateStr) $("#order-daterange").val(date);

              order(dateStr ? dateStr : date);
            },
          }),
          o("#calendar-widget").flatpickr({
            inline: !0,
            shorthandCurrentMonth: !0,
          }),
          o.ChatApp.init(),
          this.initCharts();
      }),
      (o.Dashboard = new t()),
      (o.Dashboard.Constructor = t);
  })(window.jQuery),
  (function () {
    "use strict";
    window.jQuery.Dashboard.init();
  })();

$(".icon-select").on("click", function (event) {
  console.log("modal");

  tpl = ``;
  icons2.forEach(function (item) {
    if (item.indexOf("fas") > -1 || item.indexOf("fab") > -1) {
    } else {
      tpl += ` <button type="button" icon="${item}" class="btn btn-light icon-selected" style="font-size: 21px;margin-bottom: 3px;">
            <i class="${item}"></i></button>`;
    }
    // do something with `item`

    //  <i class="lni lni-cart"></i>
  });
  $(".icons-show").append(tpl);
  $("#myModal").modal("show");
});

$(function () {
  $("body").on("click", ".icon-selected", function () {
    var selected = $(this).attr("icon");
    //console.log(selected)

    $(".icon").val(selected);
    $(".icon-select").empty().html(`<i class="la-2x ${selected}"></i>`);
    $("#myModal").modal("hide");
  });
});

$(".id-category").on("change.bootstrapSwitch", function (e) {
  var id = $(this).attr("id-categorie");
  var status = e.target.checked == true ? 1 : 0;
  categoryUpdate(id, status);
});

function categoryUpdate(id, status) {
  $.ajax({
    url: "/loja/update/category-update",
    type: "POST",
    data: {
      id: id,
      status: status,
    },
    success: function (response) {
      console.log("update successful");
    },
    error: function () {
      alert("error");
    },
  });
}

function deleteseller(url) {
  var msj = "Deseja Apagar esse vendedor?";
  if (!confirm(msj)) {
    return false;
  } else {
    $.ajax({
      url: "/loja/seller/delete",
      type: "POST",
      data: {
        url: url,
      },
      success: function (response) {
        console.log("update successful");
        $(`#${url}`).remove();
      },
      error: function () {
        alert("error");
      },
    });
  }
}

function deleteclient(id) {
  var msj =
    "Deseja Apagar esse Cliente?\nEle sera deslogado do catalogo da proxima vez que usar.";
  if (!confirm(msj)) {
    return false;
  } else {
    $.ajax({
      url: "/loja/client/delete",
      type: "POST",
      data: {
        id: id,
      },
      success: function (response) {
        console.log("update successful");
        $(`#${id}`).remove();
      },
      error: function () {
        alert("error");
      },
    });
  }
}

function deleteBanner(name) {
  var msj = "Deseja Apagar esse Banner?";
  if (!confirm(msj)) {
    return false;
  } else {
    $.ajax({
      url: "/loja/banner/delete",
      type: "POST",
      data: {
        name: name,
      },
      success: function (response) {
        console.log("update successful");
        $(`[banner='${name}']`).remove();
      },
      error: function () {
        alert("error");
      },
    });
  }
}

function deleteStory(name) {
  var msj = "Deseja Apagar esse Story?";
  if (!confirm(msj)) {
    return false;
  } else {
    $.ajax({
      url: "/loja/story/delete",
      type: "POST",
      data: {
        name: name,
      },
      success: function (response) {
        console.log("update successful");
        $(`[story='${name}']`).remove();
      },
      error: function () {
        alert("error");
      },
    });
  }
}

function deleteVariations(id) {
  var msj =
    "Deseja Apagar essa Variação\nTodas os opções vinculadas a essa variação serão apagadas e os produtos não as exibirão.";
  if (!confirm(msj)) {
    return false;
  } else {
    $.ajax({
      url: "/loja/variations/delete",
      type: "POST",
      data: {
        id: id,
      },
      success: function (response) {
        console.log("update successful");
        window.location = `/loja/variations`;
        //  $(`#${id}`).remove()
      },
      error: function () {
        alert("error");
      },
    });
  }
}

function deleteTags(id) {
  var msj =
    "Deseja Apagar essa Variação\nEla não estará mais disponível para seleção mesmo em produtos já cadastrados.";
  if (!confirm(msj)) {
    return false;
  } else {
    $.ajax({
      url: "/loja/tag/delete",
      type: "POST",
      data: {
        id: id,
      },
      success: function (response) {
        console.log(response);
        window.location = `/loja/variations/${response.success}/tags`;

        console.log("update successful");
        //  $(`#${id}`).remove()
      },
      error: function () {
        alert("error");
      },
    });
  }
}

function saveStory(name) {
  console.log("salvar story");

  var url = $(`input[storyUrl='${name}']`).val();
  var button = $(`input[storyButton='${name}']`).val();
  //var storyButtonText = $(`input[storyButtonText='${name}']`).val()
  if (url) {
    var msj = "Todos os Clicks  serão redirecionados para " + url;
  } else {
    var msj = "Ao clicar no Story não será redirecionado.";
  }

  if (!confirm(msj)) {
    return false;
  } else {
    $.ajax({
      url: "/loja/story/update-url",
      type: "POST",
      data: {
        name: name,
        url: url,
        button: button,
      },
      success: function (response) {
        console.log("update successful");
      },
      error: function () {
        alert("error");
      },
    });
  }
}

function saveBanner(name) {
  var url = $(`input[bannerUrl='${name}']`).val();

  if (url) {
    var msj = "Todos os Clicks serão redirecionados para " + url;
  } else {
    var msj = "Ao clicar no banner não será redirecionado.";
  }

  if (!confirm(msj)) {
    return false;
  } else {
    $.ajax({
      url: "/loja/banner/update-url",
      type: "POST",
      data: {
        name: name,
        url: url,
      },
      success: function (response) {
        console.log("update successful");
      },
      error: function () {
        alert("error");
      },
    });
  }
}

function deleteproduct(id_product) {
  var msj = "Deseja Apagar esse Produtos e Todas as Suas imagens ?";
  if (!confirm(msj)) {
    return false;
  } else {
    $.ajax({
      url: "/loja/product/delete",
      type: "POST",
      data: {
        id_product: id_product,
      },
      success: function (response) {
        console.log("update successful");
        $(`#${id_product}`).remove();
      },
      error: function () {
        alert("error");
      },
    });
  }
}

function deletecategory(id_categorie) {
  var msj =
    "Deseja Apagar essa Categoria, todos os Produtos e Todas as Suas imagens ?";
  if (!confirm(msj)) {
    return false;
  } else {
    $.ajax({
      url: "/loja/categorie/delete",
      type: "POST",
      data: {
        id_categorie: id_categorie,
      },
      success: function (response) {
        console.log("update successful");
        $(`#${id_categorie}`).remove();
      },
      error: function () {
        alert("error");
      },
    });
  }
}

function kFormatter(num) {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + " mil"
    : Math.sign(num) * Math.abs(num);
}

function dash(dateStr) {
  /*  if (getParam('tour') == 'true') {
          console.log(getParam('tour'))


          $('.dashboard_info').empty().html(`<div class="col-md-6 col-xl-6 col-12 ">
          
          <p class="mb-2">✌️ Essa é nossa plataforma catalogo por whatsapp.
          Para aprender a usar você pode ver esse video.👇 <small>(3mim duração)</small></p>
          
          <video controls >
          <source src="/assets.admin/video/video2.mp4" type="video/mp4" />
          </video>
          <a href="/loja/dashboard" class="btn btn-success mb-3">😁 Eu aprendi! </a>
          <a href="/loja/dashboard" class="btn btn-danger mb-3">😟 Pular essa etapa. </a>
          
          </div>
          
         
          
          `)

          $('.sellers_info').remove()

      } else {*/

  $(".load")
    .empty()
    .append(`<img width="25" src="/assets.admin/images/load.gif">`);
  var range = dateStr.split(" ");

  $.ajax({
    url: "/loja/api/dashboard",
    type: "POST",
    data: {
      start: range[0],
      end: range[2] ? range[2] : range[0],
    },
    success: function (response) {
      $(".sum_orders").text("R$" + kFormatter(response.sum_orders));
      $(".total_orders").text(response.total_orders);
      $(".ticket").text(
        kFormatter(
          response.sum_orders / response.total_orders > 0
            ? (response.sum_orders / response.total_orders).toFixed(2)
            : 0
        )
      );
      $(".order_views").attr(
        "href",
        `/loja/orders?start=${range[0]}&end=${range[2] ? range[2] : range[0]}`
      );
    },
    error: function () {
      alert("error");
    },
  });

  // }
}

var months = [
  "",
  "Jan",
  "February",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dec",
];

var e = new Date(),
  r = {
    chart: {
      height: 296,
      type: "area",
    },
    dataLabels: {
      enabled: !1,
    },
    stroke: {
      curve: "smooth",
      width: 4,
    },
    series: [
      {
        name: "Pedidos",
        data: [0],
      },
      {
        name: "Pedidos2",
        data: [1000],
      },
    ],
    zoom: {
      enabled: !1,
    },
    legend: {
      show: !1,
    },
    colors: ["#43d39e"],
    xaxis: {
      categories: ["0"],
      tickAmount: 6,
    },
    yaxis: {
      labels: {
        formatter: function (t) {
          return kFormatter(t);
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 1,
        inverseColors: !1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [45, 100],
      },
    },
  };
var chart = new ApexCharts(document.querySelector("#revenue-chart"), r);
chart.render();

function order(dateStr) {
  $(".left-timeline")
    .empty()
    .append(`<img width="25" src="/assets.admin/images/load.gif">`);
  var range = dateStr.split(" ");

  $.ajax({
    url: "/loja/api/orders",
    type: "POST",
    data: {
      start: range[0],
      end: range[2] ? range[2] : range[0],
    },
    success: function (response) {
      var data = response.orders;
      var obj = {};
      for (var i = 0; i < data.length; i++) {
        var date = data[i].Date;
        // Get previous date saved inside the result
        var p_date = obj[date] || {};
        // Merge the previous date with the next date
        obj[date] = Object.assign(p_date, data[i]);
      }

      // Convert to an array
      var result = Object.values(obj);

      var transactions = [];

      var total = 0;

      var sellers = [];

      if (response.orders.length > 0) {
        var tpl_orders = "";

        $.each(response.orders, function (i, order) {
          var range = order.created.split("T");
          var date = new Date(order.created);

          tpl_orders += `<div class="row  border-bottom">
                    <div class="col-lg-4 mb-2 mb-lg-0 mt-3">
                    <span class="star-toggle uil uil-star text-warning"></span>
                      PED: <strong>#${
                        order.order_cod
                      }</strong> <span class="badge badge-soft-danger p-1">Recebido</span> ${
            order.read == 0
              ? '<span class="badge badge-soft-success p-1">NOVO</span>'
              : ""
          }
                    </div> <!-- end col -->
                    <div class="col-lg-12">
                        <div class="d-sm-flex justify-content-between">
                            <div>
                            <p class="text-muted ml-4">
                            Cliente: ${
                              order.name ? order.name : "(Não Informado)"
                            } <br>
                            ${order.whatsapp ? order.whatsapp + "<br>" : ""}
     
                            Vendedor : <strong>${order.seller_name}</strong><br>
            
                        
                        </p>
                            </div>
                            <div class="mt-3 mt-sm-0">
                                <ul class="list-inline font-13 text-sm-right">
                                    <li class="list-inline-item pr-1">
                                        <i class="uil uil-schedule font-16 mr-1"></i>
                                        ${date.getDate()}/ ${
            months[date.getMonth() + 1]
          }
                                    </li>
                                    <li class="list-inline-item pr-2">
                                        <i class="uil uil-card-atm font-16 mr-1"></i>
                                        <strong class="success" style="color:#43d39e">+<rs>R$</rs>${
                                          order.total
                                        }</strong>
                                    </li>
                                   
                                </ul>
                            </div>
                            <div class="mt-3 mb-4 mt-sm-0">
                            <a href="/loja/order/${
                              order.order_cod
                            }" class="btn btn-block btn-primary btn-sm">Ver Datalhes</a>
                            </div>
                        </div> <!-- end .d-flex-->
                    </div> <!-- end col -->
                </div>`;

          /*
                        tpl_orders += `
                    <li class="event-list">
                        <div>
                            <div class="media">
                                <div class="event-date text-center mr-4">
                                    <div class=" avatar-sm rounded-circle bg-soft-primary">
                                        <span class="font-size-16 avatar-title text-primary font-weight-semibold">
                        ${date.getDate()}
                    </span>
                                    </div>
                                    <p class="mt-2">
                                        ${months[(date.getMonth() + 1)]}
                                    </p>
                                </div>
                                <div class="media-body">
                                    <div class="card">
                                        <div class="card-body">
                                            <h5 class="mt-0">

                                                Às
                                                ${date.getHours()}:${((date.getMinutes() < 10) ? '0' + date.getMinutes(): date.getMinutes())}
                                            </h5>

                                            <p class="text-muted">
                                                Codigo:
                                                <strong>#${order.order_cod}</strong><br> Vendedor :
                                                <strong>${order.seller_name}</strong><br>
                                                <strong class="success">+<rs>R$</rs>${order.total}</strong>
                                            
                                            </p>
                                            <div>
                                                <a href="/loja/order/${order.order_cod}" class="btn btn-primary btn-sm">Ver Datalhes</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>`*/

          total += parseFloat(order.total);
          transactions.push({
            date: range[0],
            price: order.total,
          });
        });

        $(".order-list").empty().append(tpl_orders);
        $(".total").html(`Total: <span class="rs">R$</span>${total.toFixed()}`);

        var sumedUpDates = [];
        var prices = [];

        function isDateSumedUp(date) {
          return sumedUpDates.indexOf(date) !== -1;
        }

        function sumUpDate(date) {
          var sum = 0;

          transactions.forEach((t) => {
            if (t.date === date) {
              sum += parseInt(t.price);
            }
          });

          sumedUpDates.push(date);
          prices.push(sum);
        }

        transactions.forEach((t) => {
          if (!isDateSumedUp(t.date)) {
            sumUpDate(t.date);
          }
        });

        var obj = {};

        sumedUpDates.forEach((d, i) => (obj[d] = prices[i]));

        chart.updateOptions({
          xaxis: {
            categories: sumedUpDates.reverse(),
          },
        });
        chart.updateSeries([
          {
            data: prices.reverse(),
          },
        ]);

        /* chart.updateOptions({
                     colors: ["#F3B415", "#F27036", "#663F59", "#6A6E94", "#4E88B4", "#00A7C6", "#18D8D8", '#A9D794',
                         '#46AF78', '#A93F55', '#8C5E58', '#2176FF', '#33A1FD', '#7A918D', '#BAFF29'
                     ],
                     series: [{
                             name: "Series1",
                             data: [51, 42, 109, 38, 47]
                         },
                         {
                             name: "Series2",
                             data: [56, 90, 12, 32, 44]
                         },
                         {
                             name: "Series3",
                             data: [22, 43, 21, 100, 56]
                         }
                     ],
                     xaxis: {
                         categories: ["A", "B", "C"]
                     }
                 });*/
      } else {
        console.log("Não existem peididos no periodo");
        $(".left-timeline").empty().text("Não há resultados");

        chart.updateOptions({
          xaxis: {
            categories: ["sem-dados"],
          },
        });
        chart.updateSeries([
          {
            data: [0],
          },
        ]);
      }
    },
    error: function () {
      alert("error");
    },
  });
}

function getParam(param) {
  var url = new URL(window.location.href),
    c = url.searchParams.get(param);
  return c;
}

$(".id-product").on("change.bootstrapSwitch", function (e) {
  var id = $(this).attr("id-product");
  var action = $(this).attr("action");
  var status = e.target.checked == true ? 1 : 0;
  productUpdate(id, status, action);
});

/*
$('input#12.custom-control-input.activeVariation').on('change.bootstrapSwitch', function(e) {
  
});*/

function productUpdate(id, status, action) {
  $.ajax({
    url: "/loja/update/product-update",
    type: "POST",
    data: {
      id: id,
      status: status,
      action: action,
    },
    success: function (response) {
      console.log("update successful");
    },
    error: function () {
      alert("error");
    },
  });
}

/*

// DropZone
Dropzone.options.dropzone = {
    paramName: "files", // The name that will be used to transfer the file
    maxFilesize: 10, // MB
    //uploadMultiple: true,
    autoProcessQueue: false,
    accept: function(file, done) {
        if (file.name == "justinbieber.jpg") {
            done("Naha, you don't.");
        } else { done(); }
    }
};*/

function UpdateOrder(product_id) {
  console.log("init");
  var order = [];
  $("span[data-dz-name]").each(function (i, obj) {
    var file = $(this).text();
    order.push({
      file,
      i,
    });
  });

  console.log(order);
  $.ajax({
    url: "/loja/product/update-order",
    type: "POST",
    data: {
      product_id: product_id,
      order: order,
    },
  });
}

function UpdateOrderStories() {
  console.log("init");
  var order = [];
  $("video").each(function (i, obj) {
    var file = $(this).attr("id");
    order.push({
      file,
      i,
    });
  });

  //console.log(order)
  $.ajax({
    url: "/loja/stories/update-order",
    type: "POST",
    data: {
      order: order,
    },
  });
}

function UpdateOrderBanners() {
  console.log("init");
  var order = [];
  $(".card").each(function (i, obj) {
    var file = $(this).attr("cnt");
    if (file) {
      order.push({
        file,
        i,
      });
    }
  });

  //console.log(order)
  $.ajax({
    url: "/loja/banner/update-order",
    type: "POST",
    data: {
      order: order,
    },
  });
}

var url = window.location.href;
var activeTab = url.substring(url.indexOf("#") + 1);
if (activeTab) {
  $('a[href="#' + activeTab + '"]').tab("show");
}

$(".cr-slider").attr({
  min: 0.0,
});

Dropzone.options.mydropzone = {
  //url does not has to be written
  //if we have wrote action in the form
  //tag but i have mentioned here just for convenience sake
  url: "/loja/upload",
  /*transformFile: function(file, done) {

        var myDropZone = this;

        // Create the image editor overlay
        var editor = document.createElement('div');
        editor.style.position = 'fixed';
        editor.style.left = 0;
        editor.style.right = 0;
        editor.style.top = 0;
        editor.style.bottom = 0;
        editor.style.zIndex = 9999;
        editor.style.backgroundColor = '#fff';
        document.body.appendChild(editor);

        // Create the confirm button
        var confirm = document.createElement('button');
        confirm.style.position = 'fixed';
        confirm.style.left = '10vw';
        confirm.style.width = '80vw';
        confirm.style.bottom = '20px';
        confirm.style.zIndex = 9999;
        confirm.textContent = 'Concluir';
        confirm.className = "form-control btn btn-success "
        confirm.addEventListener('click', function() {

            // Get the output file data from Croppie
            croppie.result({
                type: 'blob',
                quality: 1,
                size: {
                    width: 1024,
                    height: 1126
                }
            }).then(function(blob) {

                // Update the image thumbnail with the new image data
                myDropZone.createThumbnail(
                    blob,
                    myDropZone.options.thumbnailWidth,
                    myDropZone.options.thumbnailHeight,
                    myDropZone.options.thumbnailMethod,
                    false,
                    function(dataURL) {

                        // Update the Dropzone file thumbnail
                        myDropZone.emit('thumbnail', file, dataURL);

                        // Return modified file to dropzone
                        done(blob);
                    }
                );

            });

            // Remove the editor from view
            editor.parentNode.removeChild(editor);

        });
        editor.appendChild(confirm);

        var size = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        width = size - (size / 5)
        height = size - (size / 10)

        // Create the croppie editor
        var croppie = new Croppie(editor, {
            //enableResize: true,
            type: 'square',
            showZoomer: true,
            viewport: {
                width: ((width < 400) ? width : 400),
                height: ((height < 440) ? height : 440)
            },
            boundary: {
                width: '100vw',
                height: '80vh'
            },

            enableOrientation: true
        });

        // Load the image to Croppie

        croppie.bind({
            url: URL.createObjectURL(file)
        });

    },*/
  clickable: true,
  parallelUploads: 1,
  acceptedFiles: "image/*",
  uploadMultiple: false,
  addRemoveLinks: true,
  dictRemoveFile: "Apagar",
  autoProcessQueue: true, // this is important as you dont want form to be submitted unless you have clicked the submit button
  autoDiscover: false,
  // previewsContainer: '#previewDiv', // we specify on which div id we must show the files
  accept: function (file, done) {
    console.log("uploaded");
    done();
  },
  error: function (file, msg) {
    alert(msg);
  },
  /*
        removedfile: function(file) {
    console.log(this)

    //this.removeFile(file);
            //this.removeFile(file);
            /*x = confirm('Do you want to delete?');
            if(!x)  return false;
            var name = ((file.previewElement.id) ? file.previewElement.id : file.name);
                    $.ajax({
                        url: "/loja/media/delete",
                        type: "POST",
                        data: { 'name': name }
                    });

                   
                   
           
         },*/

  init: function () {
    var myDropzone = this;

    $.ajax({
      url: "/loja/media",
      type: "POST",
      data: {
        product_id: jQuery("#product_id").val(),
      },
      success: function (images) {
        $.each(images.image, function (i, image) {
          var mockFile = {
            name: image.name,
            size: 12345,
          };
          // Call the default addedfile event handler
          myDropzone.emit("addedfile", mockFile);
          myDropzone.emit(
            "thumbnail",
            mockFile,
            "/media/" + jQuery("#store_folder").val() + "/" + image.name
          );
          myDropzone.emit("complete", mockFile);
          myDropzone.files.push(mockFile);
        });
      },
      error: function () {
        alert("error");
      },
    });

    this.on("sending", function (data, xhr, formData) {
      //  console.log(data)
      formData.append("product_id", jQuery("#product_id").val());
      formData.append("count", $("span[data-dz-name]").length);
    });

    this.on("success", function (file, response) {
      //    console.log(response) //nome da nova file
      file.previewElement.id = response;

      // console.log(response, file)
    });

    this.on("removedfile", function (file) {
      //                alert(file.name);

      var name = file.previewElement.id ? file.previewElement.id : file.name;
      $.ajax({
        url: "/loja/media/delete",
        type: "POST",
        data: {
          name: name,
        },
      });

      /* console.log(file)
                 var name = ((file.previewElement.id) ? file.previewElement.id : file.name);


                 $.ajax({
                     url: "/loja/media/delete",
                     type: "POST",
                     data: { 'name': name }
                 });*/

      //var _ref;
      // return ((_ref = file.previewElement) != null ? _ref.parentNode.removeChild(file.previewElement) : void 0);
    });
    //now we will submit the form when the button is clicked
    $("#send").on("click", function (e) {
      e.preventDefault();
      myDropzone.processQueue(); // this will submit your form to the specified action path
      // after this, your whole form will get submitted with all the inputs + your files and the php code will remain as usual
      //REMEMBER you DON'T have to call ajax or anything by yourself, dropzone will take care of that
    });
  }, // init end
};

function tmpStories(file) {
  var file = JSON.parse(file);

  var template = `
    <div class="col-6 col-xl-6 col-md-4 col-sm-6 " story="${file.name}">
   <div class="card" cnt="${file.name}">
      <div class="card-body" >
         <div class="badge badge-danger move" style="top:-10px; left:-10px">
            <img src="/assets.admin/images/move.svg" >
         </div>
         <div class="badge badge-danger" onclick="deleteStory('${
           file.name
         }')" style="position: absolute;right: -5px;top: -5px;">APAGAR
         </div>
         <div class="card-body" style="background: #000;padding: 0;border-radius: 5px;">
            <div class="media">
               <div class="media-body" style="text-align: center;" >
               <video id="${
                 file.name
               }" width="100%" height="120px" controls="controls" style="max-height: 100%; min-height:230px;">
               <source src="/media/${jQuery("#store_folder").val()}/stories/${
    file.name
  }" type="video/mp4" />
               <!--Suportado em IE9, Chrome 6 e Safari 5 -->
               O seu navegador não suporta a tag vídeo
               </video> 
               </div>
            </div>
         </div>

         <div class="col">
         <a class="text-dark collapsed" data-toggle="collapse" href="#a${
           file.name.split(".")[0]
         }" aria-expanded="false" aria-controls="a${file.name.split(".")[0]}">
             <h6 class="mb-0"><i class="uil uil-angle-down font-size-18"></i>OPÇOES</h6>
         </a>

         <div class="collapse" id="a${file.name.split(".")[0]}">
             <div class="card mb-0 shadow-none">

             <div  class="mt-2 comment-area-box">
                                                            
             <div class="form-group mt-1">
             <input storyButton="${
               file.name
             }" type="text" class="form-control" id="simpleinput" name="" value="${
    file.button
  }" placeholder="Texto do Botão. Ex: Veja esse Produto">
          </div>
          <input storyUrl="${
            file.name
          }" type="text" class="form-control" id="simpleinput" name="" value="${
    file.url
  }" placeholder="Link ex: https://google.com.br">
        

                                                            <div class="mt-2" >
                                                                <div class="float-right">
                                                                    <button type="submit" class="btn btn-sm btn-success" onclick="saveStory('${
                                                                      file.name
                                                                    }')"><i class="uil uil-message mr-1" ></i>Salvar</button>
                                                                </div>
                                                                <div>
                                                              
                                                                </div>
                                                            </div>
                                                        </div>

         </div>
         </div>
         </div>

      </div>
   </div>
</div>
</div>`;
  /*

            var template = `<div class="col-6 col-xl-3 col-md-4 col-sm-4">
            <div class="card" id="${file}">
                <div class="card-body" style="background: #000;padding: 0;    border-radius: 5px;">
                    <div class="media">
                        <div class="media-body" style="text-align: center;">
                        <video id="${file}" width="100%" controls="controls" style="max-height: 100%; min-height:280px;">
                        <source src="/media/${jQuery("#store_folder").val()}/stories/${file}" type="video/mp4" />
                        <!--Suportado em IE9, Chrome 6 e Safari 5 -->
                        O seu navegador não suporta a tag vídeo
                        </video> 
                   </div>
                        
                            <a href="/loja/categories/7VxlFCdngx/product/create" class="btn btn-danger btn-sm btn-block mr-1">Excluir</a>
                            </div>
                    </div>
                </div>
            </div>
        </div>`
        */
  return template;
}

Dropzone.options.mydropzoneVideos = {
  url: "/loja/StoriesUpload",
  clickable: true,
  parallelUploads: 1,
  maxFiles: 1,
  timeout: 180000000,
  acceptedFiles: "video/*",
  uploadMultiple: false,
  addRemoveLinks: true,
  autoProcessQueue: true, // this is important as you dont want form to be submitted unless you have clicked the submit button
  autoDiscover: false,
  previewsContainer: "#template-preview",
  //previewsContainer: '#template-preview', // we specify on which div id we must show the files
  accept: function (file, done) {
    console.log("uploaded", file);
    done();
  },
  error: function (file, msg) {
    alert(msg);
  },
  init: function () {
    var myDropzoneVideo = this;
    $.ajax({
      url: "/loja/StoriesMedia",
      type: "POST",
      data: {
        product_id: jQuery("#product_id").val(),
      },
      success: function (images) {
        $.each(images.image, function (i, image) {
          var mockFile = {
            name: image.name,
            size: 12345,
          };

          $(".stories").append(tmpStories(JSON.stringify(image)));
        });
      },
      error: function () {
        alert("error");
      },
    });

    this.on("addedfile", function (file) {
      while (this.files.length > this.options.maxFiles) {
        this.removeFile(this.files[0]);
      }

      console.log(file);

      $(".dz-file-preview").remove();
      var tpl = `<div class="" id="${file.upload.uuid}">
                <span class="filename_upload"></span> - Enviando ... <span class="percentage_complete"></span>
                <div class="progress ml-4 mr-4" style="height: 28px;border-radius: 48px;">
                    <div class="progress-bar" role="progressbar" style="width: 50%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>`;
      $(".dz-message").append(tpl);
      $(".filename_upload").text(`${file.name}`);
    });

    this.on("uploadprogress", function (progress) {
      console.log(progress);
      var percet = progress.upload.progress.toFixed(2);

      $(".progress-bar")
        .css("width", percet + "%")
        .attr("aria-valuenow", percet);
      $(".percentage_complete").text(`${percet}%`);
      //$('.percentage_complete').text(`${percet}%`);
      //progress.upload.filename
    });

    this.on("sending", function (data, xhr, formData) {
      //  console.log(data)
      formData.append("count", $("video").length);
    });
    this.on("success", function (file, response) {
      console.log(file, response);
      $(`#${file.upload.uuid}`).remove();
      // obj = JSON.parse(response);
      file.previewElement.id = response;
      console.log(response, file);
      $(".stories").append(
        tmpStories(
          JSON.stringify({
            name: response,
          })
        )
      );
    });

    //now we will submit the form when the button is clicked
    $("#send").on("click", function (e) {
      e.preventDefault();
      myDropzoneVideo.processQueue(); // this will submit your form to the specified action path
      // after this, your whole form will get submitted with all the inputs + your files and the php code will remain as usual
      //REMEMBER you DON'T have to call ajax or anything by yourself, dropzone will take care of that
    });
  }, // init end
};

function tmpBanners(name, redirect) {
  var template = `
    <div class="col-12 col-xl-6 col-md-6 col-sm-6 " banner="${name}">
   <div class="card" cnt="${name}">
      <div class="card-body">
         <div class="badge badge-danger move">
            <img src="/assets.admin/images/move.svg">
         </div>
         <div class="badge badge-danger" onclick="deleteBanner('${name}')" style="position: absolute;right: 10px;top: 10px;">APAGAR
         </div>
         <div class="card-body" style="background: #000;padding: 0;border-radius: 5px;">
            <div class="media">
               <div class="media-body" style="text-align: center;" >
                  <img class="banner-img" width="100%" src="/media/${jQuery(
                    "#store_folder"
                  ).val()}/banners/${name}"></img>
               </div>
            </div>
         </div>
         <div class="row mt-2">
            <div class="col-xl-8 col-sm-8">
               <div class="form-group">
                  <input bannerUrl="${name}" type="text" class="form-control" id="simpleinput" name="address" value="${redirect}" placeholder="Url: EX: https://google.com.br">
               </div>
            </div>
            <div class="col-xl-4 col-sm-4 ">
               <button type="submit" id="send" class="form-control btn btn-success " onclick="saveBanner('${name}')">Salvar</button>
            </div>
         </div>
      </div>
   </div>
</div>
</div>`;
  return template;
}

Dropzone.options.mydropzoneBanners = {
  url: "/loja/BannersUpload",
  clickable: true,
  parallelUploads: 1,
  acceptedFiles: "image/*",
  uploadMultiple: false,
  addRemoveLinks: false,
  autoProcessQueue: true, // this is important as you dont want form to be submitted unless you have clicked the submit button
  autoDiscover: false,
  previewsContainer: "#template-preview",
  //previewsContainer: '#template-preview', // we specify on which div id we must show the files
  accept: function (file, done) {
    console.log("uploaded", file);
    done();
  },
  error: function (file, msg) {
    alert(msg);
  },
  init: function () {
    var myDropzoneBanners = this;
    $.ajax({
      url: "/loja/BannersMedia",
      type: "POST",
      data: {
        // "product_id": jQuery("#product_id").val()
      },
      success: function (images) {
        console.log(images);
        $.each(images.image, function (i, image) {
          /* var mockFile = {
                                name: image.name,
                                size: 12345
                            };
                           */
          $(".banners").append(tmpBanners(image.name, image.redirect));
        });
      },
      error: function () {
        alert("error");
      },
    });

    this.on("addedfile", function (origFile) {
      $(".dz-file-preview").remove();
    });
    this.on("sending", function (data, xhr, formData) {
      //  console.log(data)
      formData.append("count", $(".banner-img").length);
    });
    this.on("success", function (file, response) {
      // obj = JSON.parse(response);
      file.previewElement.id = response;
      console.log(response, file);
      $(".banners").append(tmpBanners(`${response}`, ""));
    });
    this.on("removedfile", function (file) {
      //                alert(file.name);
      console.log(file);
      var name = file.previewElement.id ? file.previewElement.id : file.name;
      $.ajax({
        url: "/loja/media/delete",
        type: "POST",
        data: {
          name: name,
        },
      });
    });
    //now we will submit the form when the button is clicked
    $("#send").on("click", function (e) {
      e.preventDefault();
      myDropzoneBanners.processQueue(); // this will submit your form to the specified action path
      // after this, your whole form will get submitted with all the inputs + your files and the php code will remain as usual
      //REMEMBER you DON'T have to call ajax or anything by yourself, dropzone will take care of that
    });
  }, // init end
};

function p(n) {
  var x = n.value.replace(/\D/g, "").match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
  g = !x[2] ? x[1] : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
  n.value = g;
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $("#blah").attr("src", e.target.result);
    };

    reader.readAsDataURL(input.files[0]); // convert to base64 string
  }
}

$("#imgInp").change(function () {
  readURL(this);
});
window.addEventListener("load", function () {
  //$('#phone').addEventListener('input', function(e) {
  //});
});

function k(i) {
  var v = i.value.replace(/\D/g, "");
  v = (v / 100).toFixed(2) + "";
  v = v.replace(",", ".");
  v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
  v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
  i.value = v;
}

function copyToClipboard(text) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(text).select();
  document.execCommand("copy");
  $temp.remove();
}

function get(name) {
  if (typeof Storage !== "undefined") {
    return localStorage.getItem(name);
  } else {
    alert("Please use a modern browser as this site needs localstroage!");
  }
}

function store(name, val) {
  if (typeof Storage !== "undefined") {
    localStorage.setItem(name, val);
  } else {
    alert("Please use a modern browser as this site needs localstroage!");
  }
}

function remove(name) {
  if (typeof Storage !== "undefined") {
    localStorage.removeItem(name);
  } else {
    alert("Please use a modern browser as this site needs localstroage!");
  }
}

function addSubVariation() {
  if (!get("variations-temp")) {
    var data = [];
  } else {
    var data = JSON.parse(get("variations-temp"));
  }
  console.log(data);

  console.log(data.findIndex((obj) => obj.variations.varid == "jnr"));
  JSON.parse(get("variations-temp")).findIndex((obj) => {
    console.log(obj.id["RMABS"]);
  });
}

function makeid(length) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVXZabcdefghijklmnopqrstuvxz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

$(".addvariations").on("click", function (event) {
  $("#variation").modal("show");
  store("temp-variation-name", $(".name").val());
  $(".name").val(get("temp-variation-name"));
});

$(".variations_done").on("click", function (event) {
  store("temp-variation-name", $(".name").val());
  variationCheck();
  $("#variation").modal("hide");
});

$(".subvariations_done").on("click", function (event) {
  store("temp-variation-name", $(".name").val());
  subVariationsCheck();
  $("#subvariation").modal("hide");
  NewTemplateVariations(JSON.parse(get("variations-temp")));
});

//subVariationsCheck

function variationCheck() {
  if (!get("variations-temp")) {
    data = [];
  } else {
    data = JSON.parse(get("variations-temp"));
  }

  $(".variation").each(function (index, itemData) {
    if ($(this).find(".name").val() && $(this).find(".variation").val()) {
      var variations = [];
      var id = makeid(5);
      var vari = $(this).find(".variation").val().split(",");

      for (
        var i = 0;
        i < $(this).find(".variation").val().split(",").length;
        i++
      ) {
        arr = {
          varid: id + "-" + makeid(3),
          variation: vari[i],
          subvariation: false,
          active: true,
        };
        //{ "description": "COR", "val": ["123 -preto", "457 -branco"] }
        variations.push(arr);
      }

      data.push({
        id: id,
        name: $(this).find(".name").val(),
        variations,
      });
    }

    store("variations-temp", JSON.stringify(data));
    $('[name="variations_data"]').val(JSON.stringify(data));
    NewTemplateVariations(JSON.parse(get("variations-temp")));
    //render display variations
  });
}

$("#myModal").on("hidden.bs.modal", function () {
  // do something…
});

function NewTemplateVariations(variations) {
  var variation_tpl = ``;
  var total = 0;

  $.each(variations, function (i, variation) {
    var variation_add = ``;
    total++;
    if (variation.variations) {
      $.each(variation.variations, function (i2, variations_added) {
        // console.log(variations_added)
        //subvariation
        var sub_variation_add = ``;
        //  console.log(variations_added.subvariation)
        if (variations_added.subvariation) {
          sub_variation_add += ` <span class="badge badge-primary">Sub-Variação - ${variations_added.subvariation.description}</span>`;
        }

        $.each(variations_added.subvariation.value, function (i3, subvar) {
          //  console.log(subvar)
          sub_variation_add += `
                    <span class="badge badge-soft-info p-1">${subvar}</span>`;
        });

        /*variation_add += `<div class="custom-control custom-switch mb-2">
                                <input type="checkbox" class="custom-control-input activeVariation" id="${variations_added.variation}" name="${variations_added.variation}" checked>`
                                <label class="custom-control-label" for="${variations_added.variation}">
                                </label>
                                   </div>`
                                */

        variation_add += `
                                <span class="badge badge-soft-danger p-1 mt-1">
                                ${variations_added.variation}</span>
                                ${
                                  sub_variation_add
                                    ? `${sub_variation_add}<br>`
                                    : ""
                                }             
                                `;
      });
    }

    variation_tpl += ` <!-- task -->
        <div class="row justify-content-sm-between border-bottom">
       
            <div class="col-12 mb-1 mb-lg-0">
            <div class="">
            <div class="dropdown float-right">
                   <a href="#" class="dropdown-toggle text-muted arrow-none" data-toggle="dropdown" aria-expanded="false" draggable="false">
                   <i class="uil uil-ellipsis-v font-size-14"></i>
                   </a>
                   <div class="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(16px, 19px, 0px);">
                     <a href="javascript:void(0);" class="dropdown-item subvariation" varid="${variation.id}" onclick="newSubBariation(this)" draggable="false">
                     <i class="uil uil-edit-alt mr-2 " ></i> Editar Sub-Variação</a>
                      <div class="dropdown-divider"></div>
                       <a href="javascript:void(0);" class="dropdown-item text-danger"  varid="${variation.id}"  onclick="deletevariation(this)" draggable="false"><i class="uil uil-trash mr-2"></i>Apagar</a>
                      </div>
                     </div>
                     <h5 class="mt-2 mb-0 font-size-16">
                     
                     <span class="badge badge-soft-dark  p-1">Variação: ${variation.name}</span>
                     </h5>
            </div>
            
            <div class="col-12">
                <div class="d-sm-flex justify-content-between">
                    <div class="mt-0 mt-sm-0">
                        <ul class="list-inline font-13 text-sm-left"> ${variation_add}</ul>
                    </div>
                </div>
                
            </div>
            </div>
        </div>`;
  });

  $(".variations_qnt").text(`(${total})`);
  $(".created-variations")
    .empty()
    .append(variation_tpl ? variation_tpl : "Produto sem variações.");

  var data = JSON.parse(get("variations-temp"));
  $('[name="variations_data"]').val(
    JSON.stringify(data) != null ? JSON.stringify(data) : "false"
  );
}

function deletevariation(el) {
  var varid = $(el).attr("varid");
  console.log(varid);

  if (!get("variations-temp")) {
    var data = [];
  } else {
    var data = JSON.parse(get("variations-temp"));
  }

  var finditem = data.findIndex((obj) => obj.id == varid);
  console.log(data[finditem].variations[0].subvariation.description);
  data.splice(finditem, 1);
  console.log(data);
  store("variations-temp", JSON.stringify(data));
  NewTemplateVariations(JSON.parse(get("variations-temp")));
}

//NewTemplateVariations(JSON.parse(get('variations-temp')))

function newSubBariation(el) {
  var varid = $(el).attr("varid");

  if (!get("variations-temp")) {
    var data = [];
  } else {
    var data = JSON.parse(get("variations-temp"));
  }

  var finditem = data.findIndex((obj) => obj.id == varid);
  var itemTitle = data[finditem].variations[0].subvariation.description;

  var subvar_tpl = `<div class="row " style="border-bottom: 1px solid #f6f6f7 !important;margin-bottom: 11px;">
    <div class="col-12 col-md-5" >
        <div class="form-group">
            <label for="simpleinput">Sub-Variação</label>
            <input type="text" class="form-control subvariationtitle" value="${
              itemTitle != undefined ? itemTitle : ""
            }" placeholder="Ex: Cor" required>

        </div>
    </div>
    </div>`;

  $.each(data[finditem].variations, function (x, item) {
    console.log(item);
    subvar_tpl += `    
        <div class="row subvariations" variationid="${finditem}" varid="${
      item.varid
    }" style="border-bottom: 1px solid #f6f6f7 !important;margin-bottom: 11px;">
        <div class="col-12 col-md-5" >
            <div class="form-group">
                <label for="simpleinput">Conteudo - ${
                  item.variation
                }  <small>(Separado por virgula)</small></label>
                <input type="text" class="form-control name" value="${
                  data[finditem].variations[x].subvariation.value != undefined
                    ? data[finditem].variations[x].subvariation.value
                    : ""
                }" placeholder="Ex: Azul, Preto, Rosa">
            </div>
        </div>
    </div>`;
  });

  $(".subvarbody")
    .empty()
    .append(subvar_tpl ? subvar_tpl : "Ainda não há produtos");
  $("#subvariation").modal("show");
}

$(".subvariation").on("click", function (event) {});

function subVariationsCheck() {
  var arr = [];
  var title = $(".subvariationtitle").val();
  if (!get("variations-temp")) {
    data = [];
  } else {
    data = JSON.parse(get("variations-temp"));
  }

  $(".subvariations").each(function (index, itemData) {
    var value =
      $(this).find(".name").val().split(",") != ""
        ? $(this).find(".name").val().split(",")
        : false;
    var varid = $(this).attr("varid");
    var variationid = $(this).attr("variationid");
    console.log(variationid, varid, value);
    var id = data[variationid].variations.findIndex(
      (obj) => obj.varid == varid
    );
    //  console.log(id)
    // if (title) {
    data[variationid].variations[id].subvariation = {
      description: title,
      value: value,
    };
    store("variations-temp", JSON.stringify(data));
    // }else{
    //alert('Não foi adicionado pois não há titulo da sub variação')
    // return false
    // }
  });

  $('[name="variations_data"]').val(JSON.stringify(data));
}
