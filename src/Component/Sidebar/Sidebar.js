import React from "react";
import { Nav } from "react-bootstrap";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import './Sidebar.css';

const Side = props => {


    return (
        <>
            <Nav className="col-md-3 d-md-block bg-secondary sidebar ">
                <Nav.Item className="p-3  m-4  ">
                    <Link className="text-white  text-decoration-none "  to="/manageProduct">Manage Product</Link>
                </Nav.Item>
                <Nav.Item className="p-3  m-4  ">
                    <Link className="text-white  text-decoration-none"  to="/addProduct" >Add Product</Link>
                </Nav.Item>
            </Nav>
        </>
    );
};
const Sidebar = withRouter(Side);
export default Sidebar