const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});




app.post("/", function(req,res){
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  var finalURL = baseURL+crypto+fiat;

request(finalURL,function(error, response, body){

  var data = JSON.parse(body);
  var price = data.last;
  const currentDate = data.display_timestamp;
  res.write("<h1>the current date is "+currentDate+"</h1>");
  res.write("<h1> The current price of "+ crypto+ "is"+ price + fiat+"</h1>");
});

});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
