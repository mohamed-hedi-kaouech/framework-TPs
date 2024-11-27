const express = require('express')

const user=require('../models/User')

const router = express.Router()

const {
    getusers,
    createuser,
    deletetuser,
    updateuser
}=require("../controllers/user_controller")


router.get('/',getusers)

router.post('/',createuser)

router.delete('/:id',deletetuser)

router.patch('/:id',updateuser)

module.exports = router