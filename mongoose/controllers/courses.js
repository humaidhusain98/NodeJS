const express =require("express");
const mongoose = require("mongoose");

const router = express.Router();
const CourseModel = mongoose.model("Course");
 
//  var course=new CourseModel();
//  course.courseName="Node JS";
//  course.courseId="2";
//  course.save();


 router.get("/",(req,res)=>{
   CourseModel.find((err,docs)=>{
      if(!err)
      {
          console.log(docs);
          res.json(docs);
      } 
      else
      {
          res.send("Error Occured");
      }
   })
   
});

module.exports=router;
