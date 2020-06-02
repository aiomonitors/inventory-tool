import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';

ReactDOM.render(
    <div className="App">
        <Sidebar />
        <Home />
    </div>,
    document.getElementById('app')
)