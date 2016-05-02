var express = require('express');
var app = express();

// Exercise 1
app.get('/hello', function (req, res) {
  res.send('<h1>Hello World!</h1>');
});

// Exercise 2
app.get('/hello/:name', function (request, response) {
  response.send('<h1>Hello '+ request.params.name + " !</h1>");
});

// Exercise 3

function add(num1, num2) {
  return parseInt(num1, 10) + parseInt(num2, 10);
}

function mult(num1, num2) {
  return parseInt(num1, 10) * parseInt(num2, 10);
}

function div(num1, num2) {
  return parseInt(num1, 10) / parseInt(num2, 10);
}

function sub(num1, num2) {
  return parseInt(num1, 10) - parseInt(num2, 10);
}

app.get('/calculator/:operation', function (request, response) {
  var num1 = request.query.num1;
  var num2 = request.query.num2;
  if (request.params.operation === "add") {
    response.send({
      operation: request.params.operation,
      firstNumber: num1,
      secondNumber: num2,
      total: JSON.stringify(add(num1, num2))
    });
  } else if (request.params.operation === "sub") {
    response.send({
      operation: request.params.operation,
      firstNumber: num1,
      secondNumber: num2,
      total: JSON.stringify(sub(num1, num2))
    });
  } else if (request.params.operation === "mult") {
    response.send({
      operation: request.params.operation,
      firstNumber: num1,
      secondNumber: num2,
      total: JSON.stringify(mult(num1, num2))
    });
  } else if (request.params.operation === "div") {
    response.send({
      operation: request.params.operation,
      firstNumber: num1,
      secondNumber: num2,
      total: JSON.stringify(div(num1, num2))
    });
  } else {
    response.status(400).send("<h1>Error 400: Bad request. Please enter a valid operation such as: add, sub, mult or div.</h1>");
  }
});

/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
