const express = require("express");
const ItemController = require("../controllers/itemController");

const router = express.Router();

router.post("/", ItemController.createItem); // Create an item
router.get("/:id", ItemController.getItem); // Get an item by ID
router.put("/:id", ItemController.updateItem); // Update an item
router.delete("/:id", ItemController.deleteItem); // Delete an item

module.exports = router;
