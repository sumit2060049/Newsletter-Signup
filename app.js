const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const https =require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const { response } = require("express");


const app=express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
    //console.log(res.send("helloo"));
})

//Setting up MailChimp
mailchimp.setConfig({
    //*****************************ENTER YOUR API KEY HERE******************************
     apiKey: "8ebdb209d33d7b19ae8e48bdf821868a-us21",
    //*****************************ENTER YOUR API KEY PREFIX HERE i.e.THE SERVER******************************
     server: "us21"
    });

app.post("/",function(req,res){
     const firstName=req.body.fName;
     const lastName=req.body.lName;
     const email=req.body.email;

     const listid="4076419ff4";

     const subscribingUser = {
        firstName: firstName,
        lastName: lastName,
        email: email
       };

       async function run() {
        const response = await mailchimp.lists.addListMember(listid, {
         email_address: subscribingUser.email,
         status: "subscribed",
         merge_fields: {
         FNAME: subscribingUser.firstName,
         LNAME: subscribingUser.lastName
        }
        });
        res.sendFile(__dirname + "/success.html")
        console.log(
       `Successfully added contact as an audience member. The contact's id is ${
        response.id
        }.`
       );
       }

       run().catch(e => res.sendFile(__dirname + "/failure.html"));
    });

    app.post("/failure",function(req,res){
        res.redirect("/");
    })

    //  const data={
    //     members:[
    //         {
    //             email_address:email,
    //             statur:"subsscribed",
    //             merge_fields:{
    //                 FNAME: firstName,
    //                 LNAME:lastName
    //             }
    //         }
    //     ]
    // };

//     const jsonData=JSON.stringify(data);

//     //request
//     const url="https://us21.api.mailchimp.com/3.0/list/4076419ff4";

//     const options={
//         method:"POST",
//         auth :"sumit:8ebdb209d33d7b19ae8e48bdf821868a-us21"
//     }

//     const request = https.request(url,options,function(response){
    // if(response.statusCode===200){
    //     res.send("successfully subscribed");
    // }else{
    //     res.send("there was an error with the signing up")
    // }
//         response.on("data",function(data){
//             console.log(JSON.parse(data));
//         })
//     })
//     request.write(jsonData);
//     //console.log(firstName, lastName, email);

// })

app.listen(process.env.PORT || 3000,function(){
    console.log("server is running in port 3000");
})

// api key

// 8ebdb209d33d7b19ae8e48bdf821868a-us21

//Audience id
//Some plugins and integrations may request your Audience ID.

//Typically, this is what they want: 4076419ff4.

//youtube link


//https://www.youtube.com/watch?v=Xkp1ZFnibfU&ab_channel=Bizix