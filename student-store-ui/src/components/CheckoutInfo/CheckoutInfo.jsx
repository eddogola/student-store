import * as React from 'react';
import './CheckoutInfo.css';

export default function CheckoutInfo({ purchase, setPurchase, allProducts }) {
    if (Object.keys(purchase).length === 0) {
        return (
            <div className="checkout-info">
                <h2>Checkout Info <span className="bi bi-check2-all"></span></h2>
                <p>A confirmation email will be sent to you so that you can confirm this order. 
                    Once you have confirmed the order, it will be delivered to your dorm room.</p>
            </div>
        )
    } else {
        let cartProducts = [];
        let subTotal = 0
        purchase.shoppingCart.forEach(cartItem => {
            let product = allProducts.find((prod) => prod.id === cartItem['itemId'])
            product['quantity'] = cartItem['quantity']
            cartProducts.push(product)
            subTotal += product.price * cartItem['quantity']
        });
        const taxes = subTotal * 0.0875;
        const total = (subTotal + taxes).toFixed(2);

        return (
            <div className="checkout-info">
                <h1>Checkout Info</h1>
                <div className="receipt">
                    <h3>Receipt</h3>
                    <p className='success'>Success! Showing receipt for { purchase.user.name } available at { purchase.user.email }:</p>
                    <ul>
                        { cartProducts.map((product, idx) => <li key={`${idx}`}>{ product.quantity } total { product.name } 
                         purchased at a cost of ${ product.price } for a total cost of ${ (product.price * product.quantity).toFixed(2) }</li> ) }
                        <li>Before taxes, the subtotal was ${ subTotal.toFixed(2) }</li>
                        <li>After taxes and fees were applied, the total comes out to ${ total }</li>
                    </ul>
                </div>
                <button onClick={ () => {
                    setPurchase({})
                 } } className="exit-button">Exit</button>
            </div>
        )
    }
}