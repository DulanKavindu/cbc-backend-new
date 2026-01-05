import User from "../models/user.js";
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";

export function addUser(req, res) {
    const newData= req.body;
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

                }, "secretkey-7030",)
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
 