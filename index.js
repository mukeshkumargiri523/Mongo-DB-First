const express = require("express");
const dotenv=require("dotenv")

const DBConnection=require("./databaseConnection")

const usersRouter = require("./routes/users.js");
const booksRouter = require("./routes/books.js");

dotenv.config();

const app = express();
DBConnection();

const PORT = 8000;
app.use(express.json());

http: app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is up and running", data: "hey" });
});
app.use("/users", usersRouter);
app.use("/books", booksRouter);


app.get("*", (req, res) => {
  res.status(404).json({ message: "This route does not exist" });
});
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
