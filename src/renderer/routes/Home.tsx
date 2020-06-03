import React from 'react';
import { InfoBox, AnalyticsChart, MonthTotals, ReleaseItem } from '../components/HomeComponents';
import { ReleaseProduct } from '../../common/types';

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

    const profits: MonthTotals = [
        {
            month: 'Jan',
            value: 200
        },
        {
            month: 'Feb',
            value: 400,
        },
        {
            month: 'Mar',
            value: 800,
        },
        {
            month: 'Apr',
            value: 1000
        },
    ];

    const exampleReleases: ReleaseProduct[] = [
        {
            name: 'Nike Air Max 95 GREEDY 2.0',
            image: 'https://i.imgur.com/9LPuorG.png',
            price: 190,
            SKU: 'CJ0589-001',
            date: 'June 8th'
        },
        {
            name: 'Nike Air Jordan 6 HARE',
            image: 'https://i.imgur.com/SEWj1ty.png',
            price: 190,
            SKU: 'CT8529-062',
            date: 'June 5th'
        },
        {
            name: 'Nike Air Jordan 3 ANIMAL INSTINCT',
            image: 'https://i.imgur.com/5wtHOGV.jpg',
            price: 225,
            SKU: 'CV3583-003',
            date: 'June 6th'
        }
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
                <AnalyticsChart sales={sales} inventory={inventory} profits={profits} />
                <div className="releases-container">
                    <div className="title">Upcoming Releases</div>
                    <div className="content">
                        {
                            exampleReleases.map((r) => {
                                return <ReleaseItem {...r} />
                            })
                        }
                    </div>
                </div>
            </div>  
        </main>
    )
}

export default Home;