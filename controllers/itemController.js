const ItemModel = require("../models/itemModel");

class ItemController {
  static async createItem(req, res) {
    const { id, name } = req.body;
    try {
      await ItemModel.createItem(id, name);
      res.status(201).json({ message: "Item created successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getItem(req, res) {
    const { id } = req.params;
    try {
      const result = await ItemModel.getItem(id);
      if (!result.Item)
        return res.status(404).json({ message: "Item not found" });
      res.status(200).json(result.Item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateItem(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const result = await ItemModel.updateItem(id, name);
      res
        .status(200)
        .json({
          message: "Item updated successfully",
          updatedAttributes: result.Attributes,
        });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteItem(req, res) {
    const { id } = req.params;
    try {
      await ItemModel.deleteItem(id);
      res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ItemController;
