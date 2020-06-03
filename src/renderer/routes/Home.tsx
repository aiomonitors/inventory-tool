import React from 'react';
import { InfoBox } from '../components/HomeComponents';

import '../styles/Home.scss';

const Home: React.FunctionComponent = () => {
    return (
        <main className="main">
            <div className="top-content">
                <InfoBox
                    name="Inventory Value"
                    value={10000}
                    prev={2000}
                    pos={true}
                />
                <InfoBox
                    name="Total Sales"
                    value={5000}
                    prev={2000}
                    pos={true}
                />
                <InfoBox
                    name="Total Profits"
                    value={1750}
                    prev={2000}
                    pos={false}
                />
            </div>  
        </main>
    )
}

export default Home;