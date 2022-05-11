const router = require('express').Router()
const { response } = require('express')
const InventoryModel = require('./model/inventoryModel')

router.get('/', async function(req, res) {
    try {
        const dbResponse = await InventoryModel.getAllInventory()
        res.status(200).send(dbResponse)
    } catch (err) {
        response.status(400).send(err)
    }
})

router.get('/:inventoryId', async function(req, res) {
    try {
        const dbResponse = await InventoryModel.getInventoryById(req.params.inventoryId)
        if (!dbResponse) {
            res.status(404).send("No such inventory")
        } else {
            res.status(200).send(dbResponse)
        }
    } catch (err) {
        response.status(400).send(err)
    }
})

router.post('/', async function(req, res) {
    try {
        const {name, amount} = req.body
        const dbResponse = await InventoryModel.createInventory({
            name: name,
            amount: amount
        })
        res.status(200).send("Successfully created inventory: " + dbResponse.name)
    } catch (err) {
        response.status(400).send(err)
    }
})

router.put('/:inventoryId', async function(req, res) {
    try {
        const dbResponse = await InventoryModel.updateInventoryById(req.params.inventoryId, req.body)
        if (!dbResponse) {
            res.status(404).send("No such inventory")
        } else {
            res.status(200).send("Successfully updated inventory: " + dbResponse._id)
        }
    } catch (err) {
        response.status(400).send(err)
    }
})

router.delete('/:inventoryId', async function(req, res) {
    try {
        const dbResponse = await InventoryModel.deleteInventoryById(req.params.inventoryId)
        if (!dbResponse) {
            res.status(404).send("No such inventory")
        } else {
            res.status(200).send("Successfully deleted inventory: " + dbResponse._id)
        }
    } catch (err) {
        response.status(400).send(err)
    }
})

module.exports = router