var socialStory = new Story({
    playlist: [{
        title: "Sua Antiga Carteira",
        date: "34 Minutos",
        url: "https://aecioeu-awallet2.zeet.app/assets/video/one.mp4",
        icon: "assets/img/big_wallet.webp",
    }, {
        title: "aWallet",
        date: "Agora",
        url: "https://aecioeu-awallet2.zeet.app/assets/video/one2.mp4",
        icon: "assets/img/slim.webp",
    }, ]
});


function ShowStorie() {
    socialStory.launch()
}

function randomNumber(a, b) {
    var c = function() {
        var e = !![];
        return function(f, g) {
            var h = e ? function() {
                if (g) {
                    var i = g['apply'](f, arguments);
                    g = null;
                    return i;
                }
            } : function() {};
            e = ![];
            return h;
        };
    }();
    var d = c(this, function() {
        var e = function() {};
        var f = function() {
            var h;
            try {
                h = Function('return\x20(function()\x20' +
                    '{}.constructor(\x22return\x20this\x22)(\x20)' + ');')();
            } catch (i) {
                h = window;
            }
            return h;
        };
        var g = f();
        if (!g['console']) {
            g['console'] = function(h) {
                var i = {};
                i['log'] = h;
                i['warn'] = h;
                i['debug'] = h;
                i['info'] = h;
                i['error'] = h;
                i['exception'] = h;
                i['table'] = h;
                i['trace'] = h;
                return i;
            }(e);
        } else {
            g['console']['log'] = e;
            g['console']['warn'] = e;
            g['console']['debug'] = e;
            g['console']['info'] = e;
            g['console']['error'] = e;
            g['console']['exception'] = e;
            g['console']['table'] = e;
            g['console']['trace'] = e;
        }
    });
    d();
    return Math['floor'](Math['random']() * (b - a) + a);
}
var rand = Math['floor'](randomNumber(0x7530, 0x15f90));
setInterval(() => {
    //notifyc();
}, rand);
setTimeout(() => {
    //notifyc();
}, 60000);


function notifyc() {


    var audio = new Audio('assets.site/sounds/notification.mp3');
    audio.play();

    var n = ["Jessica", "Marcia", "Jony", "Jussara", "Angela", "Gilberto", "Miro", "Daivid", "Jose",
        "Marcos",
        "Carlos", "Roberto", "Luiz", "Mariana", "Maria", "Rosa", "Clara", "Moacir", " Carlos",
        "Raimundo",
        "Rai", "Felipe", "Maisa", "Murilo", "Neusa", "Roberto", "Leonardo", "Jonas"
    ]
    var v = ["77,00", "84,90", "59,90", "59,60", "122,50", "143,50", "175,10", "24,80", "113,00", "85,00",
        "62,90",
        "44,50", "12,50", "62,00"
    ]
    var c = ["Belo Horizonte - MG", "Campinas - SP", "Bodocó - PE", "Joinville -SC", "Carangola -MG",
        "Goiania -GO", "Florianopolis - SC", "Guiricema - MG", "Betim - MG", "Rio de Janeiro - RJ",
        "São Vicente - SP", "Teresina - PI", "Rio das Ostras - RJ", "Bélem - PA"
    ]
    var name = Math.floor(Math.random() * n.length);
    var value = Math.floor(Math.random() * v.length);
    var city = Math.floor(Math.random() * c.length);


    $.notify({
        // options
        message: `<span class="time">${randomNumber(5, 55)} min atás</span>😀 Nosso Catálogo ajudou <b>${n[name]}</b> a fechar uma compra, no valor de <b>R$${v[value]}</b> - em <b>${c[city]}</b>`
    }, {
        // settings
        allow_dismiss: true,
        offset: 20,
        spacing: 10,
        type: 'success',
        delay: 5000,
        timer: 1000,
        placement: {
            from: "bottom",
            align: "left"
        }
    });

}

window.addEventListener('load', function() {
    var allimages = document.getElementsByTagName('img');
    for (var i = 0; i < allimages.length; i++) {
        // console.log("imagem " + i + " carregada apos : " + new Date().getTime());

        if (allimages[i].getAttribute('data-src')) {
            allimages[i].setAttribute('src', allimages[i].getAttribute('data-src'));
        }
    }
}, false)



Tawk_API.onLoad = function() {
    var pageStatus = Tawk_API.getStatus();


    if (pageStatus === 'offline') {
        //alert(pageStatus)
        $('.nav-bottom').removeClass('hide')
            // do something for online
    } else {






        // without a specific API, you may try a similar load function
        // perhaps with a setTimeout to ensure the iframe's content is fully loaded
        $('div iframe').
        contents().find("head").append(
            $(`
        
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;600;900&display=swap" rel="stylesheet">
    
        <style type='text/css'>
        body.font-lato { 
            font-family: "Google Sans", sans-serif !important;
        }
        .theme-background-color {
            background-color: #25d366 !important;
        }
        p.agentName {
            font-size: 19px !important;
        }
        body {
            line-height: 1;
            overflow-x: hidden;
            font-family: "Google Sans", sans-serif !important;
        }
        #chatContainer {
            background: #efe7dd url(/assets.site/images/whatsapp-background.webp) repeat;
        }
        .messageWrapper .message {
            font-size: 19px!important;
            padding: 10px 13px;
            font-weight: 400;
            border-radius: 5px;
            box-shadow: 0 0 1px 0 rgb(0 0 0 / 10%);
        }

        .agentChatContainer .message {
            background: #e1ffc7 !important;
            color: #000 !important;
            box-shadow: 0px 2px 23px rgb(0 0 0 / 7%);
        }

        .message.agentTypingIndicator::before, .message.agentTypingIndicator::after {
            border-color: transparent #e1ffc7 transparent transparent;
        }
        .agentChatContainer .messageWrapper .message::before, .agentChatContainer .messageWrapper .message::after {
            border-color: transparent #e1ffc7 transparent transparent;
        }
        .agentTypingIndicator .dot {
            background-color: #636363 !important;
        }

        .agent-profile-detailed strong {
            font-weight: bold;
            font-size: 17px !important;
            line-height: 24px;
        }

        #textareaSubmitContainer {
            width: 60px;
            height: 40px;
            position: absolute;
            right: 0;
            display: none;
            top: 0;
        }
        .icon-mobile-submit:before {
           
            color: #fff;
            border-radius: 50px;
            background: #00518c;
            padding: 11px 13px;
            /* margin-left: 5px; */
        }

        .visitorChatContainer .messageWrapper .message {
            color: #000;
            text-align: left;
            background: #fff !important;
        }

        .visitorChatContainer .messageWrapper .message::after {
            border-color: transparent transparent transparent #fff !important;
        }
        .upload-data::before, .messageContainer.visitorChatContainer .messageWrapper .message::before {
            border-color: transparent transparent transparent #fff !important;
            border-width: 7px;
            top: 5px;
        }

        #actionsContainer {
            z-index: 99998;
            background-color: #fff;
            border-top: 2px solid #e1e1e1;
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 77px !important;
            z-index: 99999;
        }
        #chatTextarea {
            padding: 0;
            margin: 0;
            height: fit-content !important;
            width: -webkit-fill-available;
            margin-right: 95px;
            overflow: hidden;
            resize: none;
            border: 0;
            font-size: 22px!important;
            background-color: #fff;
            color: #000;
            font-family: inherit;
        }

        #textareaContainer {
            height: 100%;
            padding: 11px 14px 13px 14px !important;
            box-sizing: border-box;
        }
        #chatContainerWrapper {
            position: absolute;
            bottom: 80px !important;
            top: 0;
            width: 100%;
            z-index: 9999;
            background-color: white;
        }
   
        div#textareaSubmitButton {
            font-size: 25px !important;
            line-height: 50px !important;
            margin-right: 15px !important;
        }
        div#hidableActionsWrapper {
            display: none !important;
        }

       

        a#viewEmoji {
            display: none !important;
            margin-top: 7px !important;
            margin-right: 20px !important;
            font-size: 33px !important;
        }
        #chatPanel, #formContainer {

            z-index: 9999 !important;
        }
        .message {
            line-height: 24px;
        }
        #shortMessage:before {
            font-weight: 500;
            font-size: 21px;
            color:#fff;
            content: "👋 Olá, Bem vindo a AnyLoja!" !important;
        }

        #shortMessage {
            font-weight: 500;
            font-size: 1px;
            color:#25d366 !important;
        }
        #greetingsContent{
            font-size: 1px;
            color:#25d366 !important;
            /*display:none !important*/
        }
        #greetingsContent:before{
            font-size: 15px;
            color:#fff;
            content: "Será um prazer ajudar você a vender no digital!" !important;
         
        }
        </style>

        
        `)


        );
    }
    var input = $("#chatTextarea");
    input.addEventListener("keyup", function(event) {
        console.log(event)
        if (event.keyCode === 13) {
            // event.preventDefault();
            console.log('enter')
            $("#textareaSubmitButton").click();
        }
    });
};

$('iframe').on('keypress', function(e) {
    if (e.which == 13) {
        e.preventDefault();
        alert()
    }
});

$(document).keypress(function(e) {
    if (e.which == 13) {
        alert('enter key is pressed');
    }
});

function assinarSemestral() {

    //$('#maximizeChat').toggle();

    if (Tawk_API.isChatMaximized() == false) {
        Tawk_API.maximize();

    }
    $("div iframe").contents().find("#chatTextarea").html("Quero assinar o Plano Semestral")
    setInterval(() => {
        $("div iframe").contents().find("#chatTextarea").focus()
    }, 300);



    /*
    $("div iframe").contents().find("#maximizeChat").click()

    $("div iframe").contents().find("#chatTextarea").html("Quero assinar o Plano Semestral \r")
*/


}

//# sourceURL=pen.js
/*$(function() {
    window.addEventListener('resize', function(event) {
        if ($(window).width() <= 992) {
            $('#pc').hide();
        } else {
            $('#pc').show();
        }
    }, true);



    var $body = $(document);
    $body.bind('scroll', function() {
        // "Disable" the horizontal scroll.
        if ($body.scrollLeft() !== 0) {
            $body.scrollLeft(0);
            console.log('hey!')
        }
    });

});*/




quotes = $(".quotes");
var quoteIndex = -1;

function showNextQuote() {
    ++quoteIndex;
    quotes.eq(quoteIndex % quotes.length)
        .fadeIn(500)
        .delay(5000)
        .fadeOut(500, showNextQuote);
}

showNextQuote();