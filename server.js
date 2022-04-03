const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes/routers");

app.use(express.json());
app.use(cors({ origin: "http://127.0.0.1:5500" }));
app.use("/", router);

app.listen(3000, () => console.log("Listening to server at 3000"));
