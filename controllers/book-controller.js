const { UserModel, BookModel } = require("../models/model-index");
//const issuedBook=require("../dtos/book-dto");
const IssuedBook = require("../dtos/book-dto");

exports.getAllBooks=async(req,res)=>{
    const books=await BookModel.find();
    if(books.length===0){
        return res.status(404).json({
            success:false,
            message:"No book found"
        })
    }
    return res.status(200).json({
      success: true,
      data: books,
    });
};
exports.getBookByID= 
  async (req, res) => {
    const { id } = req.params;
    const book = await BookModel.findById(id);
    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "book doesn't exist" });
    }
    return res.status(200).json({
      success: true,
      message: "book found",
      data: book,
    });
  };

exports.getAllIssuedBooks = async (req, res) => {
  const user=await UserModel.find({
    issuedBook:{$exists:true}
  }).populate("issuedBook")
  const issuedBook=user.map((each)=>new IssuedBook(each))
  if (issuedBook.length === 0) {
    return res.status(404).json({
      success: false,
      message: "no books been issued",
    });
  }
  return res.status(200).json({
    success: true,
    message: "user with issued books",
    data: issuedBook,
  });
};

exports.addNewBook=async (req,res)=>{
    const {data}=req.body;

    if(!data){
        return res.status(400).json({
            success:false,
            message:"no data to add a book"
        })
    }
    await BookModel.create(data);
    const allBooks=await BookModel.find();
    return res.status(201).json({
        success:true,
        message:"Added book succesfully",
        data: allBooks
    })
};

exports.updatedBookById = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;


  const updatedBook = await BookModel.findOneAndUpdate(
    {
      _id: id,
    },
    data,
    {
      new: true,
    }
  );
  return res.status(200).json({
    success: true,
    message: "Updated a Book By Their Id",
    data: updatedBook,
  });
};

// or
// module.exports = (getAllBooks,getBookByID);
