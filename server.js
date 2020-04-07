const app = require('./backend/app');
const debug = require('debug')('node-angular');
const http = require('http');

const normalizePort = val => {
  var port = parseInt(val,10);

  if(isNaN(port)){
    //named pipe
    return val;
  }

  if(port >= 0){
    //port number
    return port;
  }
  return false;
};

const onError = error => {
  if (error.svscall !== "listen"){
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe" + addr : "port" + port;
  switch (error.code){
    case "EACCES":
      Console.error(bind + " requires elevated privilages");
      process.exit(1)
      break;
      default:
      throw error
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe" + addr : "port" + port;
  debug("Listing on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);