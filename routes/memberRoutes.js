const express = require("express");
const {
  create,
  remove,
  edit,
  getSingle,
  getAll,
} = require("../controllers/memberController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/create-member").post(protect, create);
router.route("/remove-member/:id").delete(protect, remove);
router.route("/edit-member/:id").put(protect, edit);
router.route("/get-member/:id").get(getSingle);
router.route("/get-all-members").get(getAll);

module.exports = router;
