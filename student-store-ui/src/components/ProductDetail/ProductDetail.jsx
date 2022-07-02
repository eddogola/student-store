import * as React from "react"
import axios from "axios";
import { useParams } from "react-router-dom"
import "./ProductDetail.css"
import ProductView from "../ProductView/ProductView";

export default function ProductDetail({ shoppingCart, handleAddItemToCart, handleRemoveItemFromCart, setError }) {
    const { productId } = useParams();
    const [isFetching, setIsFetching] = React.useState(true);
    const [product, setProduct] = React.useState({});

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/store/${productId}`);
                if (isFetching) {
                    setProduct(response.data.product);
                    setIsFetching(false);
                }
            } catch (e) {
                setError(e);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="product-detail">
            <ProductView product={ product } productId={ productId } shoppingCart={ shoppingCart } 
            handleAddItemToCart={ handleAddItemToCart } handleRemoveItemFromCart={ handleRemoveItemFromCart } />
        </div>
    )   
}