const express = require("express");
const { create, remove, edit, getSingle, getAll } = require("../controllers/memberController");

const router = express.Router();

router.route("/create-member").post(create);
router.route("/remove-member/:id").delete(remove);
router.route("/edit-member/:id").put(edit);
router.route("/get-member/:id").get(getSingle);
router.route("/get-all-members").get(getAll);

module.exports = router;
