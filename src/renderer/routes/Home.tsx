import React from 'react';
import { InfoBox, AnalyticsChart, MonthTotals } from '../components/HomeComponents';

import '../styles/Home.scss';

const Home: React.FunctionComponent = () => {
    const sales: MonthTotals = [
        {
            month: 'Jan',
            value: 1000
        },
        {
            month: 'Feb',
            value: 2000,
        },
        {
            month: 'Mar',
            value: 2500,
        },
        {
            month: 'Apr',
            value: 4000
        },
    ];

    const inventory: MonthTotals = [
        {
            month: 'Jan',
            value: 1000
        },
        {
            month: 'Feb',
            value: 1000,
        },
        {
            month: 'Mar',
            value: 4000,
        },
        {
            month: 'Apr',
            value: 6000
        },
    ];

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
            <div className="bottom-content">
                <AnalyticsChart sales={sales} inventory={inventory} />
            </div>  
        </main>
    )
}

export default Home;