import React, { useContext } from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import firebase from "firebase/app";
import "firebase/auth";


const Headers = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    const handleSignOut = () => {
        firebase.auth().signOut().then(() => {
            let signedOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                password: '',
                photo: '',
                error: '',
                success: false
            }
            setLoggedInUser(signedOutUser);
        })
            .catch((error) => {

            });
    }
    return (
        <div>
            <Navbar bg="success" expand="lg">
            <Navbar.Brand  className=" rounded text-light p-3" href="/home"><h2>Online Grocery Shop</h2></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end ">
                <Link className="text-light nav-link" to="/home">Home</Link>
                <Link  className="text-light nav-link" to="/orders">Orders</Link>
                <Link  className="text-light nav-link" to="/admin">Admin</Link>
                <Link to="/login" className="nav-link text-light"onClick={handleSignOut}>{loggedInUser.email?'Logout':'Login'}</Link>
                <Link to="#" className="nav-link active text-light">{loggedInUser.displayName||loggedInUser.email}</Link>
            </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Headers;