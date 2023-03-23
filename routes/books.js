const express = require("express");
const {
  getAllBooks,
  getBookByID,
  getAllIssuedBooks,
  addNewBook,
  updatedBookById
} = require("../controllers/book-controller");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");


// const BookModel=require("../models/book-models")
// const UserModel = require("../models/user-models");
//or
const { UserModel, BookModel } = require("../models/model-index.js");

const router = express.Router();
/* 
>Route: /books/:id
>method:GET
>Description: Get a book by id
>Access: Public
>Parameter: id
 */
router.get("/:id", getBookByID);
/* 
>Route: /books
>method:GET
>Description: Get all books
>Access: Public
>Parameter: None
 */
router.get("/", getAllBooks);



/* 
>Route: /books/issued
>method:GET
>Description: Getting all issued books
>Access: Public
>Parameter: None
 */
router.get('/issued',getAllIssuedBooks)




/* 
>Route: /books
>method:POST
>Description: Adding a new books
>Access: Public
>Parameter: 
>data: id,name,author,genre,price,publishser
 */
router.post('/',addNewBook)





// router.post("/", (req, res) => {
//   const { id, name, author, genre, price, publisher } =
//     req.body;

//   const book = books.find((each) => each.id === id);
//   if (book) {
//     return res.status(404).json({
//       success: false,
//       message: "book with this ID exist",
//     });
//   }
//   books.push({
//     id,
//     name,
//     author,
//     genre,
//     price,
//     publisher,
//   });
//   return res.status(201).json({
//     success: true,
//     message: "book added successfully",
//     data: books,
//   });
// });
/* 
>Route:/updateBook/:id
>method:PUT
>Description: Updating a books
>Access: Public
>Parameter: id
>data: id,name,author,genre,price,publishser
 */
router.put("/updateBook/:id",updatedBookById)




module.exports = router;
