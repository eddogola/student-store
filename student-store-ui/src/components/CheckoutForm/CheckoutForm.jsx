import * as React from "react"
import axios from "axios";
import "./CheckoutForm.css"

export default function CheckoutForm({isOpen, setError, shoppingCart, checkoutForm, handleOnCheckoutFormChange, handleOnSubmitCheckoutForm }) {
    function handleOnSubmit(event) {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;

        const postObject = {
            'shoppingCart': shoppingCart,
            'user': {
                'name': name,
                'email': email,
            }
        }

        const postData = async () => {
            try {
                await axios.post('http://localhost:3001/store', postObject);
                console.log("we're hereee")
                // set purchases
            } catch (e) {
                console.log("makosa", e)
                setError(e);
            }
        };

        postData();

        console.log('postObject: ', postObject);
    
        event.target.reset();
    }

    return (
        <div className="checkout-form">
            <form action="/" method="post" onSubmit={ handleOnSubmit }>
                <input type="text" name="name" placeholder="Name" id="name" />
                <input type="email" name="email" placeholder="Email" id="email" />
                <button type="submit">Check out</button>
            </form>
        </div>
    )
}