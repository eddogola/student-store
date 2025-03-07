const express = require('express');
const router = express.Router();

const Store = require('../models/store');

// errors
const { badRequestError } = require('../utils/errors');

router.get('/', (req, res) => {
	res.status(200).send({'products': Store.get_products()});
});

router.get('/:productId', (req, res) => {
	const productId = parseInt(req.params.productId);
	const product = Store.get_product(productId);

	res.status(200).send({'product': product});
});

// POST requests
router.post('/', (req, res) => {
	// receive an object with a `shoppingCart`(each has itemId, quantity fields) array,
	// and a `user` object(each has name and email fields)
	const body = req.body;
	
	// if either is not in the POST body, throw 400 error
	if (!('shoppingCart' in body) || !('user' in body)) {
		throw new badRequestError('shoppingCart or user not in request body');
	}
	const shoppingCart = body.shoppingCart;
	const user = body.user;
	// if a duplicate of a product in the shoppingCart exists, throw 400 error
	// if either itemId or quantity is missing for any shoppingCart item, throw 400 error
	for (let cartItem of shoppingCart) {
		if(!('itemId' in cartItem) || !('quantity' in cartItem)) {
			throw new badRequestError('itemId or quantity missing for some cart item');
		}
		const similarIdItems = shoppingCart.filter((item) => item.itemId === cartItem.itemId);
		if (similarIdItems.length != 1) {
			throw new badRequestError('multiple similar items in shopping cart');
		}
	}
    
	// calculate total cost for items in shoppingCart
	let total = 0;
	for (let cartItem of shoppingCart) {
		const product = Store.get_product(cartItem.itemId);
		total += product.price * cartItem.quantity;
	}
    
	// calculate 8.75pc tax to the total
	const tax = total * 0.0875;

	// create a new purchase object
	const currentPurchasesNo = Store.get_purchases().length;
	const purchase = {
		id: currentPurchasesNo + 1,
		name: user.name,
		email: user.email,
		order: shoppingCart,
		total: total + tax,
		createdAt: new Date().toLocaleString('en-US', {'timeZone': 'UTC'}),
		receipt: '',
	};

	// persist purchase in db
	Store.add_purchase(purchase);

	res.status(201).send({'purchase': purchase});
});

module.exports = router;
