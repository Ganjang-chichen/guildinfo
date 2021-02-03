const nodemailer = require('nodemailer');

module.exports = {
    send : (email, value) => {
        var transporter = nodemailer.createTransport({
            service:'gmail',
            auth: {
                user : 'ganjangchickens@gmail.com',
                pass : 'dhkswjsvhrltjsdjs!'
            }
        });
        
        var mailOption = {
            from : 'ganjangchickens@gmail.com',
            to : email,
            subject : '인증번호',
            text : value
        };

        transporter.sendMail(mailOption, function(err, info) {
            if ( err ) {
                console.error('Send Mail error : ', err);
            }
            else {
                console.log('Message sent : ', info);
            }
        });
        
    }
}