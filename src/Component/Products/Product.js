import React from 'react';
import { useHistory } from 'react-router';

const Product = ({ product }) => {
    const history = useHistory();
    const handleBuy =(_id)=>{
        history.push(`/checkOut/${_id}`)
    }

    return (
        <div className="container mt-5">
            <div class="card shadow" style={{ width: "15rem", height:"24rem" }}>
                <div class="card-body">
                <img src={product.imageURL} class="card-img-top w-100 h-30 p-2" alt="..." />
                    <h5 class="card-title text-center">{product.name} - {product.quantity}</h5>
                </div>
                <div className="card-footer d-flex justify-content-between">
                    <h3 className="fw-bolder">${product.price}</h3>
                    <button onClick={() => handleBuy (product._id)} className="btn btn-success ">Buy Now</button>
                </div>
            </div>





        </div>
    );
};

export default Product;