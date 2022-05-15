var socket = io.connect('http://localhost:3000', function() {
    console.log("conectado com id: " + socket.id);
});
//console.log(socket);


function teste() {
    message = "teste";

    socket.emit('message', {
        message: message

    })

}

teste()