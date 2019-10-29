const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: '421801719@qq.com', // generated ethereal user
        pass: 'jrleoywkavvmcafb' // generated ethereal password
    }
});



function send(mail, code) {

    let info = {
        from: '<421801719@qq.com>', // sender address
        to: mail, // list of receivers
        subject: '验证码', // Subject line
        text: `您的验证码是${code},有效期五分钟`, // plain text body
        // html: '<b>Hello world?</b>' // html body
    }

    return new Promise((resolve, reject) => {
        transporter.sendMail(info, (err, data) => {
            if (err) {
                reject()
            }
            resolve()
        });
    })

}

module.exports = { send }