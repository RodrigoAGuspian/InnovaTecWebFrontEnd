var firebase = require('firebase-admin');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

// Fetch the service account key JSON file contents
var serviceAccount = require("./innovatecfrontend-firebase-adminsdk-6v5zs-e98f2b4903.json");

// Initialize the app with a service account, granting admin privileges
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://innovatecfrontend.firebaseio.com"
});
ref = firebase.database().ref();

const oauth2Client = new OAuth2(
  "811818195535-9tdqmjtvplj3lf1l6ko81g6tiggr36v9.apps.googleusercontent.com", 
  "-9nmZz7bN1QJal3UdHaXHPgF",
  "https://developers.google.com/oauthplayground"
);

function listenForNotificationRequests() {
  var requests = ref.child('notificationRequests');
  requests.on('child_added', function(requestSnapshot) {
    var request = requestSnapshot.val();
    sendNotificationToUser(
      request.user, 
      request.message,
      request.subject,
      function() {
        requestSnapshot.ref.remove();
      }
    );
  }, function(error) {
    console.error(error);
  });
};

function listenForNotificationRequestsToAdmin() {
  var requests = ref.child('notificationRequestsToAdmin');
  requests.on('child_added', function(requestSnapshot) {
    var request = requestSnapshot.val();
    sendNotificationToAdmin(
      request.user, 
      request.message,
      request.subject,
      function() {
        requestSnapshot.ref.remove();
      }
    );
  }, function(error) {
    console.error(error);
  });
};

function sendNotificationToUser(user, message, subjectN, onSuccess) {
  oauth2Client.setCredentials({
    refresh_token: "1/JI7HevFFcgT4TyOHCYS0v6LT30gGxTTfo2E4e2HPOXw"
  });
  const accessToken = oauth2Client.getAccessToken()
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: "OAuth2",
      user: "casasolarctpi@gmail.com", 
      clientId: "811818195535-9tdqmjtvplj3lf1l6ko81g6tiggr36v9.apps.googleusercontent.com",
      clientSecret: "-9nmZz7bN1QJal3UdHaXHPgF",
      refreshToken: "1/JI7HevFFcgT4TyOHCYS0v6LT30gGxTTfo2E4e2HPOXw",
      accessToken: accessToken
    }
  });
  const mailOptions = {
    from: 'casasolarctpi@gmail.com',
    to: user, // Cambia esta parte por el destinatario
    subject: subjectN,
    html:'<p>'+message+'</p>'+'<p><b> Atentamente: El Semillero de investigación en Energías Renovables y Eficiencia Energética SEINEREE</b></p>'
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err)
    console.log(err)
    else
    console.log(info);
      onSuccess();
    });
    
 
}

function sendNotificationToAdmin(user, message, subjectN, onSuccess) {
  oauth2Client.setCredentials({
    refresh_token: "1/JI7HevFFcgT4TyOHCYS0v6LT30gGxTTfo2E4e2HPOXw"
  });
  const accessToken = oauth2Client.getAccessToken()
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: "OAuth2",
      user: "casasolarctpi@gmail.com", 
      clientId: "811818195535-9tdqmjtvplj3lf1l6ko81g6tiggr36v9.apps.googleusercontent.com",
      clientSecret: "-9nmZz7bN1QJal3UdHaXHPgF",
      refreshToken: "1/JI7HevFFcgT4TyOHCYS0v6LT30gGxTTfo2E4e2HPOXw",
      accessToken: accessToken
    }
  });
  const mailOptions = {
    from: 'casasolarctpi@gmail.com',
    to: user, // Cambia esta parte por el destinatario
    subject: subjectN,
    html:'<p>'+message+'</p>'+'<p><b> Atentamente: El Sistema de Correos automáticos del Semillero de investigación en Energías Renovables y Eficiencia Energética SEINEREE</b></p>'
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err)
    console.log(err)
    else
    console.log(info);
      onSuccess();
    });
    
 
}

// start listening
listenForNotificationRequests();
listenForNotificationRequestsToAdmin();