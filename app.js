const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    var fName = req.body.fName;
    var lName = req.body.lName;
    var email = req.body.email;
    
//    console.log(fName + lName + email);
    var data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    }
    
    var jsonData = JSON.stringify(data);
    
    var options = {
        url: "https://us20.api.mailchimp.com/3.0/lists/346347e843",
        method: "POST",
        headers: {
            "Authorization": "mukesh1 199e64e41ed3f0af8a9e01b85d0ac609-us20"
        },
        body: jsonData
        
    }
    
    request(options, function(error, response, body){
        if(error){
            console.log(error);
        } else{
            if(response.statusCode == 200){res.send("Signed up successfully! " + response.statusCode);}
            else{
                res.send("There was an error: " + response.statusCode);
            }
        }
    });
    
    
});

app.listen(process.env.PORT || port, function(){
           console.log("server running at " + port);
           });

//list id
//346347e843

//api key
//199e64e41ed3f0af8a9e01b85d0ac609-us20

