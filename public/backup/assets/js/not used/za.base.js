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

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVXZabcdefghijklmnopqrstuvxz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

var imgPreload = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'


document.addEventListener("DOMContentLoaded", function() {
    yall({
        observeChanges: true
    });
});



$(".try-filter").click(function() {
    $("body,html").animate({
            scrollTop: $(".search").offset().top - 60
        },
        800 //speed
    );
});

function isVisible(elem) {

    /* let coords = elem.getBoundingClientRect();

     let windowHeight = document.documentElement.clientHeight;

     // top elem edge is visible OR bottom elem edge is visible
     let topVisible = coords.top > 0 && coords.top < windowHeight;
     let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

     return topVisible || bottomVisible;*/
}

function showVisible() {
    /*for (let img of document.querySelectorAll('img')) {
        let realSrc = img.dataset.src;
        if (!realSrc) continue;

        if (isVisible(img)) {
            img.src = realSrc;
            img.dataset.src = '';
        }
    }*/

}



if ($('#value_filter').length > 0) {
    console.log('existe')


    var url = new URL(window.location.href);
    var price2 = url.searchParams.get("price");
    if (price2)
        $(`#value_filter`).val(`${price2}`)


}

function off(price, discount) {

    //The percentage decrease from 40 to 30 is:
    //(40-30)/40 * 100 = 25%. 
    var total = discount / price * 100
    total = Math.round(total * 100) / 100
    return `${total}%`

}





$('#value_filter').on('change', function(e) {
    var optionSelected = $("option:selected", this);
    var valueSelected = this.value;

    var url = new URL(window.location.href);
    var por = url.searchParams.get("por");
    var categories = url.searchParams.get("categories");


    var currentLocation = window.location.href;

    window.location.href = window.location.origin + window.location.pathname + `${((por) ? '?por=' + por : '?por=')}${((valueSelected) ? '&price=' + valueSelected : '')}${((categories) ? '&categories=' + categories : '')}`


});


window.addEventListener('unload', function(event) {
    $('input:checked').removeAttr('checked');
}, false);


/*
window.addEventListener('scroll', showVisible);

$(document).ready(function() {

    showVisible()

});*/


if (!get(`cart-${data.store.cod}`)) {
    store(`cart-${data.store.cod}`, JSON.stringify({
        customer: {},
        order: {},
        cart: {
            itens: []
        },
        time: {
            start: new Date()
        },
    }))
}




function copyToClipboard(text) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(text).select();
    document.execCommand("copy");
    $temp.remove();

    $('.copy').show()
}


function respOrderRecive(order_cod, status) {

    $.ajax({
        url: "/status/whatsapp",
        type: "POST",
        data: {
            "order_cod": order_cod,
            "status": status
        },
        success: function(response) {
            // console.log('update successful', response)
            if (response.status == "ok") {
                // fbq('track', 'SendSuccessToWhatsapp');
                window.location.href = `/${data.store.cod}`;

            } else {
                console.log('erro')
                window.location.href = `/${data.store.cod}/order/${order_cod}`;
            }

            remove('last-order')


            var cartData = JSON.parse(get(`cart-${data.store.cod}`))
            var client = cartData.customer.name,
                whatsapp = cartData.customer.whatsapp

            console.log(client, whatsapp)

            remove(`cart-${data.store.cod}`)

            store(`cart-${data.store.cod}`, JSON.stringify({
                customer: {
                    'name': client,
                    'whatsapp': whatsapp
                },
                order: {},
                cart: {
                    itens: []
                },
                time: {
                    start: new Date()
                },
            }))

        },
        error: function() {
            alert("error");
        }
    });


}



function price(num) {
    return Math.round(num * 100) / 100
}



function InitCart() {


    if ($('.cart-table')) {
        cartData = JSON.parse(get(`cart-${data.store.cod}`))
        var cart_item_template = ``
        var variation_details = ``
        var total = 0
        var totalItens = 0

        if (cartData.customer.name) {
            $('.header-order').text(`${cartData.customer.name}, seu Pedido 👇`)
        }

        $.each(cartData.cart.itens, function(i, item) {

                    if (item.variation) {
                        $.each(item.variation, function(i2, variation) {
                            variation_details += `<span class="badge badge-success mr-1">${variation.variation} - ${variation.choice}</span>`
                        })
                    }

                    //${((product.media.length > 0) ? `/media/${data.store.folder}/${product.media[0].name}
                    cart_item_template += `<tr class="item-cart-${i}">
                <td width="10%">
                <a onclick="removeItem('${i}')" style="position: absolute; margin: -15px 0px 0px -15px;" class="remove-product" href="#"><i class="las la-trash-alt" style="font-size: 24px;"></i></a>
                <img src="${item.pic}" alt></td>
                <td>
                <a style="font-size: 1.3em;" href="/${data.store.cod}/product/${item.id}">${item.name}</a>
                ${((variation_details) ? `${variation_details}` : '')}
               
                <div class="cart-form mt-2">
                <div class="order-plus-minus d-flex align-items-center">
                <div class="quantity-button-handler a">-</div>
                <input class="form-control cart-quantity-input qty-text" type="text" step="1" product-cart-id="${i}" name="quantity" value="${item.qnt}" disabled>
                <div class="quantity-button-handler a">+</div>

            </div>
            </div>
            <div class="mt-2">
            ${(item.discount > 0) ? `<span style="display: block;font-size:12px">Custava <span class="item-undiscount-${i} mt-2" style="text-decoration: line-through!important;"><span class="rs">R$</span>${price((item.price+item.discount) * item.qnt)}</span></span>`:''}
            <span style="display: block;"><span class="item-${i} mt-0 green-price" ><span class="rs">R$</span>${price(item.price * item.qnt)}</span> ${(item.discount > 0) ? `<small class="trasparent35 wow slideInRight" data-wow-duration="200" data-wow-delay="0">(ECONOMIZOU <span class="trasparent75 bold item-economy-${i}"><span class="rs">R$</span>${price(item.discount * item.qnt)}</span>)</small>`:''}</span>
           </div>
                </td>
                
                </tr>`
            total += parseFloat(item.price * item.qnt)
            totalItens += item.qnt
            variation_details = ''
        })
        //
        $('tbody').empty().append(((cart_item_template) ? cart_item_template : '😭 Sem produtos no Carrinho.'))

        if (total == 0) {
            $('.total-card').remove()
        } else {


         
            if(data.store.installment > 0){
                $('.total-price').empty().html(`<span class="rs">R$</span>${price(total)} <span class="mb-0 sub">em até </span>${data.store.installment}x <span class="mb-0 sub">de</span> <span class="green-price"><span class="rs">R$</span> ${price((total/data.store.installment))}</span>`)
            }else{
                $('.total-price').empty().html(`<span class="rs">R$</span>${price(total)}`)
            }
       

        }
    }


    $('.cart-qnt').text(totalItens)


}

if ($('.cart-table')) {
    InitCart()
}

$('.a').click('click', function (e) {
    var value = $(this).parent().find("input").val();
    var cartId = $(this).parent().find("input").attr('product-cart-id')

    if ($(this).text() == "+") {
        var newVal = parseFloat(value) + 1;
    } else {
        if (value > 1) {
            var newVal = parseFloat(value) - 1;
        } else {
            newVal = 1;
        }
    }

    cartData = JSON.parse(get(`cart-${data.store.cod}`))
    cartData.cart.itens[cartId].qnt = newVal

    var current_itens = $('.cart-qnt').text() //1
    $('.cart-qnt').text((parseFloat(current_itens) - parseFloat(value)) + parseFloat(newVal))


    var total = 0
    var cart_item_template = ''
    $.each(cartData.cart.itens, function (i, item) {
        total += parseFloat(item.price * item.qnt)
    })


    store(`cart-${data.store.cod}`, JSON.stringify(cartData))

    var itemPrice = parseFloat(cartData.cart.itens[cartId].price * newVal)
    var itemPriceUnDiscount = parseFloat((cartData.cart.itens[cartId].price+cartData.cart.itens[cartId].discount) * newVal)

    $(`.item-undiscount-${cartId}`).empty().html(`<span class="rs">R$</span>${price(itemPriceUnDiscount)}`)
    $(`.item-${cartId}`).empty().html(`<span class="rs">R$</span>${price(itemPrice)}`)

    $(`.item-economy-${cartId}`).empty().html(`<span class="rs">R$</span>${price(itemPriceUnDiscount-itemPrice)}`)

    
   
    if(data.store.installment > 0){

        $('.total-price').empty().html(`<span class="rs">R$</span>${price(total)} <span class="mb-0 sub">em até </span>${data.store.installment}x <span class="mb-0 sub">de</span> <span class="green-price"><span class="rs">R$</span>${price((total/data.store.installment))}</span>`)
    }else{
        $('.total-price').empty().html(`<span class="rs">R$</span>${price(total)}`)
    }




});



var AllItens = []
var Search = []
var countItens = 0

function getItem(id) {
    return AllItens[id]
}

function removeItem(id) {
    if (confirm("Deseja Remover o Item ?")) {

        var countItens = 0
        cartData = JSON.parse(get(`cart-${data.store.cod}`))
        console.log(cartData)
        cartData.cart.itens.splice(id, 1);

        $(`.item-cart-${id}`).remove()


        $("tr").each(function (index, element) {

            $(this).attr('class', `item-cart-${index}`)

            $(this).find('a').attr('onclick', `removeItem('${index}')`)
            console.log(index)
        })

        store(`cart-${data.store.cod}`, JSON.stringify(cartData));

        var total = 0
        $.each(cartData.cart.itens, function (i, item) {
            total += parseFloat(item.price * item.qnt)
            countItens += item.qnt
        })

        $('.cart-qnt').text(countItens)

        if (countItens == 0) {
            $('tbody').empty().append('😭 Sem produtos no Carrinho.')
        }
  
        if(data.store.installment > 0){
            $('.total-price').empty().html(`<span class="rs">R$</span>${price(total)} <span class="mb-0 sub">em até </span>${data.store.installment}x <span class="mb-0 sub">de</span> <span class="green-price"><span class="rs">R$</span>${price((total/data.store.installment))}</span>`)
        }else{
            $('.total-price').empty().html(`<span class="rs">R$</span>${price(total)}`)
        }
   
    } else {

    }


}

function slugify(text) {
    return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ğ/g, 'g').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ç/g, 'c').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '').replace(/[\s_-]+/g, '-');
}

function StoreSearch(){

    var url = new URL(window.location.href);
    var por = url.searchParams.get("por");

    var num = por.replace(/,/g, "");
    if (!isNaN(num)) {

        let variations = por.split(',');


        /*$(".selected").each(function (index, element) { 
            //console.log(element)
             opt.push(slugify($(this).attr('opt')))
        })*/
        $(`span.switch`).removeClass('selected')
        variations.forEach(function(item) {
            console.log(item)         
                $(`span.switch[opt="${item}"]`).addClass('selected')
        });


    }

   
    //store(`search-${data.store.cod}`, JSON.stringify(por))



}

function checkSearch(){
    if ($(".switch").length > 0) {
        //verifica se existe o buscador
    var opt = []
    $(".selected").each(function (index, element) { 
        //console.log(element)
         opt.push(slugify($(this).attr('opt')))
    })

    console.log(btoa(opt))

    //cartData = JSON.parse(get(`cart-${data.store.cod}`))
    store(`search-${data.store.cod}`, JSON.stringify(opt))

       if ($(".nav-active").length > 0){
            // Do something if class exists

            $('.busca').css('position', "initial")
            $('#buscar').removeClass('ml-3').css('font-size', "1.3em")

            $('.container.cart-form').css('padding', "0px")

            


        } else {
            // Do something if class does not exist
            if(opt.length > 0){
                $('.busca').animate({
                    bottom: '56px'
                }, 200);
            }else{
                $('.busca').animate({
                    bottom: '-56px'
                }, 200);
    
            }
    
        }
  
       
     }
}

$('.switch').on('click', function() {
    $(this).toggleClass("selected"); //you can list several class names 
   // e.preventDefault();
   checkSearch()
  
});


if ($(".search").length > 0) {
// this is the target which is observed
var target = document.querySelector('div[search="buscar"]')

// configure the intersection observer instance
var intersectionObserverOptions = {
  root: null,   // default is the viewport
  threshold: .5 // percentage of the taregt visible area which will trigger "onIntersection"
}
    
var observer = new IntersectionObserver(onIntersection, intersectionObserverOptions)

// called when target is fully visible
function onIntersection(entries, opts){
  entries.forEach(entry => {
    var visible = entry.intersectionRatio >= opts.thresholds[0]
    
    //console.clear();
    //console.log(entry.intersectionRatio.toFixed(2), visible)
    
    //target.classList.toggle('visible', visible)
    if(visible){
        checkSearch()
    }else{
        if ($(".nav-active").length > 0){
            // Do something if class exists
        } else {
            // Do something if class does not exist
            $('.busca').animate({
                bottom: '-56px'
            }, 200);
        }

      



    }
   
  })
}
    observer.observe(target)
}

// provide the observer with a target


$('#buscar').on('click', function() {
//console.log('buscar clicado')
    var opt = []

    $(".selected").each(function (index, element) { 
         opt.push(slugify($(this).attr('opt')))
    })

    //console.log(`/${data.store.cod}/buscar?por=${opt}`)
    if(opt.length > 0){
        window.location.href = `/${data.store.cod}/buscar?por=${opt}`;
    }else{
        alert('Escolha pelo menos uma opção.')
        $(".nav-active").animate(
            {
              scrollTop: $(".search").offset().top + 10
            },
            800 //speed
          );
    }
    
})
    

        var search = JSON.parse(get(`search-${data.store.cod}`))
        if(search && search.length > 0){
           
            if ($(".switch").length>0) {

       
                //console.log('temos buscas feitas')
             
                
           $.each(search, function(i, search) {
                    //console.log(search)
                    $(`[opt=${search}]`).toggleClass("selected")
                })
       }
             
       }
    






$(".form-check").on("click", function () {
    $(this).closest('.choose-size-wrapper').removeClass('alertred').find('.need-select').hide()
});

async function ItemPrice(ItemID) {
    return await $.ajax({
        url: `/api/find/item`,
        type: "POST",
        data: {
            "id": ItemID
        }
    })

}


function removeRedAlert(el) {
    console.log('remover red alert')
    //console.log($(el))
    //console.log(el.closest('.subvariation_place'))
    $(el).closest('.choose-size-wrapper').removeClass('alertred').find('.need-select').hide()

}





$('.form-check-input').on('change', function () {

    $(this).closest('.choose-size-wrapper').removeClass('alertred').find('.need-select').hide().find()

    //remove('.subvariation_place');
    $(this).closest('.choose-size-wrapper').find('.subvariation_place').remove()
    //$('.subvariation_place').remove()

    var data = $(this).attr('subvariation')
    var variation = $(this).attr('variation')

    /* if(data != 'false'){
     var subvariation = JSON.parse(data)
     
         var sub_choice = ``
         $.each(subvariation.value, function(i, choice) {
             sub_choice += ` 
             <div class="form-check mb-0 mr-2 mb-2" onclick="removeRedAlert(this)">
             <input class="form-check-input sizeRadio${i}" 
             id="sizeRadio${subvariation.description}${i}" 
             variationname="${subvariation.description}" 
             variation="${choice}" 
             type="radio" name="sizeRadio${subvariation.description}">
             <label for="sizeRadio${subvariation.description}${i}">
             ${choice.toUpperCase()}</label>
         </div>`
 
         })
 
         var subvariationtemplate = `
         <div class="choose-size-wrapper col-12 pb-2 subvariation_place">
             <p class="mb-1 font-weight-bold">
              ${subvariation.description.toUpperCase()}
             </p>
             <div class="choose-size-radio  align-items-center" id="">
             <span class="badge badge-warning">Escolha</span> ${sub_choice}
              <p class="need-select" style="display: none;margin-bottom: 0px;">
              👋 Por favor escolha pelo menos uma das opções acima para <strong>${subvariation.description.toUpperCase()}</strong>
             </p>
             </div>
         </div>`
         
         $(this).closest('.choose-size-wrapper').append(subvariationtemplate)
         
 
     }*/

});



async function addCart(itemID) {
    //var audio = new Audio('/assets/notification/click.mp3');
    //audio.play();

    var variations = []
    var priceSUM = 0
   
    var pass = true

    var elementsToCheck = 0

    var notify = []

    if ($(".choose-size-radio")) {

        $(".choose-size-radio").each(function (index, element) {
            var selected = 0

            var id = makeid(10)
            $(this).attr('id-choice', id)

            var elementsinside = $(this).find('[class*=sizeRadio]')

            // console.log(elementsinside)
            elementsinside.each(function () {
                var $this = $(this),
                    variationname = $this.attr('variationname'),
                    variation = $this.attr('variation');
                if ($(this).prop('checked')) {
                    variations.push({ "variation": variationname.toUpperCase(), "choice": variation.toUpperCase() })
                    selected++
                }


            });

            if (selected == 0) {
                notify.push(id)
                $(this).closest('.choose-size-wrapper').addClass('alertred')
                $(this).find('.need-select').show()
                console.log('nao é possivel adicionar antes de indicar as variacoes')
                pass = false


            } else {
                $(this).closest('.choose-size-wrapper').removeClass('alertred')
                $(this).find('.need-select').hide()


            }




        });

        if (notify.length > 0) {
            $('html, body').animate({
                scrollTop: $(`[id-choice=${notify[0]}]`).offset().top - 100
            }, 200);
        }
        console.log(notify)


        /* if (selected != elementsToCheck) {
     
           $('html, body').animate({
                 scrollTop: $('.sizeRadio' + index).offset().top
             }, 200);

         } else {

             $(this).closest('.choose-size-wrapper').removeClass('alertred')
             $(this).find('.need-select').hide()

         }*/


        // verificar as variações para inclusão no produto.


    }

    if (pass == true) {

        await ItemPrice(itemID).then((item) => {

            var item_qnt = parseFloat($('.cart-quantity-input').val())

            if (item != 'not found') {



                priceSUM += parseFloat(item.price) - ((item.discount) ? item.discount : 0)

                 console.log('Qnt itens', item_qnt)
                if (item_qnt > 1) {
                    priceSUM = priceSUM * item_qnt
                    //  console.log(priceSUM)
                } else {
                    var item_qnt = 1
                }


                var t = ({
                    "pass": pass,
                    "name": item.name,
                    "id": item.product_id,
                    "price": (item.price - item.discount),
                    "price_real":parseFloat(item.price),
                    "discount": parseFloat(item.discount),
                    "pic": ((item.media[0]) ? `/media/${data.store.folder}/${item.media[0].name}` : '/media/no-pic.jpg'),
                    "qnt": ((item_qnt) ? item_qnt : 1),
                    "variation": variations
                })

                console.log('adicionar ao carrinho')

                cartData = JSON.parse(get(`cart-${data.store.cod}`))
                cartData.cart.itens.push(t)
                store(`cart-${data.store.cod}`, JSON.stringify(cartData));

                var emojis = ["🥳", "🤩", "😎", "😍", "🥰", "👍", "😄"]
                var randomEmoji = Math.floor(Math.random() * emojis.length)
                console.log(emojis[randomEmoji])

                function itenGenero(item) {
                    var variation_adicionado = "adicionado"
                    var item = item.slice(-1)
                    console.log(item)

                    if (item == 'a') {
                        variation_adicionado = "adicionada"
                    }

                    return variation_adicionado
                }

                $("body").append(`<span class='emoji-aleatorio'>${emojis[randomEmoji]}<p class="texto-emoji">${item.name}, ${itenGenero(item.name)} com Sucesso!</p></span><div class='add2cart-notification animated'>O que deseja fazer ?
            <a class="btn btn-warning btn-lg w-100 mt-1" href="javascript:history.back()">CONTINUAR COMPRANDO</a>
            <a class="btn btn-success btn-lg mt-3 mb-2 w-100" href="/cart/${data.store.cod}" >FINALIZAR COMPRA</a>
            </div>`)
                $('.add2cart-notify').prop("disabled", true);
                $('.page-content-wrapper').addClass('blur')

                //fb track

                fbq('track', 'AddToCart', {
                    value: priceSUM,
                    currency: 'BRL'
                });




            } else {

                console.log('Item não encontado =/')
            }




        })


        // $(".add2cart-notification").delay(2000)

    } else {
        console.log('Item não adicionado')
    }







}





let cnt_products_discount = 0,
    cnt_products_featured = 0

if (data.categories.length > 0) {
    var tpl_categories = ``
    var left_categories = ``
    $.each(data.categories, function (i, category) {

        tpl_categories += `<div class="col-4">
                <div class="card catagory-card">
                    <div class="card-body text-center"><a href="/${data.store.cod}/buscar?categories=${category.category_id}"><i
                        class="la-3x ${category.icon}"></i><span>${category.name}</span></a></div>
                </div>
            </div>`

        left_categories += ` <li class="category"><a href="/${data.store.cod}/buscar?categories=${category.category_id}"><i
    class="la-3x ${category.icon}"></i>
    ${category.name}</i>
    </a></li>`

    })
    if (tpl_categories) {
        $('.product-catagory-wrap > div').append(tpl_categories)
    }

    if ($('.categories-display')) {
        $('.categories-display').append(left_categories)
    }






}

if (data.products) {

    var tpl_products_discount = `<div class="flash-sale-slide owl-carousel">`
    var tpl_products_featured = ``

    $.each(data.products, function (i, product) {




        if (product.discount > 0) {

            tpl_products_discount += `
                    <div class="card flash-sale-card">
            <div class="card-body"><a href="/${data.store.cod}/product/${product.product_id}"><img src="${imgPreload}" data-src="${((product.media.length > 0) ? `/media/${data.store.folder}/${product.media[0].name}` : '/media/no-pic.jpg')}" alt><span
                  class="product-title">${product.name}</span>
                <p class="sale-price"><span class="rs">R$</span>${parseFloat(product.price - product.discount)}<span class="real-price">${parseFloat(product.price)}</span></p>
              </a></div>
          </div>`
            cnt_products_discount++
        }

        if (product.featured == 1) {

            tpl_products_featured += ` <div class="col-6 col-md-4 col-lg-3">
            <div class="card top-product-card">
                <div class="card-body"><span class="badge badge-success">Destaque</span>
                    <a class="product-thumbnail d-block" href="/${data.store.cod}/product/${product.product_id}"><img class="mb-2" src="${imgPreload}" data-src="${((product.media.length > 0) ? `/media/${data.store.folder}/${product.media[0].name}` : '/media/no-pic.jpg')}" alt></a><a class="product-title d-block" href="single-product.html">${product.name}</a>
                    ${((product.discount > 0) ? `<p class="sale-price">${product.price - product.discount}<span>${product.price}</span></p>` : `<p class="sale-price">${product.price}</p>`)}
                    <div class="product-rating"><i class="lni lni-staaddCartr-filled"></i><i class="lni lni-star-filled"></i><i class="lni lni-star-filled"></i><i class="lni lni-star-filled"></i><i class="lni lni-star-filled"></i></div>
                </div>
            </div>
        </div>`
            cnt_products_featured++
        }

    })

    tpl_products_discount += `</div>`

    if (cnt_products_discount > 0) {
        $('.flash-sale-wrapper .container').append(tpl_products_discount)
        $('.flash-sale-wrapper').show()
    }
    if (cnt_products_featured > 0) {
        $('.top-products-area.home .container .row').append(tpl_products_featured)
        $('.top-products-area.home').show()
    }







}


if (get('last-order')) {

    if (window.location.href.indexOf("order") > -1) { } else {
        askOrderSuccess(get('last-order'))
    }
}


function askOrderSuccess(order_url) {

    $("body").append(`<div class='add2cart-notification animated'>Seu pedido foi enviado corretamente para o whatsapp?
    <span class="btn btn-success btn-lg w-100 mt-1" onclick="respOrderRecive('${order_url}', 'true')">SIM</span>
    <a class="btn btn-light btn-lg mt-3 mb-2 w-100" onclick="respOrderRecive('${order_url}', 'false')">NÃO</a>
    </div>`)
    $('.add2cart-notify').prop("disabled", true);
    $('.page-content-wrapper').addClass('blur')
}


async function InitWhatsapp(resp) {

    store('last-order', resp.order_url)

    cartData = JSON.parse(get(`cart-${data.store.cod}`))
    console.log(cartData.customer)

    const nl = '%0A'
    var orderTotal = 0

    var date = new Date();

    var hoje = ("00" + date.getDate()).slice(-2)
        + "/" + ("00" + (date.getMonth() + 1)).slice(-2)
        + "/" + date.getFullYear()

    var hora = ("00" + date.getHours()).slice(-2) + ":"
        + ("00" + date.getMinutes()).slice(-2)


    var order = ``
    order += `*Novo Pedido - ${resp.order_url}*${nl}`
    order += `${((cartData.customer.name) ? `_Nome: ${cartData.customer.name}_${nl}`: ``)}`
    order += `${nl}*Itens*${nl}`
    $.each(resp.products, function (i, product) {
        order += `${product.qnt} x ${product.name} ${((product.variations) ? ` -${product.variations} ` : ``)}- R$${(product.price).toFixed(2)}`
        order += `${nl}`
        orderTotal += (product.price * product.qnt).toFixed(2)
    })
    order += `${nl}*Total: R$${orderTotal}*${nl}`
    order += `Pedido Realizado em ${hoje} as ${hora}hrs${nl}`
    order += `Acesse seu pedido nesse link: https://anyloja.com.br/order/${resp.order_url}${nl}`
    order += `👉Apenas Envie para o Vendedor`
    // perguntar na pagina se foi redirecionado corretamente para o whatsapp
    // enviar o cliente para o whatsapp em uma nova pagina
    var link = `https://api.whatsapp.com/send?phone=55${resp.phone}&text=${order}`
    fbq('track', 'Purchase', {
        value: orderTotal,
        currency: 'BRL'
    });

    askOrderSuccess(resp.order_url)
    return link

}



function GetUserInfo() {

    cartData = JSON.parse(get(`cart-${data.store.cod}`))
    console.log(cartData.customer)

    if (typeof cartData.customer.name == 'undefined' && cartData.cart.itens.length > 0) {
        console.log('sem cliente')

        $('.content-cart').addClass('none')
        $('.login-wrapper').removeClass('none')

        $(".whastapp-input")
            .mask("(99) 9999-9999?9")
            .focusout(function(event) {
                var target, phone, element;
                target = (event.currentTarget) ? event.currentTarget : event.srcElement;
                phone = target.value.replace(/\D/g, '');
                element = $(target);
                element.unmask();
                if (phone.length > 10) {
                    element.mask("(99) 99999-999?9");
                } else {
                    element.mask("(99) 9999-9999?9");
                }
            });
        $(".whastapp-input").trigger("focus")
    }else{
        whatsappToDB()
    }

}




$(".whastapp-input").click('click', function(e) {
    $(".whastapp-input").trigger("focus")
})


$('.send-client').click('click', function(e) {

    var client = $(".client-input").val()
    var whastapp = $(".whastapp-input").val()

    var pass_name = false,
        pass_whats = false

    if (whastapp < 9) {
        // checa o whatsapp
        $('.erro-whatts').removeClass('none')
        $(".whastapp-input").trigger("focus")
    } else {
        $('.erro-whatts').addClass('none')
        pass_whats = true
    }

    if (client.length < 3) {
        $('.erro-name').removeClass('none')
        if (pass_whats)
            $(".client-input").trigger("focus")
    } else {
        $('.erro-name').addClass('none')
        pass_name = true
    }

    if (pass_name && pass_whats) {
        cartData = JSON.parse(get(`cart-${data.store.cod}`))
        cartData.customer = {
            'name': client,
            'whatsapp': whastapp
        }
        $('.content-cart').removeClass('none')
        $('.login-wrapper').addClass('none')
        store(`cart-${data.store.cod}`, JSON.stringify(cartData))

        whatsappToDB()

    }
})

function whatsappToDB(){
 
       // var url = $('.whatsapp').attr('data')
        var redirectWindow = window.open('https://google.com', '_blank')

        $.ajax({
            url: `/${data.store.cod}/send/whatsapp`,
            type: "POST",
            data: {
                //"url": url,
                "order": get(`cart-${data.store.cod}`)
            },
            success: function (response) {

                //console.log('update successful', response)
                // start do send order to watsapp
                InitWhatsapp(response).then(link => {
                    //
                    redirectWindow.location.href = link
                    console.log(link)
                })

            },
            error: function () {
                alert("error");
            }
        });


    
}


$('.whatsapp').click(function () {

    cartData = JSON.parse(get(`cart-${data.store.cod}`))
    if (cartData.cart.itens.length == 0) {
        console.log('sem itens no carrinho')
        alert("Seu Pedido não tem itens")
    } else {

        if(data.store.require_client == 1){
            GetUserInfo()
            $(".whastapp-input").trigger("focus")
        }else{
            whatsappToDB()
        }
       
    }


});


(function () {
    'use strict';

    var suhaWindow = $(window);
    var sideNavWrapper = $("#sidenavWrapper");
    var blackOverlay = $(".sidenav-black-overlay");

    // :: Preloader
    suhaWindow.on('load', function () {
        $('#preloader').fadeOut('100', function () {
            $(this).remove();
        });
    });

    // :: Navbar
    $(".filter").on("click", function () {
        $("#filter").addClass("nav-active");
        blackOverlay.addClass("active");
    });

    $("#suhaNavbarToggler").on("click", function () {

        sideNavWrapper.addClass("nav-active");
        blackOverlay.addClass("active");
    });

    $("#goHomeBtn").on("click", function () {
        sideNavWrapper.removeClass("nav-active");
        blackOverlay.removeClass("active");
        $("#filter").removeClass("nav-active");
    });

    blackOverlay.on("click", function () {
        $(this).removeClass("active");
        sideNavWrapper.removeClass("nav-active");
        $("#filter").removeClass("nav-active");

    })

    // :: Dropdown Menu
    $(".sidenav-nav").find("li.suha-dropdown-menu").append("<div class='dropdown-trigger-btn'><i class='lni lni-chevron-down'></i></div>");
    $(".dropdown-trigger-btn").on('click', function () {
        $(this).siblings('ul').stop(true, true).slideToggle(700);
        $(this).toggleClass('active');
    });


    if (socialStory.options.playlist.length > 0) {
        console.log('temos stories')
        $('.show-stories').show()

        $(".stories-view").on("click", function () {
            fbq('track', 'Storie');
        });





     






    } else {
        console.log('perfil sem stories')
    }


    // :: Hero Slides
    if ($.fn.owlCarousel) {
        var welcomeSlider = $('.hero-slides');
        welcomeSlider.owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            dots: true,
            center: true,
            margin: 0,
            nav: true,
            navText: [('<i class="las la-chevron-circle-left"></i>'), ('<i class="las la-chevron-circle-right"></i>')]
        })

        welcomeSlider.on('translate.owl.carousel', function () {
            var layer = $("[data-animation]");
            layer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).removeClass('animated ' + anim_name).css('opacity', '0');
            });
        });

        $("[data-delay]").each(function () {
            var anim_del = $(this).data('delay');
            $(this).css('animation-delay', anim_del);
        });

        $("[data-duration]").each(function () {
            var anim_dur = $(this).data('duration');
            $(this).css('animation-duration', anim_dur);
        });

        welcomeSlider.on('translated.owl.carousel', function () {
            var layer = welcomeSlider.find('.owl-item.active').find("[data-animation]");
            layer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).addClass('animated ' + anim_name).css('opacity', '1');
            });
        });
    }

    // :: Flash Sale Slides
    if ($.fn.owlCarousel) {
        var flashSlide = $('.flash-sale-slide');
        flashSlide.owlCarousel({
            items: 3,
            margin: 16,
            loop: true,
            autoplay: true,
            smartSpeed: 800,
            dots: false,
            nav: false,
            responsive: {
                1400: {
                    items: 5,
                },
                992: {
                    items: 5,
                },
                768: {
                    items: 4,
                },
                480: {
                    items: 4,
                },
            },
        })
    }




    // :: Products Slides
    $(function() {
    if ($.fn.owlCarousel) {        
    
        var productslides = $('.product-slides');
          // Initiate zoom
      
        productslides.owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            autoplay: false,
            autoplayTimeout: 5000,
            dots: true,
            nav: true,
            navText: [('<i class="las la-arrow-left"></i>'), ('<i class="las la-arrow-right"></i>')],
            onTranslated: function() {
                // Update Magnify when slide changes
                
             // $('.zoom').magnify().destroy();
             //setTimeout(function() {
                // Update Magnify when slide changes
                $zoom.destroy().magnify();
              //}, 5000); // This number should match paginationSpeed option
               
              },
              onDragged: function () {
               
              },
            
        })
   

        var $zoom = $('.zoom').magnify({
            touchBottomOffset: 90,
            mobileCloseEvent: 'click',
            timeout: 100,
            afterLoad: function() {
                
          console.log('Magnification powers activated!');
        }
      });
        
    }

});

    // :: Jarallax
    if ($.fn.jarallax) {
        $('.jarallax').jarallax({
            speed: 0.5
        });
    }

    // :: Counter Up
    if ($.fn.counterUp) {
        $('.counter').counterUp({
            delay: 150,
            time: 3000
        });
    }

    // :: Prevent Default 'a' Click
    $('a[href="#"]').on('click', function ($) {
        $.preventDefault();
    });

    // :: Password Strength Active Code
    if ($.fn.passwordStrength) {
        $('#registerPassword').passwordStrength({
            minimumChars: 8
        });
    }

    // :: Cart Quantity Button Handler
    $(".quantity-button-handler").on("click", function () {
        var value = $(this).parent().find("input.cart-quantity-input").val();
        if ($(this).text() == "+") {
            var newVal = parseFloat(value) + 1;
        } else {
            if (value > 1) {
                var newVal = parseFloat(value) - 1;
            } else {
                newVal = 1;
            }
        }

        $(this).parent().find("input").val(newVal);
    });

    // :: Data Countdown
    $('[data-countdown]').each(function () {
        var $this = $(this),
            finalDate = $(this).data('countdown');
        $this.countdown(finalDate, function (event) {
            $(this).find(".days").html(event.strftime("%D"));
            $(this).find(".hours").html(event.strftime("%H"));
            $(this).find(".minutes").html(event.strftime("%M"));
            $(this).find(".seconds").html(event.strftime("%S"));
        });
    });

    if ($.fn.toast) {
        $('#pwaInstallToast').toast('show');
    }

})();

new WOW().init();


setTimeout(() => {

    //$('.remove-zoom').remove()
    
}, 2000);