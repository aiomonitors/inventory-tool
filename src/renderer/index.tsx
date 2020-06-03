import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './components/Sidebar';
import DragRegion from './components/DragRegion';
import Home from './routes/Home';

import './styles/index.scss';

ReactDOM.render(
    <div className="App">
        <Sidebar />
        <DragRegion />
        <Home />
    </div>,
    document.getElementById('app')
)