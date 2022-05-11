const mongoose = require('mongoose')
const InventorySchema = require('../schema/inventorySchema')
const InventoryModel = mongoose.model('Inventory', InventorySchema)

function createInventory(Inventory) {
    return InventoryModel.create(Inventory);
}

function getInventoryById(inventoryId) {
    return InventoryModel.findById(inventoryId).exec();
}

function getAllInventory() {
    return InventoryModel.find().sort({updatedAt: 'desc'}).exec();
}

function updateInventoryById(inventoryId, updateData) {
    return InventoryModel.findByIdAndUpdate(inventoryId, updateData).exec();
}

function updateInventoryById(inventoryId, updateData) {
    return InventoryModel.findByIdAndUpdate(inventoryId, updateData).exec();
}

function deleteInventoryById(inventoryId) {
    return InventoryModel.findByIdAndDelete(inventoryId).exec();
}

module.exports = {
    createInventory,
    getInventoryById,
    getAllInventory,
    updateInventoryById,
    deleteInventoryById
}