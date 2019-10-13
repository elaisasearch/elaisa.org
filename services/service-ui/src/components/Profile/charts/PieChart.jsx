import React from 'react';
import {
    PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['grey', 'red', 'blue', 'orange', 'yellow', 'purple', 'green'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};


/**
 * The pie chart component for user statistics.
 * @param {object} props the given properties.
 * @returns {JSX} pie chart.
*/
const PieChartComponent = (props) => {

    const { dataPoints } = props;

    return (
        <PieChart width={400} height={400} style={{
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Legend verticalAlign="top" height={36} />
            <Pie
                data={dataPoints}
                cx={200}
                cy={200}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius='80%'
                dataKey="value"
                nameKey='name'
            >
                {
                    dataPoints.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
            </Pie>
        </PieChart>
    );
}

export default PieChartComponent; 