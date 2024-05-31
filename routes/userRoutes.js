const express = require("express");
const User = require("../models/Users");

const router = express.Router();

// create a new user
router.post("/users", async (req, res)=>{
    try {
        const user = new User(req.body);
        console.log("Testing DB")
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// get all users
router.get("/users", async (req, res)=>{
    try {
        const users = await User.find({});
        res.status(201).send(users);
    } catch (error) {
        res.status(400).send(error);
    }
});

// get a user by ID
router.get("/users/:id", async (req, res)=>{
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            res.status(400).send();
        }
        res.status(201).send(user);
    } catch (error) {
        res.status(404).send(error);
    }
});

// Update a user by ID
router.put("/users/:id", async (req, res)=>{
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body,
            {new: true, runValidators: true}
        );
        if(!user){
            res.status(404).send();
        }
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete user a user by ID
router.delete("/users/:id", async (req, res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            res.status(400).send();
        }
        res.status(201).send(user);
    } catch (error) {
        res.status(404).send(error);
    }
});

module.exports = router;