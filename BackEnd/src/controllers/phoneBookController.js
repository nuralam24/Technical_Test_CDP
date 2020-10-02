const Joi = require('joi');
const Validator = require('../../config/validation');
const User = require('../models/phoneBookModel');

 
// Find All User
async function getAllUser(req, res) {
    try {
      const result = await User.find();
      if (result) {
        return res.status(200).json({
          message: "Get All User.",
          Profile: result,
        });
      } 
    }
    catch (err) {
      res.status(400).json(err);
    }
};


// Find user by mobile number
async function getUserByMobileNumber(req, res) {
    try {
        // validation check
        const validation = Joi.object(Validator.mobileValidation);
        const { error, value } = validation.validate(req.params, Validator.options);

        let LastEleven = value.mobileNumber.substring(value.mobileNumber.length - 11);

        if (error) res.json({ message: "Validation Error" });
        else {
            const result = await User.findOne({ mobileNumber: LastEleven })
            if (result) {
                return res.status(200).json({
                  message: "User Profile.",
                  Profile: result,
                });
            }
            else {
                return res.status(202).json({
                    message: "Contact not found!",
                });
            }
        }
    }
    catch (err) {
      res.status(400).json(err);
    }
};
 

// Create User 
async function createUser(req, res) {
    try {
        // validation check
        const validation = Joi.object(Validator.validation);
        const { error, value } = validation.validate(req.body, Validator.options);
        
        if (error) res.json({ message: "Validation Error" });
        else {
            const num = value.mobileNumber.substring(value.mobileNumber.length - 11)
            const DBNumber = await User.findOne({ mobileNumber: num });

            if (DBNumber) {
                res.status(202).json({
                   message: "Number is already use."
                });
            } else {
              const user = await new User(value);
              user.mobileNumber = value.mobileNumber.substring(
                value.mobileNumber.length - 11
              );
              const result = await user.save();
              if (result) {
                res.status(201).json({
                  message: "User Created Successfully",
                  userDetails: result,
                });
              }
            }
        }
    }
    catch (err) {
        res.status(400).json(err);
    } 
};


// Update User 
async function updateUser(req, res) {
    try {
      // validation check
      const validation = Joi.object(Validator.validation);
      const { error, value } = validation.validate(req.body, Validator.options);

      if (error) res.json({ message: "Validation Error" });
      else {
        const result = await User.findByIdAndUpdate({ _id: req.params.id }, { $set: {
            name: value.name,
            mobileNumber: value.mobileNumber.substring(value.mobileNumber.length - 11)}
        });
        if (result) {
          res.status(200).json({
            message: "Update user",
            name: value.name,
            mobileNumber: value.mobileNumber,
          });
        }
      }
    }
    catch (err) {
        res.status(400).json(err);
    }
};



// Delete User 
async function deleteUser(req, res) {
    try {
      const id = req.params.id;
      const result = await User.findByIdAndRemove({ _id: id });
      if (result) {
        res.status(204).json({
          message: "User delete Successfully.",
        });
      }
    }
    catch (err) {
      res.status(400).json(err);
    }
};



module.exports = {
    getAllUser,
    getUserByMobileNumber,
    createUser,
    updateUser,
    deleteUser
};   
