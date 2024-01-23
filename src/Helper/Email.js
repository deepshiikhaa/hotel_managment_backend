const nodemailer = require ("nodemailer")

exports.sendEmail =(req,res)=>{
    try {
        const transport = nodemailer.createTransport(
            {
                service:"gmail",
                host:"smtp.gmail.com",
                port:465,
                auth:{
                    user:"deepshikhaoct18@gmail.com",
                    pass:"pikj yvfi qehr ukfs"
                }

            }
        )
        const data ={
            from:"deepshikhaoct18@gmail.com",
            to:req.body.email,
            subject:req.text,
            text:req.text
        }
        transport.sendMail(data,(error,info)=>{
            if(error){
                console.log(error);
                res.status(400).json({message:"Email Delivery Error"})
            }else{
                console.log(info);
                res.status(201).json({message:"Success"})
            
            }

        })



    } catch(error) {
        return  res.status(400).json
           ({message:"Error occured",
       error})
   
    }
        
    }

