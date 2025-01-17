const express = require('express');
const router = express.Router();
const Drone = require('../models/Drone.model');
// require the Drone model here

router.get('/drones', async (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  try {
    let drones = await Drone.find({});
    
    res.render('drones/list', { drones });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/drones/create', async (req, res, next) => res.render('drones/create-form'))
  // Iteration #3: Add a new drone
  // ... your code here


router.post('/drones/create', async (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  try {
    const { name, propellers, maxSpeed } = req.body;
    //create the book in the db
    await Drone.create({ name, propellers, maxSpeed });

    res.redirect('/drones');
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/drones/:id/edit', async(req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  try {
    const {id} = req.params
    const drone = await Drone.findById(id);
    res.render('drones/update-form', drone);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/drones/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
    const { id } = req.params;
    const { name, propellers, maxSpeed } = req.body;

    await Drone.findByIdAndUpdate(id, { name, propellers, maxSpeed });

    res.redirect(`/drones`);
});

router.post('/drones/:id/delete', async (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
  try {
    const { id } = req.params;
    await Drone.findByIdAndDelete(id);
    res.redirect('/drones');
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
