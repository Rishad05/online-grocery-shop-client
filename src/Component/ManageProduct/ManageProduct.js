import React, { useEffect, useState } from 'react';

const ManageProduct = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://murmuring-shore-08576.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])


    const handleDelete = (id) => {

        fetch(`https://murmuring-shore-08576.herokuapp.com/deleteProduct/${id}`, {
            method : "DELETE"
        })
        .then(res => res.json())
        .then(data=>{
            if(data){
                alert('Product Deleted')
            }
        })
    }


    return (
        <div>
                <div className="col-md-12">
                <table className=" table table-danger table-striped text-center mt-3 " >
                    <thead>
                        <tr>
                            <th scope="col">Product Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Image</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                </table>
            </div>

                {
                    products.map(product =>
                        
                            <div className="container">
                                <table class="table table-sm table-primary text-center table-bordered ">
                                <div class="table-responsive">
                                        <tbody>
                                                <td className="w-25">{product.name}</td>
                                                <td className="w-25">{product.quantity}</td>
                                                <td className="w-25">${product.price}</td>
                                                <td className="w-25"><img src={product.imageURL} style={{ height: "80px" }} alt="" /></td>
                                                <td className="w-25">
                                                <button className="btn btn-danger btn-sm m-4" onClick={() => handleDelete(product._id)} >Delete</button>
                                                </td>
                                        </tbody>
                                </div>
                        </table>
                            </div>
                        
                    )
                }
            </div>
        
    );
};

export default ManageProduct;
