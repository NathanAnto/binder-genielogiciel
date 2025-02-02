import React, { Fragment } from "react";
import { LoginForm } from "./Login";
import { CreateUser } from "./CreateUser"; // Import the CreateUser component
import { Meteor } from "meteor/meteor";
import Profile from "./Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Swipe from "./Swipe";
import Navbar from "./Navbar";
import Bookings from "./Bookings";
import { useTracker } from "meteor/react-meteor-data";

/**
 * Main application component.
 * @returns {JSX.Element} The main application component.
 */
export const App = () => {
    const user = useTracker(() => Meteor.user());

    /**
     * Handles user logout.
     */
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
                                <Route index element={<Swipe />} />
                                <Route path='/profile' element={<Profile onLogout={onLogout} />} />
                                <Route path='/bookings' element={<Bookings />} />
                            </Routes>
                            <Navbar />
                        </BrowserRouter>
                    </Fragment>
                </>
            ) : (
                <BrowserRouter>
                    <Routes>
                        <Route index element={<LoginForm />} />
                        <Route path="/create-user" element={<CreateUser />} />
                    </Routes>
                </BrowserRouter>
            )}
        </div>
    );
};

export default App;