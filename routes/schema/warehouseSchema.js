const Schema = require('mongoose').Schema

const WarehouseSchema = new Schema({
    name: String,
    location: String,
    amount: Number,
    inventoryCollection: [Schema.Types.ObjectId]
}, {
    timestamps: true,
    collection: 'Warehouse'
})

module.exports = WarehouseSchema