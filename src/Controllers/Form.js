const Form = require ("../models/Form")


exports.addForm = async (req,res,next) =>{
try {
    const _form = new Form(req.body);
    await _form.save()
    req.subject = "User Registration"
    req.text = "Signed up Successfully"
    next()

} catch (error) {
    res.status(400).json({message:"Error Occurred"})
}



}