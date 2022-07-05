importScripts("https://www.gstatic.com/firebasejs/8.2.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.4/firebase-messaging.js");
importScripts("/assets.admin/js/notification/init.js");

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    const notification = JSON.parse(payload.data.notification);

    return self.registration.showNotification(notification.title, notification);
});