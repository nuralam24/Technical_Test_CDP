const Joi = require('joi');
const Validator = require('../../config/validation');
const User = require('../models/phoneBookModel');

 
// Find All 
const getAllUser = (req, res) => {
    User.find()
        .then(result => {
            return res.status(200).json({
                message: "Get All User.",
                Profile: result
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Error, Please try again.", 
                error: err.message,
            });
        });
};


// Find user by mobile number
const getUserByMobileNumber = (req, res) => {
  const validation = Joi.object(Validator.mobileValidation);
  const { error, value } = validation.validate(req.params, Validator.options);

  let LastEleven = value.mobileNumber.substring(value.mobileNumber.length - 11);
  //console.log('LastEleven = ', LastEleven);
  if (error) res.json({ message: "Validation Error" });
  else {
    User.findOne({ mobileNumber: LastEleven })
        .then((result) => {
            if (result) {
              return res.status(200).json({
                message: "User Profile.",
                Profile: result,
              });
            }
            return res.status(202).json({
              message: "Contact not found!"
            }); 
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error, Please try again.",
          error: err.message
        });
      });
  }
};


// Create User 
async function createUser(req, res) {
    try {
        const validation = Joi.object(Validator.validation);
        const { error, value } = validation.validate(req.body, Validator.options);

        if (error) res.json({ message: "Validation Error" });
        else {
            const user = await new User(value);
            user.mobileNumber = value.mobileNumber.substring(value.mobileNumber.length - 11);
            //console.log('user = ', user);
            user.save().then(result => {
                res.status(201).json({
                  message: "User Created Successfully",
                  userDetails: result
                });
              })
              .catch((err) => {
                res.status(401).json(err);
              });
        }
    }
    catch (err) {
        res.status(400).json(err);
    }
};


// Update User 
const updateUser = (req, res) => {
    const validation = Joi.object(Validator.validation);
    const { error, value } = validation.validate(req.body, Validator.options);

    if (error) res.json({ message: "Validation Error" });
    else {
        console.log('ID = ', req.params.id);
        User.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                'name': value.name,
                'mobileNumber': value.mobileNumber.substring(value.mobileNumber.length - 11)
            }
        }).exec().then(() => {
            res.status(200).json({
                message: "Update user",
                name: value.name,
                mobileNumber: value.mobileNumber
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Error, Please try again.",
                error: err.message
            });
        });
    }
};



// Delete User 
const deleteUser = (req, res) => {
    const id = req.params.id;
    User.findByIdAndRemove({ _id: id })
        .then(() => {
            res.status(204).json({
                message: 'User delete Successfully.'
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Error, Please try again.",
                error: err.message,
            });
        });
};



module.exports = {
    getAllUser,
    getUserByMobileNumber,
    createUser,
    updateUser,
    deleteUser
};   
