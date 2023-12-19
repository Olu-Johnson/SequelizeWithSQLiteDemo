const express = require('express');
const app = express();
const router = express.Router();

const db = require('../models');
const { Sequelize } = require('sequelize');

router.post("/createuser", async (req, res)=>{

    try {
     const user = await db.User.create(req.body);
     return res.status(201).send("data saved successful")
     
    } catch (error) {
     return res.status(500).send("something went wrong")
    }
 
 })
 
 // to get specific table property
 router.get("/getNameAndAge", async (req, res)=>{
      
     const user = await db.User.findAll({
         attributes : ['firstName', 'age']
     });
     return res.status(200).send(user);
 });
 
 router.get("/getFirstnameAsAlias", async (req, res) =>{ 
     const user = await db.User.findAll({
        attributes : [["firstName", "fullname"], "age"]
     })
     return res.status(200).send(user);
     
 });
 
 router.get("/getWitAgeCount", async (req, res) =>{
     const user = await db.User.findAll({
         attributes : ['age', [Sequelize.fn('COUNT', Sequelize.col('age')), 'n_age']]
     });
     return res.status(200).send(user);
 })
 
 router.get("/singleUser", async (req, res) => {
     const user = await db.User.findOne({
         where : {
             firstName : "Jason"
         }
     });
     return res.status(200).send(user);
 });
 
 router.get("/withPagination/:offset/:limit", async (req, res)=>{
     console.log("param", req.param)
     const {offset, limit } = req.params;
     const user = await db.User.findAll(
     {
       offset : offset,
       limit : limit
     }
     );
     return res.status(200).send(user);
 });
 
 router.get("/", async (req, res)=>{
      
     const user = await db.User.findAll();
     return res.status(200).send(user);
 });

 module.exports = router;