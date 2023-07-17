const nodemailer = require('../config/nodemailer');

exports.query = function(user, query_mail){

    let htmlString = nodemailer.renderTemplate({user: user, query_mail: query_mail}, '/contacts/query.ejs');

    console.log(user.email),

    nodemailer.transporter.sendMail({
        from: user.email,
        to: 'dharmeshkota123@gmail.com',
        subject: 'Query in Ds BLOG Projects',
        html: htmlString
    }, (err, info) => {
        if(err){
            console.log('Error while sending the Mail! ', err);
            return;
        }

        console.log('Link Sent!');
    });

}