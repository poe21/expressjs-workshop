var express = require('express');
var mysql = require('mysql');
var app = express();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'poe211',
  password : '',
  database: 'reddit'
});

// Exercise 1
app.get('/hello', function (req, res) {
  res.send('<h1>Hello World!</h1>');
});

// Exercise 2
app.get('/hello/:name', function (request, response) {
  response.send('<h1>Hello '+ request.params.name + " !</h1>");
});

// Exercise 3

function operation(op, num1, num2) {
  if (op === "add") {
    return num1 + num2;
  } else if (op === "sub") {
    return num1 - num2;
  } else if (op === "mult") {
    return num1 * num2;
  } else if (op === "div") {
    return num1 / num2;
  }
}

app.get('/calculator/:operation', function (request, response) {
  var op = request.params.operation;
  var num1 = parseInt(request.query.num1, 10);
  var num2 = parseInt(request.query.num2, 10);
  if (op === "add" || op === "sub" || op === "mult" || op === "div") {
    response.send(JSON.stringify({
      operation: request.params.operation,
      firstNumber: Number(num1),
      secondNumber: Number(num2),
      total: operation(op, num1, num2)
    }));
  } else {
    response.status(400).send("<h1>Error 400: Bad request. Please enter a valid operation such as: add, sub, mult or div.</h1>");
  }
});

// Exercise 4

function getHomepage(callback) {
  connection.query(`SELECT posts.id, posts. title, posts.url, posts.createdAt, posts.userId, 
    users.username FROM posts JOIN users ON posts.userId=users.id ORDER BY createdAt DESC LIMIT 5`
    , function(err, res) {
    if (err) {
      callback(err);
    }
    else {
      callback(null, res);
    }
  });
}

app.get('/posts', function(request, response) {
  getHomepage(function(err, posts) {
    if (err) {
      response.status(500).send('oops try again later!');
    } else {
      var allPosts = posts.map(function(post) {
        return `
          <li class="content-item">
            <h2 class="content-item__title">
              <a href="${post.url}">${post.title}</a>
            </h2>
            <p>Created by ${post.username}</p>
          </li>`;
      });
      
      response.send(`
        <div id="contents">
          <h1>List of contents</h1>
          <ul class="contents-list">
            ${allPosts.join('')}
          </ul>
        </div>
      `);
    }
  });
});

/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
