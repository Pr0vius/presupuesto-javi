const { Router } = require("express");
const { getAllUsers, getUser, updateUser } = require("../controllers/user");
const {
  getAllUsersValidations,
  getUserValidations,
  updateUserValidations,
} = require("../middlewares/validations/user");
const router = Router();

router.get("/", getAllUsersValidations, getAllUsers);
router
  .route("/:userId")
  .get(getUserValidations, getUser)
  .put(updateUserValidations, updateUser);

module.exports = router;
