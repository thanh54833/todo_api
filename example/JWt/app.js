const express = require('express');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('./config.js');
let middleware = require('./middleware');


const StandardJson = require("./StandardJson")

var standardJson = new StandardJson()

standardJson.standardSuccess = true

console.log("data : " + standardJson.getJson)




class HandlerGenerator {
    login(req, res) {
        let username = req.body.username;
        let password = req.body.password;
        // For the given username fetch user from DB
        let mockedUsername = 'admin';
        let mockedPassword = 'password';

        if (username && password) {
            if (username === mockedUsername && password === mockedPassword) {
                let token = jwt.sign({ username: username },
                    config.secret,
                    {
                        expiresIn: '24h' // expires in 24 hours
                    }
                );
                // return the JWT token for the future API calls
                res.json({
                    success: true,
                    message: 'Authentication successful!',
                    token: token
                });
            } else {
                res.send(403).json({
                    success: false,
                    message: 'Incorrect username or password'
                });
            }
        } else {
            res.send(400).json({
                success: false,
                message: 'Authentication failed! Please check the request'
            });
        }
    }
    index(req, res) {
        res.json({
            success: true,
            message: 'Index page'
        });
    }
}



class Todo {
    getList(req, res) {
        var data = {
            thanh: "thanh", khong: "khong"
        }
        standardJson.standardSuccess = false

        console.log("data : " + standardJson.getJson);

        res.json(JSON.stringify(standardJson.getJson));
    }
}

standardJson.standardSuccess = false


// Starting point of the server
function main() {
    let app = express(); // Export app for other routes to use
    let handlers = new HandlerGenerator();
    const port = process.env.PORT || 8000;
    app.use(bodyParser.urlencoded({ // Middleware
        extended: true
    }));
    app.use(bodyParser.json());
    // Routes & Handlers
    app.post('/login', handlers.login);


    app.get('/', middleware.checkToken, handlers.index);


    var todo = new Todo();

    app.get('/todos', middleware.checkToken, todo.getList);


    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
}

main();