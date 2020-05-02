import React from 'react';
import './App.css';
import TopNavigationBar from "./components/TopNavigationBar";
import BottomBar from "./components/BottomBar";
import AdminFrontPage from "./components/AdminFrontPage";

function App() {
    return (
        <div>
            <TopNavigationBar/>
            <div className="adminfrontpage">
                <AdminFrontPage/>
            </div>
            <BottomBar/>
        </div>
    );
}

export default App;
