const {testAbi ,testAddress,mainAbi,mainAddress } = require("../erc20data/usdtAbi");
const router = require('express').Router();
const {web3TestNet,web3MainNet} = require('../web3config');


//using testnet
var contract = new web3TestNet.eth.Contract(testAbi,testAddress);


//using mainnet
// var contract = new web3MainNet.eth.Contract(mainAbi,mainAddress);


//3 for USDT

router.post('/getBalance',(req,res)=>{
    
    const address =req.body.address;
    if(!address)
    {
        res.status(400).json({msg:"No address provided!!"});
    }
    try
    {
        contract.methods.balanceOf(address).call((err,result)=>{
            if (err) 
                {res.status(500).json({msg:"Error Occured"})}
            else
            {
                const balance = web3TestNet.utils.fromWei(result,'mwei')+ " Lead";
                res.json({balance});
            }
        })
    
    }
    catch(error)
    {
        res.status(500).json({msg:"Invalid Address"});
    }

 

})



module.exports= router;