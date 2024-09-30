const CommunicationController = require("../controllers/CommunicationController");
const router = require("express").Router();

router.post("/logs/user", CommunicationController.fetchLogsByUser);
router.post("/logs/user/create", CommunicationController.CreateLogsByUser);
router.delete("/logs/user/:id", CommunicationController.DeleteAllLogsByUser);

module.exports = router;