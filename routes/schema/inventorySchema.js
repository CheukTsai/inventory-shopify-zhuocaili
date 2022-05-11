const Schema = require('mongoose').Schema

const InventorySchema = new Schema({
    name: String,
    amount: Number,
    isDeleted: {type: Boolean, default: false},
    deleteComment: {type: String, default: ""}
}, {
    timestamps: true,
    collection: 'Inventory'
})

module.exports = InventorySchema