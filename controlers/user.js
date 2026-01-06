import User from "../models/user.js";
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";

export function addUser(req, res) {
    const newData= req.body;
    if(newData.type=="admin"){
        if(req.user==null){
            res.json({
                massage:"first you have to Login"
        })
        return
    }
        if(req.user.type!="admin"){
            res.json({
                massage:"only admin can create another admin"
        })
        return
        }

    }
    newData.password= bcrypt.hashSync(newData.password, 10);
    const newUser = new User (newData);

    newUser.save().then(()=>{
        res.json({
            massage:"user created"
        })
    }).catch(()=>{
        res.json({
            massage:"user not created"
        })
    })

}

export function loginUser(req,res){
    User.find({email:req.body.email }).then((list)=>{
        if(list.length == 0)
        {
            res.json({
                massage:"user not found"
            })
        }else{
            const firstUserOfList= list[0];
            const checkPassword=bcrypt.compareSync(req.body.password, firstUserOfList.password);
            if(checkPassword){
                const token=jwt.sign({
                  email : firstUserOfList.email,
                  firstname : firstUserOfList.firstname,
                  lastname :firstUserOfList.lastname,
                  isBlocked :firstUserOfList.isBlocked,
                  type    :firstUserOfList.type,
                  profilepic:firstUserOfList.profilepic

                }, process.env.SECRET_KEY,)
                res.json({
                    massage:"login successful",
                    token:token
                })

            }else{
                res.json({
                    massage:"incorrect password"
                })
        }
            
            
            
      
        }
    })
}
 export function deleteUser(req,res){
    User.deleteOne({email :req.body.email}).then(()=>{
        res.json({
            massage:"user deleted"
        })
    })
 }

 export function isAdmin(req,res){
    if(req.user==null){
        return false
    }
    if(req.user.type!="admin")
    {
        return false
    }
    return true

 }
 export function isCustomer(req,res){
    if(req.user==null){
        return false
    }
    if(req.user.type!="customer")
    {
        return false
    }
    return true

 }

  
// "email": "admin@system1.com", "password": "admin@123"
// 
// "email": "admin@system5.com", "password": "admin@123" -customer