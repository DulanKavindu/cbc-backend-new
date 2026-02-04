import axios from "axios";
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
                    token:token,
                    user:{
                        email : firstUserOfList.email,
                        firstname : firstUserOfList.firstname,
                        lastname : firstUserOfList.lastname,
                       
                        type    : firstUserOfList.type,
                        profilepic:firstUserOfList.profilepic
                    }
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

export async function googleLogin(req, res) {
    const token = req.body.token;

    try {
        
        const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const { email, name, picture } = response.data;

        let user = await User.findOne({ email: email });

        if (!user) {
         
            user = new User({
                email: email,
                firstName: name,
                profilePicture: picture,
                type: "customer"
            });
            await user.save();
        }

      
        const ourToken = jwt.sign(
            { email: user.email, type: user.type, id: user._id },
            process.env.JWT_KEY, 
            { expiresIn: "24h" }
        );

  
        res.json({
            message: "Login Successful",
            token: ourToken,
            user: user
        });

    } catch (err) {
        
        console.error(err);
        res.status(500).json({
            message: "Google Login Failed",
            error: err.message
        });
    }
}
  
// "email": "admin@system1.com", "password": "admin@123"
// 
// "email": "admin@system5.com", "password": "admin@123" -customer