const express = require('express')

const jwt = require('jsonwebtoken')
const app = express()


app.get('/api', (req, res) => {
    res.json({
        text: 'my api'
    })
})

app.post('/api/login', (req, res) => {
    const user = { id: 3 }
    const token = jwt.sign({ user }, 'my_secret_key',{expiresIn:'5h'})
    res.json({
        token: token
    })
})
app.get('/api/protected', ensurToken, (req, res) => {
    jwt.verify(req.token, 'my_secret_key', (err,data) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                text: 'this is protected',
                data: data
            })
        }
    })

})
function ensurToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        console.log(bearerToken);
        next();
    } else {
        res.sendStatus(403)
    }
}
app.listen(3000)


