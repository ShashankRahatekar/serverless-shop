// curl https://api.stripe.com/v1/skus \
//   -u sk_test_eEnpO3GFMoX26adwa5t1Q83u00kEH52tRm: \
//   -d limit=3 \
//   -G

  'use strict';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); 

module.exports.handler = (event, context, callback) => {
  return stripe.skus.list(
      {limit: 10}).then((skus) => {
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        data: skus.data
      }),
    };
    callback(null, response);
  }).catch((err) => { // Error response
    console.log(err);
    const response = {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: err.message,
      }),
    };
    callback(null, response);
  });
};