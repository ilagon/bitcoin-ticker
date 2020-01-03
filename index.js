const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    //console.log(req.body.crypto + "/" + req.body.fiat);
    let crypto = req.body.crypto;
    let fiat = req.body.fiat;
    let amount = req.body.amount;

    //Request module function
    let options = {
        url: "https://apiv2.bitcoinaverage.com/convert/global",
        method: "GET",
        qs: {
            from: crypto,
            to: fiat,
            amount: amount
        }
    }

    request(options, (error, response, body) => {
        let data = JSON.parse(body);
        let price = data.price;
        let currentDate = data.time;

        res.write(`<p>As of ${currentDate}</p>`);

        res.write(`<h1>The price of ${amount} ${crypto} in ${fiat} is currently ${price}</h1>`);

        res.send();
    });
    
})



app.listen(3000, () => console.log("Server running at port 3000"));


