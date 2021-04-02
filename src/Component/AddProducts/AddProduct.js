import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from "react-hook-form";

const AddProduct = () => {
    const { register, handleSubmit } = useForm();
    const [imageURL, setIMageURL] = useState(null);


    const onSubmit = (data, e) => {
        const productData = {
            name: data.name,
            imageURL: imageURL,
            price: data.price,
            quantity: data.quantity
            
        };
        console.log(productData)
        const url = `https://murmuring-shore-08576.herokuapp.com/addProduct`;

        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
        .then(res => {
            if (res) {
                e.target.reset();
            }

        });    
    };

    const handleImageUpload = product => {
        console.log(product.target.files[0])
        const imageData = new FormData();
        imageData.set('key', '3957c845bd9689113743363c6a2f614f');
        imageData.append('image', product.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload',
            imageData)
            .then(function (response) {
                setIMageURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div>
        <h1>Add Product</h1>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)} class="row g-3 bg-light shadow mt-5 p-5 rounded">
            <div className="col-md-6">
                <label for="inputEmail4" class="form-label ">Product Name</label>
                <input type="text" name="name" class="form-control" id="inputEmail4" placeholder="Enter Name" ref={register} />
            </div>
            <div className="col-md-6">
                <label for="inputPassword4" class="form-label ">Quantity</label>
                <input type="text" name="quantity" class="form-control" id="inputPassword4" placeholder="Enter Quantity" ref={register} />
            </div>
            <div className="col-md-6">
                <label for="inputEmail4" class="form-label ">Add Price</label>
                <input type="number" name="price" class="form-control" id="inputEmail4" placeholder="Enter Price" ref={register} />
            </div>

            <div className="col-md-6">
                <label for="formFileMultiple" class="form-label ">Add Photo</label>
                <input class="form-control" type="file" id="formFileMultiple" onChange={handleImageUpload} />
            </div>

            <div >
                <input type="submit" className="mt-3 btn btn-success" />
            </div>
        </form>
    </div>

    );
};

export default AddProduct;