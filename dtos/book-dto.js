//data-transfer-object- book

class IssuedBook{
    _id;
    name;
    genre;
    price;
    publisher;
    issuedBy;
    issuedDate;
    returnDate;
    constructor(user){
        this._id=user.issuedBook._id;
        this.name = user.issuedBook.name;
        this.price = user.issuedBook.price;
        this.publisher = user.issuedBook.publisher;
        this.issuedBy = user.issuedBy;
        this.issuedDate = user.issuedDate;
        this.returnDate = user.returnDate;
}
}

module.exports=IssuedBook;

