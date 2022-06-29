import * as React from "react"
import axios from "axios";
import "./CheckoutForm.css"

export default function CheckoutForm({isOpen, checkoutForm, handleOnCheckoutFormChange, handleOnSubmitCheckoutForm }) {
    return (
        <div className="checkout-form">
            <form action="/" method="post" onSubmit={ handleOnSubmitCheckoutForm } onChange={ handleOnCheckoutFormChange }>
                <input type="text" name="name" placeholder="Name" id="name" />
                <input type="email" name="email" placeholder="Email" id="email" />
                <button type="submit">Check out</button>
            </form>
        </div>
    )
}