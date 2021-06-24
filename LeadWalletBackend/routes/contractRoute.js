const {testAbi ,testAddress } = require("../erc20data/contractAbi");
const router = require('express').Router();
const {web3TestNet} = require('../web3config');

var contract = new web3TestNet.eth.Contract(testAbi,testAddress);

router.post('/get1usdtRate',(req,res)=>{
    
    const tokenAAddress ="0xd10aa4e963b633fda3cb3dea1a841e18a55f5eed";//usdt ropsten

    const tokenBAddress='0x8223C8b9Be69c5F77e6a6683674756565076C9fc';

    try
    {
        contract.methods.rate(1,tokenAAddress,tokenBAddress).call((err,result)=>{
            if (err) 
            {
                {res.status(500).json({msg:"Error Occured"})}
            }
            else
            {
                res.json(result+ " LEAD");
            }
        })
    
    }
    catch(error)
    {
        res.status(500).json({msg:"Invalid Address"});
    }


})







router.post('/getRate',(req,res)=>{
    
    const {tokenAAddress,tokenBAddress} =req.body;
    if(!tokenAAddress || !tokenBAddress  )
    {
        res.json({msg:"Input missing"});
    }
    try
    {
        contract.methods.rate(1,tokenAAddress,tokenBAddress).call((err,result)=>{
            if (err) 
            {
                {res.status(500).json({msg:"Error Occured"})}
            }
            else
            {
                res.json(result+ " LEAD");
            }
        })
    
    }
    catch(error)
    {
        res.status(500).json({msg:"Invalid Address"});
    }

 

})

module.exports= router;