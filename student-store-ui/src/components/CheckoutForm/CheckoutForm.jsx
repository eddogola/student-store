import * as React from "react"
import "./CheckoutForm.css"

export default function CheckoutForm({isOpen, shoppingCart, checkoutForm, handleOnCheckoutFormChange, handleOnSubmitCheckoutForm }) {
    return (
        <div className="checkout-form">
            <form action="/" method="post" onSubmit={ handleOnSubmitCheckoutForm }>
                <input type="email" name="email" className="checkout-form-input" placeholder="student@codepath.org" value={ checkoutForm.email } 
                id="email" onChange={ event => {
                    handleOnCheckoutFormChange('email', event.target.value);
                    } 
               } />
                <input type="text" name="name" className="checkout-form-input" placeholder="Student Name" value={ checkoutForm.name }
                id="name" onChange={ event => {
                     handleOnCheckoutFormChange('name', event.target.value);
                     } 
                } />
                <button className="checkout-button" type="submit">Checkout</button>
            </form>
        </div>
    )
}