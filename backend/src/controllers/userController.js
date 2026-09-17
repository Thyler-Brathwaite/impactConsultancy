import User from "../models/User.js"
export async function getUser(req,res){

     
    try{
        
        const founduser = await User.findById(req.params.id)
        if(!founduser){
            return res.status(404).json({message:"Error in getAppointment"})
        }
        res.status(200).json({message:"User successfully found"})
    }catch(error){
        res.status(500).json({message:"error with the server"})
    }
    
    
}

export async function getUsers(req,res){

    try{
        const users = await User.find()
        
        res.status(200).json(users)
    }
    catch(error){
        res.status(500).json({message:"error with the server"})
    }
    
}

export async function makeUser(req,res){
    try{
        const {firstName, lastName, email, phone } = req.body
        const user = new User({firstName, lastName, email, phone })
        const savedUser =  await user.save();
        res.status(201).json(savedUser)

    }
    catch{
        res.status(500).json({message:"error with the server"})
    }
    
}

export async function updateUser(req,res){
    try{
        const  {firstName, lastName, email, phone } = req.body
        const updateUser = await User.findByIdAndUpdate(req.params.id, {firstName, lastName, email, phone });
        if(!updateUser){
            return res.status(404).error("User not found")
        }
        res.status(200).json({message:"user successfully updated"})
    }
    catch(error){
        res.status(500).json({message:"error with the server"})
    }
    
}

export async function deleteUser(req,res){
    try{
        
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        if(!deletedUser){
            return res.status(404).error("User not found")
        }
        res.status(200).json({message:"user successfully deleted"})
    }
    catch(error){
        res.status(500).json({message:"error with the server"})
    }
}