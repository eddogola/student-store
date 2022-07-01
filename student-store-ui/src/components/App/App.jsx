import * as React from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import ProductDetail from "../ProductDetail/ProductDetail";
import NotFound from "../NotFound/NotFound";
import Home from "../Home/Home";
import "./App.css";

export default function App() {
    // an array of product objects that is initially empty.
    const [products, setProducts] = React.useState([]);
    const [allProducts, setAllProducts] = React.useState([]);
    // a boolean value representing whether or not the App is currently fetching the products from the API.
    const [isFetching, setIsFetching] = React.useState(true);
    // a variable used to display a message when something goes wrong with the API requests.
    const [error, setError] = React.useState("");
    // a boolean value representing whether or not the Sidebar.jsx is in the open or closed state.
    const [isOpen, setIsOpen] = React.useState(false);
    // should store state for the active user's shopping cart (items they want to purchase and the quantity of each item).
    const [shoppingCart, setShoppingCart] = React.useState([]);
    // the user's information that will be sent to the API when they checkout.
    const [checkoutForm, setCheckoutForm] = React.useState(false);
    const [purchase, setPurchase] = React.useState({});

    const categories = [
        "All categories",
        "Clothing",
        "Food",
        "Accessories",
        "Tech",
    ];

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/store");
                if (isFetching) {
                    setProducts(response.data.products);
                    setAllProducts(response.data.products);
                    setIsFetching(false);
                }
            } catch (e) {
                setError(e);
            }
        };

        fetchData();
    }, []);

    function handleAddItemToCart(productId) {
        let product = shoppingCart.find(
            (product) => product["itemId"] === productId
        );
        if (product) {
            let newItemCount = product["quantity"] + 1;
            let restShoppingCart = shoppingCart.filter(
                (product) => product.itemId != productId
            );
            setShoppingCart(
                [].concat(restShoppingCart, [
                    { itemId: productId, quantity: newItemCount },
                ])
            );
        } else {
            setShoppingCart(
                [].concat(shoppingCart, [{ itemId: productId, quantity: 1 }])
            );
        }
    }

    function handleRemoveItemFromCart(productId) {
        let product = shoppingCart.find(
            (product) => product["itemId"] === productId
        );
        if (product) {
            let restShoppingCart = shoppingCart.filter(
                (product) => product.itemId != productId
            );
            if (product["quantity"] === 1) {
                setShoppingCart(restShoppingCart);
            } else if (product["quantity"] > 1) {
                setShoppingCart(
                    [].concat(restShoppingCart, [
                        { itemId: productId, quantity: product["quantity"] - 1 },
                    ])
                );
            }
        }
    }

    function handleOnSubmitCheckoutForm(event) {
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
                // set purchases
            } catch (e) {
                setError(e);
            }
        };

        postData();
        setPurchase(postObject);
        
        // clean up
        event.target.reset();
        setShoppingCart([])
    }

    function handleOnCheckoutFormChange(name, value) {
        
    }

    return (
        <div className="app">
            <BrowserRouter>
                <main>
                    <Navbar />
                    <Sidebar
                        shoppingCart={shoppingCart}
                        allProducts={allProducts}
                        handleOnSubmitCheckoutForm={ handleOnSubmitCheckoutForm }
                        handleOnCheckoutFormChange={ handleOnCheckoutFormChange }
                        purchase={ purchase }
                        setPurchase={ setPurchase }
                    />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Home
                                    products={products}
                                    categories={categories}
                                    setProducts={setProducts}
                                    allProducts={allProducts}
                                    handleAddItemToCart={handleAddItemToCart}
                                    handleRemoveItemToCart={
                                        handleRemoveItemFromCart
                                    }
                                    shoppingCart={shoppingCart}
                                />
                            }
                        />
                        <Route
                            path="products/:productId"
                            element={
                                <ProductDetail allProducts={allProducts} setError={ setError } />
                            }
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    );
}
