import * as React from "react"
import "./Sidebar.css"
import CheckoutForm from "../CheckoutForm/CheckoutForm"
import { ShoppingCart } from "../ShoppingCart/ShoppingCart"
import CheckoutInfo from "../CheckoutInfo/CheckoutInfo"

export default function Sidebar({ isOpen, setError, shoppingCart, products, allProducts, checkoutForm, 
  handleOnCheckoutFormChange, handleOnSubmitCheckoutForm, handleOnToggle, 
  purchase, setPurchase}) {

  return (
    <section className="sidebar">
      <div className="shopping-cart">
        <ShoppingCart shoppingCart={ shoppingCart } allProducts={ allProducts }/>
        <CheckoutForm handleOnSubmitCheckoutForm={ handleOnSubmitCheckoutForm } shoppingCart={ shoppingCart } />
        <CheckoutInfo purchase={ purchase } setPurchase={ setPurchase } allProducts={ allProducts } />
      </div>
    </section>
  )
}
