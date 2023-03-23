const { UserModel, BookModel } = require("../models/model-index");
const { find } = require("../models/user-models");
exports.getAllUsers = async (req, res) => {
    const users=await UserModel.find()
    if(users===0){
        res.status(404).json({
            success:false,
            message:"No user found in the DB"
        })
    }
  res.status(200).json({ success: true,message:"These are the user info", data: users });
};
//_id is an id given by MongoDB
exports.getSingleUserById = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById({_id:id})
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "user doesn't exist" });
  } else {
    return res.status(200).json({
      success: true,
      message: "user found",
      data: user,
    });
  }
};

exports.createNewUser = async (req, res) => {
  const { id, name, surname, email, issuedBook, subscriptionType, subscriptionDate } =
    req.body;
  const NewUser = await UserModel.create({
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });
  return res.status(201).json({
    success: true,
    message: "user added successfully",
    data: NewUser,
  });
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;

  const { data } = req.body;

  const updateUserData = await UserModel.findOneAndUpdate(
    { _id: id },
    { $set: { ...data }, },
    { new: true }
  );
  
  return res.status(200).json({
    success: true,
    message: "User data Updated",
    data: updateUserData,
  });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.deleteOne({_id:id})
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "user doesn't exist" });
  }
  return res
    .status(200)
    .json({ success: true, message: "Deleting user", data: users });
};



exports.subscriptionOfUser = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id)

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user with this id didn't found",
    });
  }

  const getDatebydays = (data = "") => {
    let date;
    if (data === "") {
      date = new Date();
    } else {
      date = new Date(data);
    }
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };

  const subscriptionType = (date) => {
    if ((user.subscriptionType = "Basic")) {
      date = date + 90;
    } else if ((user.subscriptionType = "Standard")) {
      date = date + 180;
    } else if ((user.subscriptionType = "Premium")) {
      date = date + 365;
    }
    return date;
  };

  let returnDate = getDatebydays(user.returnDate);
  let currentDate = getDatebydays();
  let subscriptionDate = getDatebydays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);

  const data = {
    ...user,
    isSubscriptionExpired: subscriptionExpiration < currentDate,
    daysLeftForExpiration:
      subscriptionExpiration <= currentDate
        ? 0
        : subscriptionExpiration - currentDate,
    fine:
      returnDate < currentDate
        ? subscriptionExpiration <= currentDate
          ? 100
          : 50
        : 0,
  };

  return res.status(200).json({
    success: true,
    message: "Subscription detail for the user is: ",
    data,
  });
};