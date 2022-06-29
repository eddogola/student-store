import * as React from "react"
import axios from "axios";
import { useParams } from "react-router-dom"
import "./ProductDetail.css"

export default function ProductDetail({ allProducts, handleAddItemToCart, handleRemoveItemToCart, setError }) {
    const { productId } = useParams();
    const [isFetching, setIsFetching] = React.useState(true);
    // const product = allProducts.find((product) => product.id === parseInt(productId))
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
        <div className="product-detail container">
            <div className="card">
                <h1 className="product-title">Product #{ productId }</h1>
                <img src={ product.image } alt={ product.name } />
                <div className="card-body">
                    <strong>{ product.name }</strong><br/>
                    <strong>${ product.price }</strong>
                    <p>{ product.description }</p>
                </div>
            </div>
        </div>
    )
}