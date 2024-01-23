const User = require("../models/User")
const jwt = require("jsonwebtoken")



const user = require("../models/User")


exports.register = async (req,res,next) => {

   


const {name,phone,email, password} = req.body 
console.log(req.body)

    const _user = new user( {
        name,email,phone, password
    })
    const eUser = await user.findOne({
        email
    })
    if(!eUser){
        _user.save().then(newUser=>{
           req.subject = "User Registration"
           req.text = "Signed up Successfully"
           next()
        }).
        catch(error=> {
         return  res.status(400).json
            ({message:"Error occured",
        error})
    
            })
    
} else {
   return res
    .status(400).json({
        message:"User Already Exist"
    })
}
}
exports. login = async (req,res)=> {


    const { email, password}=req.body

    
    const eUser = await User.findOne({
        email
    })

if(eUser){

    if (eUser.authenticate(password)) {
        const token = jwt.sign({ 
          id: eUser._id
        },"MyAPPSECRET",
        { expiresIn: "24h" 
    })
        return res.status(200).json({
            message:"Login success",token,isSuccess:true
            
        })
       

    }else{
        return res.status(401).json
        ({
            message:"password incorrect"
        })

    }
}else{
    return res.status(404).json
    ({message:"User Not found please signup"})
}



}

exports.findUser = async (req,res) =>{
    const user = await user.findById(req.id)
    return res.status(200).json({user})
}
