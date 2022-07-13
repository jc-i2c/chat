const router = require("express").Router();

const { addUsers, deleteUsers } = require("./../controller/C_users");

router.post("/adduser", addUsers);
router.delete("/deleteuser", deleteUsers);

module.exports = router;
