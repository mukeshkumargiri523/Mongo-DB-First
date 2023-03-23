const express = require("express");
const {
  getAllUsers,
  getSingleUserById,
  deleteUser,
  updateUser,
  createNewUser,
  subscriptionOfUser
} = require("../controllers/user-controller");
const { users } = require("../data/users.json");

const { UserModel, BookModel } = require("../models/model-index.js");
const router = express.Router();


/* 
>Route: /
>method:GET
>Description: Get all users
>Access: Public
>Parameter: None
 */

router.get("/",getAllUsers);
/* 
>Route: /users/:id
>method:GET
>Description: Get single user by their id
>Access: Public
>Parameter: id
 */
router.get("/:id", getSingleUserById);

/* 
>Route: /users
>method:POST
>Description: Create a new user
>Access: Public
>Parameter: None
 */
router.post("/", createNewUser);

/* 
>Route: /users/:id
>method:PUT
>Description: Update a user by its id
>Access: Public
>Parameter: Id
 */

router.put("/:id",updateUser);

/* 
>Route: /users/:id
>method:DELETE
>Description: delete a user by its id
>Access: Public
>Parameter: Id
 */

router.delete("/:id",deleteUser);

/* 
>Route: /users/subscription-details/:id
>method:GET
>Description: Get all user subscription details
>Access: Public
>Parameter: Id
 */
router.get("/subscription-details/:id",subscriptionOfUser);

module.exports = router;
