import React from 'react';
import ReactDOM from 'react-dom';
import { toast } from 'react-toastify';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Sidebar, SidebarProps } from './components/Sidebar';
import DragRegion from './components/DragRegion';
import Home from './routes/Home';
import Inventory from './routes/Inventory';

import './styles/index.scss';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const routes: SidebarProps = {
    routes: [
        {
            route: '/',
            name: 'Home',
            image: 'https://img.icons8.com/fluent/100/000000/home.png'
        },
        {
            route: '/inventory',
            name: 'Inventory',
            image: 'https://img.icons8.com/plasticine/100/000000/move-by-trolley.png',
        },
        {
            route: '/sales',
            name: 'Sales',
            image: 'https://img.icons8.com/dusk/100/000000/sales-performance.png'
        },
        {
            route: '/shipments',
            name: 'Shipments',
            image: 'https://img.icons8.com/plasticine/100/000000/in-transit.png'
        },
        {
            route: '/settings',
            name: 'Settings',
            image: 'https://img.icons8.com/cotton/64/000000/settings--v1.png'
        }
    ]
}

ReactDOM.render(
    <div className="App">
        <Router>
            <Sidebar {...routes} />
            <DragRegion />
            <Route exact path="/" component={Home} />
            <Route path="/inventory" component={Inventory} />
        </Router>
    </div>,
    document.getElementById('app')
)