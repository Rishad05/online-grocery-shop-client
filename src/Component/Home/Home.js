import React, { useEffect, useState } from 'react';
import Product from '../Products/Product';
import spinner from '../../image/spinner.gif';

const Home = () => {
    const [product, setProduct] = useState([])
    useEffect(() => {
        fetch("https://murmuring-shore-08576.herokuapp.com/products")
        .then(res => res.json())
        .then(data => setProduct(data))
    }, [])
    return (
        <div className="container mb-5">
            <div className="row">
            {
                product.length ? "" : <img className="mx-auto" src={spinner} alt=""/>
            }
        {
            product.map(product=> <div className="col-md-3"> 
            
            
                <Product product={product}></Product>
            
            </div>)
        }
    </div>
        </div>
    );
};

export default Home;