const express = require("express")

const mailer = require("./routes/mailer")
const AWS = require("aws-sdk")

const app = express()
app.use(express.json())

//Routes
//Post API
app.post('/api/contact', (req, res, next) => {
    const { name, email, message, subject } = req.body
    return mailer.sendMail({
        Source: 'sau.manu07@gmail.com',
        Destination: email,
        data: { name: name, email: email, message: message },
        Subject: subject
    })
        .then(() => res.send(req.body))
        .catch(next)
})

const port = process.env.port || 5000;
AWS.config.update({ region:'us-east-2'})
app.listen(port, () => console.log(`Server started on PORT ${port}`));