import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Chat from "@/components/chat";
import Login from "@/components/login";
import "@/style/App.scss";


function App() {
    const [user, setUser] = useState(null);
    const [secret, SetSecret] = useState(null);
    const isAuth = !!user && !!secret;


    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            isAuth ? (
                                <Navigate to="/chat" />
                            ) : (
                                <Login setUser={setUser} setSecret={SetSecret} />
                            )
                        }
                    /> 
                    <Route 
                        path="/chat" 
                        element={
                            isAuth ? (
                                <Chat user={user} secret={secret} />
                            )  : (
                                <Navigate to="/" />
                            )
                    } />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
