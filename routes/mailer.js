const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-2' })
sendMail = (sender, receiver, data,subject) => {
    const params = {
        Destination: {
            ToAddresses: receiver
        },
        Message: {
            Subject: {
                Data: subject,
                Charset: "UTF-8"
            }
            ,
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `<p><strong>Name:<\/strong> ${data.name}<\/p>\r\n    <p><strong>Email:<\/strong> <a href=\"mailto:${data.email}\">${data.email}<\/a><\/p>\r\n    <p><strong>Message:<\/strong> ${data.message}<\/p>\r\n`
                }
            }
        },

        Source: sender
    }
    const sendPromise = new AWS.SES().sendEmail(params).promise();
    return sendPromise
        .then(data => data)
        .catch(err => {
            throw new Error(err);
        })
}

module.exports = sendMail;