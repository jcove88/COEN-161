const fs = require('fs');

exports.handleTodoList = function(req, res, session) {
  switch(req.method) {  //check the request method to handle incoming GET and POST requests
    case "GET":
      fs.readFile("./sessions/" + session.id, (err, data) => {
        if(err){
          session.todoList = [];
        }
        else{
          session.todoList = JSON.parse(data).todoList; //need to convert it from string to an object
        }
        if(session.todoList == undefined ||session.todoList.length === 0){  //if error or empty just continue as if list is empty
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify([]));  
        }
        else { // if the list isn't empty, need to traverse it and update session to include the todoList from file
          let tempList = [];
          for (let i = 0; i < session.todoList.length; i++) {
            tempList.push({id: i, description: session.todoList[i]});
          }
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify(tempList));  
        }
      });
      break;
    case "POST":
      if (session.todoList == undefined) { //initialize the todoList if it's not already
        session.todoList = [];
      }
      convertRequest(req, data => { //push data to the todoList
        session.todoList.push(data.todo);
        fs.writeFile(`./sessions/${session.id}`, JSON.stringify(session), err => {
          if (err) {
            res.writeHead(500, {'Content-Type': 'text/html'});
            return res.end("500 Internal Server Error");
          }
          res.writeHead(200, 'OK'); //end request
          res.end();
        });
      });
      break;
    default:
      res.writeHead(405, {'Allow': 'GET, POST'});
      res.end("Not Allowed");
  }
};

/*
  converts the HTTP POST request body into a JSON object
*/
function convertRequest(req, callback) {
  let data = "";
  req.on('data', chunk => {
    data += chunk.toString();
  });
  req.on('end', () => {
    callback(JSON.parse(data));
  });
}