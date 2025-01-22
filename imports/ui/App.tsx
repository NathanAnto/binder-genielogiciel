import React, { Fragment } from "react";
import { LoginForm } from "./Login";
import { CreateUser } from "./CreateUser"; // Importer le composant CreateUser
import { Meteor } from "meteor/meteor";
import Profile from "./Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Swipe from "./Swipe";
import Navbar from "./Navbar";
import Bookings from "./Bookings";
import { useTracker } from "meteor/react-meteor-data";

export const App = () => {
    const user = useTracker(() => Meteor.user());

    function onLogout() {
        Meteor.logout();
    }

    return (
        <div className='main'>
            {user ? (
                <>
                    <Fragment>
                        <BrowserRouter>
                            <Routes>
                                <Route path='/'>
                                    <Route index element={<Swipe />} />
                                    <Route path='/profile' element={<Profile onLogout={onLogout} />} />
                                    <Route path='/bookings' element={<Bookings />} />
                                </Route>
                            </Routes>
                            <Navbar />
                        </BrowserRouter>
                    </Fragment>
                </>
            ) : (
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginForm />} />
                        <Route path="/create-user" element={<CreateUser />} />
                    </Routes>
                </BrowserRouter>
            )}
        </div>
    );
};

export default App;
