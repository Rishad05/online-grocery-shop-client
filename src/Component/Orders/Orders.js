import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';

const Orders = () => {
    const [order, setOrder] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    useEffect(() => {
        fetch('https://murmuring-shore-08576.herokuapp.com/orderPreview?email=' + loggedInUser.email)
            .then(res => res.json())
            .then(data => setOrder(data))
    }, [loggedInUser.email])

    return (
        <div className="mb-5">
            <div className="mt-3" style={{ marginLeft: '240px' }}>
                <h3 className="ml-3 mb-5 mt-5">Hello!! {loggedInUser.email} You Ordered {order.length} product</h3>
                
                {
                    order.map(order =>
                        <div className="d-flex rounded shadow-lg mb-3 w-75">
                            
                            <h5 className="m-5">{order.name}</h5>
                            <h5 className="m-5">${order.price}</h5>
                            <img className="mb-3 mt-3" style={{ width: '100px', height: '100px' }} src={order.imageURL} alt="" />
                            <h5 className="m-5">{(new Date(order.date).toDateString("dd/MM/yyyy"))}</h5>

                        </div>
                    )
                }

                <Link to="/greeting" style={{  marginRight: '50px', marginBottom: '25px' }}>
                    <button className="btn btn-success">Place Order</button>
                </Link>
                <Link to="/" style={{ marginRight: '50px', marginBottom: '25px' }}>
                    <button className="btn btn-danger">Shop More</button>
                </Link>

            </div>
        </div>
    );
};

export default Orders;