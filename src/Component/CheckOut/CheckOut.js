import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';



const CheckOut = () => {
    const [product, setProduct] = useState({});

    const { id } = useParams();

    const [loggedInUser, setLoggedInUser] = useContext(userContext)

    const [selectedDate, setSelectedDate] = useState({
        orderDate: new Date(),
    });

    const handleOrderDate = (date) => {
        const newDate = { ...selectedDate }
        newDate.orderDate = date;
        setSelectedDate(newDate);
    };


    const handleCheckout = () => {
        const orderInfo = {
            email: loggedInUser.email,
            displayName: loggedInUser.displayName,
            photoURL: loggedInUser.photoURL,
            date: selectedDate.orderDate,
            id: product._id,
            price: product.price,
            name: product.name,
            imageURL: product.imageURL
        }

        fetch('https://murmuring-shore-08576.herokuapp.com/buyProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderInfo)
        })
            .then(res => res.json())

            .then(data => {
                if (data) {
                    alert('Product added to cart')
                }
            })
    }


    useEffect(() => {
        fetch(`https://murmuring-shore-08576.herokuapp.com/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [id])

    const { name, price, imageURL } = product;


    return (
        <div className='container'>
            <h1 className="text-center m-5">Checkout</h1>

            <div style={{ textAlign: 'center' }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Order Date"
                            value={selectedDate.orderDate}
                            onChange={handleOrderDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
            </div>

            <table class="table border rounded mt-3">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product name</th>
                        <th scope="col">Product Image</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>{name}</td>
                        <td><img src={imageURL} style={{ width: '70px', height: '70px' }} alt="" /></td>
                        <td>1</td>
                        <td>${price}</td>
                       
                    </tr>
                </tbody>
            </table>
            <div style={{ float: 'right' }} >

                <button onClick={handleCheckout} className="btn btn-primary">Add to Cart</button>

                <Link to="/" className="m-3">
                    <button className="btn btn-danger">Shop More</button>
                </Link>

                <Link to="/orders">
                    <button className="btn btn-success">CheckOut</button>
                </Link>
            </div>
        </div>
    );
};

export default CheckOut;