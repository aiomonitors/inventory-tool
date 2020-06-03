import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface InfoBoxProps {
    name: string;
    value: number;
    prev: number;
    pos: boolean;
};

interface MonthTotal {
    month: string;
    value: number;
};

export type MonthTotals = MonthTotal[];

interface SalesChartProps  {
    sales: MonthTotals;
    inventory: MonthTotals;
};

/**
 * # InfoBox
 * Represents an informational box on the Home route
 * Used to show inventory, sales, and total profits
 */
export const InfoBox: React.FunctionComponent<InfoBoxProps> = ({ name, value, prev, pos }) => {
    const className = `info-box ${pos ? 'pos' : 'neg'}`;

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
export const AnalyticsChart: React.FunctionComponent<SalesChartProps> = ({ sales, inventory }) => {
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
        }
    ];

    const chartOptions = {
        chart: {
            height: 100,
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

