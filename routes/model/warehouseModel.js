const mongoose = require('mongoose')
const WarehouseSchema = require('../schema/warehouseSchema')
const WarehouseModel = mongoose.model('Warehouse', WarehouseSchema)

function createWarehouse(warehouse) {
    return WarehouseModel.create(warehouse)
}

modeule.exports = {
    createWarehouse
}