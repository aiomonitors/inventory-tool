import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ReleaseProduct } from '../../common/types';

type InfoBoxProps = {
    name: string;
    value: number;
    prev: number;
    pos: boolean;
    small?: boolean;
};

interface MonthTotal {
    month: string;
    value: number;
};

export type MonthTotals = MonthTotal[];

type SalesChartProps  = {
    sales: MonthTotals;
    inventory: MonthTotals;
    profits: MonthTotals;
};

/**
 * # InfoBox
 * Represents an informational box on the Home route
 * Used to show inventory, sales, and total profits
 */
export const InfoBox = (props: InfoBoxProps) => {
    const {
        name, 
        value, 
        prev, 
        pos,
        small 
    } = props;
    const className = `info-box ${small ? ' small' : ''} ${pos ? 'pos' : 'neg'}`;

    return (
        <div className={className}>
            <div className="title">{ name }</div>
            <div className="value">${ value }</div>
            <div className="bottom">
                {
                    !pos ?
                    (
                        <div className="arrow neg">&#8595;</div>
                    ) : 
                    (
                        <div className="arrow pos">&#8593;</div>
                    )
                }
                <div className="prev-value">
                    { prev }
                </div>
            </div>
        </div>
    )
};

/**
 * # AnalyticsChart
 * Displays information on the total sales and inventory by month
 */
export const AnalyticsChart = (props: SalesChartProps) => {
    const { sales, inventory, profits } = props;
    const salesData = sales.map((s: MonthTotal) => {
        return {
            x: s.month,
            y: s.value
        };
    });
    const inventoryData = inventory.map((s: MonthTotal) => {
        return {
            x: s.month,
            y: s.value,
        }
    });
    const profitData = profits.map((s: MonthTotal) => {
        return {
            x: s.month,
            y: s.value,
        }
    })
    const chartSeries = [
        {
            data: salesData,
            name: 'Sales',
            type: 'area',
        },
        {
            data: inventoryData,
            name: 'Inventory',
            type: 'area',
        },
        {
            data: profitData,
            name: 'Profits',
            type: 'area',
        }
    ];
    const chartOptions = {
        chart: {
            height: "100px",
            toolbar: {
                show: false,
            },
            foreColor: 'white'
        },
        xaxis: {
            type: 'category',
        },
        stroke: {
            curve: 'smooth',
        },
        fill: {
        type: 'gradient',
        gradient: {
            opacityFrom: 0.3,
            opacityTo: 0.4,
        }
        },
    };

    return (
        <div className="chart">
            <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                width="600"
            />
        </div>
    )
};

/**
 * # ReleaseItem
 * Represents a release item on the homepage
 */
export const ReleaseItem = (props: ReleaseProduct) => {
    const {
        name,
        image,
        price,
        SKU,
        date
    } = props;
    return (
        <div className="release-item">
           <div className="info-container">
               <div className="name">{ name }</div>
               <div className="sku">{ SKU }</div>
               <div className="price">${ price.toString().replace('$', '') }</div>
               <div className="date">{ date }</div>
           </div>
           <img src={image} />
        </div>
    )
};
