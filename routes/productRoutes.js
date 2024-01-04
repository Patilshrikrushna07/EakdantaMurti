const express = require("express");
const {
  create,
  remove,
  edit,
  getSingle,
  getAll,
} = require("../controllers/productController");

const router = express.Router();

router.route("/create-product").post(create);
router.route("/remove-product/:id").delete(remove);
router.route("/edit-product/:id").put(edit);
router.route("/get-product/:id").get(getSingle);
router.route("/get-all-products").get(getAll);

module.exports = router;
