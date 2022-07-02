import * as React from "react"
import "./ShoppingCart.css"

export function ShoppingCart({ isOpen, shoppingCart, products }) {
    const shoppingCartTitle = <h2>Shopping Cart <span className="bi bi-cart"></span></h2>
    if (shoppingCart.length === 0) {
      return (
        <div className="notification">      
        { shoppingCartTitle }
        <p>No items aded to cart yet. Start shopping now!</p>
      </div>
      )
    } else {
      let subTotal = 0.0
      let cartProducts = []
      shoppingCart.forEach(cartItem => {
        let product = products.find((prod) => prod.id === cartItem['itemId'])
        product['quantity'] = cartItem['quantity']
        cartProducts.push(product)
        subTotal += product.price * cartItem['quantity']
      });
      subTotal = subTotal
      let taxes = (subTotal * 0.0875)
      const total = (subTotal + taxes).toFixed(2)
  
      return (
        <div className="shopping-cart">
          { shoppingCartTitle }
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              { cartProducts.map((cartProd, idx) => (
                <tr key={"cart-item" + idx}>
                  <td className="card-product-name">{ cartProd.name }</td>
                  <td className="cart-product-quantity">{ cartProd.quantity }</td>
                  <td>${ cartProd.price }</td>
                  <td>${ (cartProd.price * cartProd.quantity).toFixed(2) }</td>
                </tr>
              )) }
            </tbody>
            <tfoot>
              <tr>
                <td><strong>Subtotal</strong></td>
                <td></td>
                <td></td>
                <td className="subtotal">${ subTotal.toFixed(2) }</td>
              </tr>
              <tr>
                <td><strong>Taxes and Fees</strong></td>
                <td></td>
                <td></td>
                <td>${ taxes.toFixed(2) }</td>
              </tr>
              <tr>
                <td><strong>Total</strong></td>
                <td></td>
                <td></td>
                <td className="total-price">${ total }</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )
    }
  }
  