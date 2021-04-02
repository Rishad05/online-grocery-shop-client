import React  from 'react';
import AddProduct from '../AddProducts/AddProduct';
import ManageProduct from '../ManageProduct/ManageProduct';
import Sidebar from '../Sidebar/Sidebar';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

const Admin = () => {
    return (
        <div className="row mr-0">
            <Router>
            <div className="col-md-3">
            <Sidebar></Sidebar>
            </div>
            <div className="col-md-9">
                    <Switch>
                        <Route path="/manageProduct">
                            <ManageProduct></ManageProduct>
                        </Route>
                        <Route path="/addProduct">
                            <AddProduct></AddProduct>
                        </Route>
                    </Switch>
            </div>
            </Router>
        </div>
    );
};

export default Admin;