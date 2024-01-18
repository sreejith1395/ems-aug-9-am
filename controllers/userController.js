const users=require('../Modals/userSchema')


// add user

exports.addUser=async(req,res)=>{
    console.log('inside add user function');

    const{fname,lname,email,mobile,gender,status,location}=req.body

    try{

        const preuser=await users.findOne({email})

        if(preuser){
            res.status(406).json("user already exists")
        }
        else{
            const newuser=new users({
                fname,lname,email,mobile,gender,status,profile:req.file.filename,location
            })
            await newuser.save()
            res.status(200).json(newuser)
        }
    }catch(err){
        res.status(401).json("Error"+err)
    }
}


// get user

exports.getallUsers=async(req,res)=>{
         const search=req.query.search

         const query={
            fname:{$regex:search,$options:"i"}
         }
    try{

        const allusers=await users.find(query)
        res.status(200).json(allusers)


    }catch(err){
        res.status(401).json(err)
    }
}


// delete user

exports.deleteUser=async(req,res)=>{
    // req id get

    const {id}=req.params
    try{

        const removeData=await users.findByIdAndDelete({_id:id})
        res.status(200).json(removeData)

    }catch(err){
        res.status(401).json(err)
    }
}


// edit user


exports.editUser=async(req,res)=>{
    const {id}=req.params
    const{fname,lname,email,mobile,gender,status,location,profile}=req.body

    const file=req.file?req.file.filename:profile
    try
    {
         const updateUser=await users.findByIdAndUpdate({_id:id},{
            fname,lname,email,mobile,gender,status, profile:file,location
         },{new:true})
         await updateUser.save()
         res.status(200).json(updateUser)

    }catch(err){
        res.status(401).json(err)
    }


}