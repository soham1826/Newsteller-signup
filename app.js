const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { dirname } = require("path");

const app = express();

app.use(express.static("public"));// now change the links of files given in html  relative to the public foilder

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")

})

app.post("/",function(req,res){
    const firstName = req.body.fName ;
    const lastName = req.body.lName ;
    const email = req.body.Email ;
    const data = {
        members: [
            {
                email_address: email,
                status:"subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastName,



                }
            }
        ]

    };
    const jsonData = JSON.stringify(data);
    const url = "https://us9.api.mailchimp.com/3.0/lists/7293c4424d";
    const options = {
        method:"POST",
        auth: "soham1:ffc0a0c218213a9a9bbc0b16df47d0f5-us9"
    }
    const request = https.request(url,options,function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        }else{
            res.sendFile(__dirname + "/failure.html")
        }


        response.on("data",function(data){
            console.log(JSON.parse(data))
        })

    })

    request.write(jsonData);
    request.end();




});

app.post("/failure",function(req,res){
    res.redirect("/");
})



app.listen(process.env.PORT|| 3000,function(){
    console.log("server is running at port 3000")
})


// api key
// ffc0a0c218213a9a9bbc0b16df47d0f5-us9
// audiance ID
// 7293c4424d