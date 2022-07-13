const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");

const { Server } = require("socket.io");

require("dotenv").config();
const port = process.env.API_PORT || 5001;

// configuration of cors
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

require("./server/database")
  .connect()
  .then(async (data) => {
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/static", express.static("./index.html"));

    app.use("/static", express.static("./src/user"));

    app.use(require("./routes/"));
  })
  .catch((error) => {
    console.log(error, "Error");
  });

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let { getAllUsers } = require("./controller/C_users");

io.on("connection", (socket) => {
  // console.log("socket connected", socket.id);
  socket.on("ontest", (msg) => {
    console.log(msg, "msg");
    io.emit("emittest", msg);
  });

  // get all users.
  socket.on("getAllUsers", async () => {
    try {
      let resData = await getAllUsers();
      // console.log(resData, "resData");
    } catch (error) {
      console.log(error.message);
    }
  });
});

server.listen(port, () => console.log(`Server app listening on port: ${port}`));
