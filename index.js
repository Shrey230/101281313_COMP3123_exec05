const express = require('express');
const app = express();
const router = express.Router();

const fs = require("fs");
const path = require("path");

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req,res) => {
  res.sendFile("home.html",{root: __dirname});
});

/*
- Return all details from user.json file to client as JSON format
*/
let data = fs.readFileSync(path.resolve(__dirname, "user.json"));
let dataOfUser = JSON.parse(data);

router.get('/profile', (req,res) => {
  res.json(dataOfUser);
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.get('/login', (req, res) => {
    let username = req.query.username;
    let password = req.query.password;


    let data = fs.readFileSync(path.resolve(__dirname, "user.json"));
    let parsedData = JSON.parse(data);


    let storedUsername = parsedData.username;
    let storedPassword = parsedData.password;

    if(storedUsername === username && storedPassword === password) {
        res.json({
            status: true,
            message: "User Is valid",
        });
    }
    else if (storedUsername !== username) {
        res.json({
            status: false,
            message: "Username Invalid",
        });
    }
    else if (storedPassword !== password) {
        res.json({
            status: false,
            message: " Invalid Password",
        });
    } 
  
});


/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get("/logout/:username", (req,res) => {
    res.setHeader("Content", "text/html");
    res.send(`${req.params.username} Successfully logged out.`)  
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));