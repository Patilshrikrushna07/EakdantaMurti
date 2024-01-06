const express = require("express");
const {
  create,
  remove,
  edit,
  getSingle,
  getAll,
} = require("../controllers/productController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/create-product").post(protect, create);
router.route("/remove-product/:id").delete(protect, remove);
router.route("/edit-product/:id").put(protect, edit);
router.route("/get-product/:id").get(getSingle);
router.route("/get-all-products").get(getAll);

module.exports = router;
