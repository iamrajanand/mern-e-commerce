
var braintree = require("braintree");

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "cvts5wdxwk3pqsxt",
  publicKey: "2cfdp3wmkx6kmzg3",
  privateKey: "76e99066a9b05ce1df22e884bedb41f1"
});

exports.getToken=(req,res)=>{
    gateway.clientToken.generate({}, (err, response) => {
        if(err)
        {
            res.status(500).send(err);
        }else{
            res.send(response);
        }
      });
};


exports.processPayment=(req,res)=>{
    let nonceFromTheClient=req.body.paymentMethodNonce
    let amountFromTheClient=req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
          if(err){
              res.status(500).send(err)
          }else{
              res.json(result);
          }
      });
};


