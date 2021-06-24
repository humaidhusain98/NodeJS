const router = require('express').Router();
const {checkValid,checkSuperAdmin,checkAdmin} = require('../authentication/authenticate');


router.post("/all",checkValid,(req,res)=>{
    res.json({msg:"success"});
});

router.post("/superadmin",checkSuperAdmin,(req,res)=>{
    res.json({msg:"success"});
})

router.post("/admin",checkAdmin,(req,res)=>{
    res.json({msg:"success"});
})

module.exports = router;