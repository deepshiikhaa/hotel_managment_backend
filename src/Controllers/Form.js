const Form = require ("../models/Form")


exports.addForm = async (req,res) =>{
try {
    const _form = new Form(req.body);
    await _form.save()
res.status(201).json({message:"your form is submitted succesfully"})

} catch (error) {
    res.status(400).json({message:"Error Occurred"})
}



}