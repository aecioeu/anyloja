const messaging = firebase.messaging();
//getNotificationData(result.token, result.store_name, price, cod, folder, order_cod)
function getNotificationData(token, storeName, price, cod, folder, order_cod) {
    return {
        to: token,
        data: {
            notification: {
                title: `${storeName} bom trabalho, você vendeu!`,
                body: `Acabou de chegar mais uma venda no valor de R$${price}, toque aqui para ver o pedido e concluir com o cliente`,
                click_action: `https://anyloja.com.br/loja/order/${order_cod}`,
                icon: `https://anyloja.com.br/media/${folder}/logo/logo96.webp`
            }
        }

    };
}

function requestToken() {
    messaging.getToken().then(function(token) {

        if (get('token') !== token) {
            store('token', token)
            $.ajax({
                url: "/loja/subscrible",
                type: "POST",
                data: {
                    "token": token
                },
                success: function(data) {
                    console.log(data)
                },
                error: function() {
                    alert("error");
                }

            });

        }

    }).catch(function(error) {
        console.error("Um erro ocorreu ao recuperar o token:", error);
    });
}

function requestPermission() {
    messaging.requestPermission().then(function() {
        requestToken();
    }).catch(function(error) {
        console.error("Ocorreu um erro ao solicitar permissão:", error);
    });
}

function sendMessage(cod, price, folder, order_cod) {

    $.ajax({
        url: "/loja/notify",
        type: "POST",
        data: {
            "cod": cod
        },
        success: function(results) {
            console.log(results)
            $.each(results, function(i, result) {

                //console.log(result.token, result.store_name)

                $.ajax({
                    type: "POST",
                    url: "https://fcm.googleapis.com/fcm/send",
                    headers: {
                        Authorization: "key=AAAA7k8Xl0A:APA91bHa5IGIFNdVux42b5_REP6jJLDMqgtKSq-O2tKEPmlQSchS7QfIFHczcp-9nUq5tctbh8HM_m6LT7EVdFPJzmAoGqE06k2BKORaMbXuPfzmcGY1ZvCMGHwJ5bKQ7XZlmIP1uNn-"
                    },
                    contentType: 'application/json',
                    dataType: 'json',
                    //                          getNotificationData(token, storeName, price, cod, folder, order_cod)
                    data: JSON.stringify(getNotificationData(result.token, result.store_name, price, cod, folder, order_cod)),
                    success: function(data) {
                        console.log('iniciando o envio')
                        console.log(data)
                    },
                    error: function(xhr, status, error) {
                        alert("Houve um erro ao enviar a mensagem!");
                        console.error("Status:", status, xhr.error);
                    }
                });

            });
        },
        error: function() {
            alert("error");
        }

    });


}

messaging.onMessage(function(payload) {
    console.log(payload)
    const data = JSON.parse(payload.data.notification);
    console.log(data.title, data)
    const notification = new Notification(data.title, data);

    //new Notification("Hello!", {body: "Corpo\nda mensagem", icon: './felipenmoura.jpg' })

    notification.onclick = function(event) {
        event.preventDefault();
        window.open(data.click_action, "_blank");
        this.close();
    }
});
// request permission on page load
document.addEventListener('DOMContentLoaded', function() {
    if (!Notification) {
        alert('Desktop notifications not available in your browser. Try Chromium.');
        return;
    }
    if (Notification.permission !== 'granted')
        Notification.requestPermission();
});