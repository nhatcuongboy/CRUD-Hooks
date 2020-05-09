const express = require('express');
const app = express();
const equipmentRoute = express.Router();
const authorize = require("../middlewares/auth");

let Equipment = require('../models/Equipment');

// Add Equipment
equipmentRoute.route('/equipment/create').post((req, res, next) => {
  Equipment.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// List Equipment
equipmentRoute.route('/equipment/list').get((req, res) => {
  Equipment.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single Equipment
equipmentRoute.route('/equipment/read/:id').get( (req, res) => {
  Equipment.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Assignment (ID of user)
equipmentRoute.route('/equipment/assignment/:id').get( (req, res) => {
  Equipment.find({ 'assign': req.params.id }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update Equipment
equipmentRoute.route('/equipment/update/:id').put( (req, res, next) => {
  Equipment.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        message: 'Update successfully'
      })
      console.log('Data updated successfully')
    }
  })
})

// Delete Equipment
equipmentRoute.route('/equipment/delete/:id').delete( (req, res, next) => {
  Equipment.findOneAndDelete({ _id: req.params.id }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        message: 'Delete successfully'
      })
    }
  })
})

module.exports = equipmentRoute;