const express = require("express");
const { login, register,getSingle,edit,getAll } = require("../controllers/userController");
const {protect,adminProtect} =require("../middlewares/authMiddleware")
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/get-user-details/:id").get(protect,getSingle);
router.route("/edit-profile-details/:id").post(protect,edit);
router.route("/get-all-users").get(adminProtect,getAll);

module.exports = router;
