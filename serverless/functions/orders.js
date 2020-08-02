// Fetch all orders from stripe
'use strict';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

module.exports.handler = (event, context, callback) => {
	return stripe.orders.list(
		{ limit: 10 }).then(orders => {
			const response = {
				statusCode: 200,
				headers: {
					'Access-Control-Allow-Origin': '*',
				},
				body: JSON.stringify({
					data: orders.data
				})
			};
			callback(null, response);
		}).catch(err => {
			console.log('Error : ', err);
			const response = {
				statusCode: 500,
				headers: {
					'Access-Control-Allow-Origin': '*',
				},
				body: JSON.stringify({
					error: err.message
				})
			};
			callback(null, response);
		});
};