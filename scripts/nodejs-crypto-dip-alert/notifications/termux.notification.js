const api = require('termux')
 
const notify = (coin, maxPrice, currentPrice, dipThreshold) => {

   const dip = `-$${Math.abs(currentPrice - maxPrice)}`;
   const text = `We detected a ${dip} dip in the price of ${coin.symbol}, and thought we should let you know.\n\nThe Price dropped from $${maxPrice} to $${currentPrice}.`;

   console.log('attempt notifcation');
    if (api.hasTermux){
    api.vibrate()
       .duration(1000)
       .run()
     
    api.notification()
        .id(1)
        .title('CRYPTO DIP')
        .content(text)
   .run()
    }
}

module.exports = notify;
