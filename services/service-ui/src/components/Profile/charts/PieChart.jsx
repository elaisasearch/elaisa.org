import React from 'react';
import CanvasJSReact from '../canvas/canvasjs.react';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

/**
 * The pie chart component for user statistics.
 * @param {object} props the given properties.
 * @returns {JSX} pie chart.
*/
const PieChart = (props) => {

    const { dataPoints } = props;

    const options = {
        animationEnabled: true,
        data: [{
            type: "pie",
            showInLegend: false,
            legendText: "{label}",
            toolTipContent: "{label}: <strong>{y}</strong>",
            indexLabelPlacement: "inside",
            dataPoints: dataPoints
        }]
    }
    return (
        <CanvasJSChart options={options} />
    );
}

export default PieChart; 