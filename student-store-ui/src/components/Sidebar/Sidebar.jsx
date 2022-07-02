import * as React from "react"
import "./Sidebar.css"
import CheckoutForm from "../CheckoutForm/CheckoutForm"
import { ShoppingCart } from "../ShoppingCart/ShoppingCart"
import CheckoutInfo from "../CheckoutInfo/CheckoutInfo"

export default function Sidebar({ isOpen, setError, shoppingCart, products, allProducts, checkoutForm, 
  handleOnCheckoutFormChange, handleOnSubmitCheckoutForm, handleOnToggle, 
  purchase, setPurchase}) {
  
  const rightIcon = <span className="bi bi-arrow-right-circle"></span>
  const leftIcon = <span className="bi bi-arrow-left-circle"></span>

  const sidebarContent = <div className="content">
    <ShoppingCart shoppingCart={ shoppingCart } products={ allProducts }/>
        <CheckoutForm handleOnSubmitCheckoutForm={ handleOnSubmitCheckoutForm } handleOnCheckoutFormChange={ handleOnCheckoutFormChange } 
        shoppingCart={ shoppingCart } checkoutForm={ checkoutForm }/>
        <CheckoutInfo isOpen={ isOpen } shoppingCart={ shoppingCart } checkoutForm={ checkoutForm }
        handleOnCheckoutFormChange={ handleOnCheckoutFormChange }
        handleOnSubmitCheckoutForm={ handleOnSubmitCheckoutForm } 
        purchase={ purchase } setPurchase={ setPurchase } allProducts={ allProducts } />
  </div>

  return (
    <section className={`sidebar ` + (isOpen ? 'opened':'closed')}>
      <div className="shopping-cart">
        <button className="toggle-button" onClick={ handleOnToggle }>{ isOpen ? leftIcon: rightIcon }</button>
        {isOpen ? sidebarContent : null}
      </div>
    </section>
  )
}
