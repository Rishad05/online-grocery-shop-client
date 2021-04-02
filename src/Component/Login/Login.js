import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import image from '../../image/google.png';
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app();
 }

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    });

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

   



    const handleGoogleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
  .signInWithPopup(googleProvider)
  .then((result) => {
   const  {displayName,email} = result.user;
   const signedInUser = {Name: displayName, email}
   setLoggedInUser(signedInUser)
   history.replace(from);
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(errorMessage, email, credential, errorCode)
  });
}

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);

        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }


    const handleSubmit = (e) => {

        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }


            
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    console.log(newUser);
                    console.log('sign in user info', res.user);
                    history.replace(from);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });

        }
        e.preventDefault();
    }



    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name

        })
            .then(function () {
                console.log('user name Updated SuccessFully');
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return (
        <div className="container">
            <div className="col-md-12">
                <div className="card bg-light shadow radius rounded  mx-auto mt-5" style={{ width: '25rem', height: '32rem' }}>

                    
                    <form className="p-3" onSubmit={handleSubmit}>
                        <h2 className="border-bottom pb-2 text-center" >{newUser ? 'Create An Account' : 'Login'}</h2>
                        <label for="" class="p-2">{newUser ? 'Name:' : 'Username or Email'}</label>
                        {
                            newUser &&
                            <input type="text" class="form-control" name="name" placeholder="Your Name" onBlur={handleBlur} required />
                        }
                        <label for="" class="p-2">{newUser ? 'Username or Email' : ''}</label>
                        <input type="text" class="form-control" name="email" placeholder="Your Email" onBlur={handleBlur} required />
                        <label for="" class="p-2">Password</label>
                        <input type="password" class="form-control" name="password" placeholder="password" onBlur={handleBlur} />
                        <button className="btn btn-success mt-3 w-100">{newUser ? 'Create An Account' : 'Login'}</button>
                        <p className="mt-3 text-center"> {newUser ? 'Already have an account?' : 'Do not have an account?'} <button className="text-light bg-secondary p-2 rounded "href="#" onClick={()=> setNewUser(!newUser)} name="newUser"> {newUser ? 'Login' : 'Create An Account'}</button></p>
                    </form>
                </div>

                        
                <div>
                <p style={{ color: 'red', textAlign:'center' }}>{user.error}</p>
                {user.success && <p style={{ color: 'green', textAlign:'center'  }}>User {newUser ? 'Created' : 'logged In'}Successfully.</p>}
                </div>


                        
                <div className="text-center mt-3 mb-3">
                    <h5>or</h5>
                    <button className="googleSignIn-btn btn btn-light mt-3 w-25 shadow border" onClick={handleGoogleSignIn}><img className="google-icon m-2" src={image} alt=""  />Continue with google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;