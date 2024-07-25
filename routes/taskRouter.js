const express = require('express')

const {createTask,getAllTask,getAtask,updateTask,deleteAtask,updatesStatus,authorizeUser}= require('../controller/taskController')

const router = express.Router()

router.post('/',authorizeUser,createTask)

router.patch('/:id',updatesStatus)

router.get('/',authorizeUser,getAllTask)

router.get('/:id',getAtask)

router.put('/:id',authorizeUser,updateTask)

router.delete('/:id',deleteAtask)


module.exports = router