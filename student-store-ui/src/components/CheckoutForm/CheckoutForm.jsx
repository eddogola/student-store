import * as React from "react"
import "./CheckoutForm.css"

export default function CheckoutForm({isOpen, shoppingCart, checkoutForm, handleOnCheckoutFormChange, handleOnSubmitCheckoutForm }) {
    return (
        <div className="checkout-form">
            <h2>Payment Info <span className="bi bi-cash-stack"></span></h2>
            <form action="/" method="post" onSubmit={ handleOnSubmitCheckoutForm }>
                <input type="email" name="email" className="checkout-form-input form-control" placeholder="student@codepath.org" value={ checkoutForm.email } 
                id="email" onChange={ event => {
                    handleOnCheckoutFormChange('email', event.target.value);
                    } 
               } />
                <input type="text" name="name" className="checkout-form-input form-control mt-1" placeholder="Student Name" value={ checkoutForm.name }
                id="name" onChange={ event => {
                     handleOnCheckoutFormChange('name', event.target.value);
                     } 
                } />
                <button className="checkout-button" type="submit">Checkout</button>
            </form>
        </div>
    )
}