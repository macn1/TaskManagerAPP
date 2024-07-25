
const jwt = require('jsonwebtoken')
const Task = require('../model/taskModel')
const { ObjectId } = require('mongodb');




const authorizeUser = (req, res, next) => {
    console.log(req.header('Authorization'));
    const token = req.header('Authorization')?.replace('Bearer ', '');

  
    if (!token) {
      return res.status(401).send({ error: 'Access denied. No token provided.' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.secretKey);
      req.user = decoded;
      next();
    } catch (err) {
        console.log(err,"dsd");
      res.status(400).send({ error: 'Invalid token.' });
    }
  };

const createTask = async(req,res)=>{

    try {
        

        const {title,description}= req.body


        const userId= new ObjectId(req.user.id);

        const token = req.body.token

      
        const task =  new Task({title,description,userId:userId})

            await task.save()
    
            res.status(201).json({messsage:'Task created',data:task})

        // console.log(userId,"wdsds");
       

    } catch (error) {

        console.log(error);

        res.status(500).json({error:error.messsage})

        
    }
}
const getAllTask = async(req,res)=>{

    try {
        
          const id =  new ObjectId(req.user.id) 
        //   console.log(id);
        const task = await Task.find({userId:id})

        // console.log(task);
        if (!task) {
            return res.status(404).send({ message: 'Tasks not found' });
          }
      
        res.status(200).json({status:'sucess',totalTasks:task.length,data:task})


    } catch (error) {

        res.status(500).json({error:error.messsage})

        
    }
}
const getAtask = async(req,res)=>{

    try {
        
      const id=req.params.id
        const task = await Task.findById(id)

        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
          }
      
        res.status(200).json({status:'sucess',data:task})


    } catch (error) {

        res.status(500).json({error:error.messsage})

        
    }
}
const updateTask = async(req,res)=>{

    try {
        
       
      const id=req.params.id
      console.log(id);
      const {title,description,status}= req.body

      const task = await Task.findByIdAndUpdate(id,{title,description,status},{new:true})
      console.log(task,"df",id);

    
        res.status(200).json({status:'sucess',updatedTask:task})


    } catch (error) {

        res.status(500).json({error:error.messsage})

        
    }
}


const updatesStatus = async(req,res)=>{

    try {
        
      const id=req.params.id

      const {status}= req.body
      console.log(status,"status");

      const task = await Task.findById(id)

      console.log(task,"");
      task.status=req.body.status

      console.log(req.params.id,"ddwd");

      await task.save()



    
        res.status(200).json({status:'sucess',updatedTask:task})


    } catch (error) {

        console.log(error);

        res.status(500).json({error:error.messsage})

        
    }
}

const deleteAtask = async(req,res)=>{

    try {

        
      const id= req.params.id
        const task = await Task.findByIdAndDelete(id)

        if (!task) {
            return res.status(404).send({ message: 'Task not found' });
          }
      
        res.status(200).json({status:'task deleted'})


    } catch (error) {

        console.log(error,"err");

        res.status(500).json({error:error.messsage})

        
    }
}

module.exports={createTask,getAllTask,getAtask,updateTask,deleteAtask,updatesStatus,authorizeUser}