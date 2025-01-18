import React, { Fragment } from "react";
import { LoginForm } from "./Login";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import Profile from "./Profile";
import { BrowserRouter, Route, Routes, Link, useNavigate } from "react-router-dom";
import Swipe from "./Swipe";
import Navbar from "./Navbar";

export const App = () => {
    const user = useTracker(() => Meteor.user());


    function onLogout() {
        Meteor.logout();
    }

    return (
        <div className='main'>
            {user ? (<>
                <Fragment>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/'>
                                <Route index element={<Profile onLogout={onLogout} />} />
                                <Route path='/swipe' element={<Swipe />} />
                                {/* <Route path='*' element={<NoPage />} /> */}
                            </Route>
                        </Routes>
                        <Navbar />
                    </BrowserRouter>
                </Fragment>

            </>) : (
                <LoginForm />
            )}
        </div>
    );
};

export default App;