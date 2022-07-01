import * as React from "react"
import axios from "axios";
import { useParams } from "react-router-dom"
import "./ProductDetail.css"
import ProductView from "../ProductView/ProductView";

export default function ProductDetail({ shoppingCart, handleAddItemToCart, handleRemoveItemToCart, setError }) {
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
        // <div className="product-detail container">
        //     <div className="card">
        //         <h1 className="product-title">Product #{ productId }</h1>
        //         <img src={ product.image } alt={ product.name } />
        //         <div className="card-body">
        //             <strong>{ product.name }</strong><br/>
        //             <strong>${ product.price }</strong>
        //             <p>{ product.description }</p>
        //         </div>
        //     </div>
        // </div>
        <ProductView product={ product } productId={ productId } shoppingCart={ shoppingCart } 
        handleAddItemToCart={ handleAddItemToCart } handleRemoveItemToCart={ handleRemoveItemToCart } />
    )   
}