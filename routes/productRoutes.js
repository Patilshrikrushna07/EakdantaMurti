const express = require("express");
const {
  create,
  remove,
  edit,
  getSingle,
  getAll,
} = require("../controllers/productController");
const {protect,adminProtect} = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/create-product").post(adminProtect, create);
router.route("/remove-product/:id").delete(adminProtect, remove);
router.route("/edit-product/:id").post(adminProtect, edit);
router.route("/get-product/:id").get(getSingle);
router.route("/get-all-products").get(getAll);

module.exports = router;
