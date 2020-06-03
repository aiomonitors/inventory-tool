import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DragRegion from './components/DragRegion';
import Home from './routes/Home';

import './styles/index.scss';

ReactDOM.render(
    <div className="App">
        <Router>
            <Sidebar />
            <DragRegion />
            <Route exact path="/" component={Home} />
        </Router>
    </div>,
    document.getElementById('app')
)