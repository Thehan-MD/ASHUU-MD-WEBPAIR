const express = require('express');
const twilio = require('twilio');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// Twilio credentials
const accountSid = 'your_twilio_account_sid';  // Replace with your Twilio Account SID

const authToken = 'your_twilio_auth_token';    // Replace with your Twilio Auth Token
const client = twilio(accountSid, authToken);
 
// Route to handle sending WhatsApp verification code
app.post('/sendVerificationCode', (req, res) => {
    const phoneNumber = req.body.phoneNumber;  // The phone number from the front-end form
    const verificationCode = Math.floor(100000 + Math.random() * 900000); // Random 6-digit code

    // Send the verification code to the user's WhatsApp
    client.messages.create({
        body: `Your verification code is: verificationCode`,  // The message to send
        from: 'whatsapp:+14155238886',  // Twilio's WhatsApp number (this is Twilio's sandbox number)
        to: `whatsapp:{phoneNumber}`  // The user's phone number, formatted as WhatsApp: +CountryCodePhoneNumber
    })
    .then(message => {
        console.log(`Message sent: ${message.sid}`); // Logs the message SID
        res.send({ message: 'Verification code sent successfully!' });  // Respond with success message
    })
    .catch(error => {
        console.error('Error sending message:', error);
        res.status(500).send({ error: 'Error sending message' });  // Handle errors
    });
});

// Set up the server to listen on port 3000
app.listen(3000, () => {

console.log('Server running on port 3000');
});
