import React from 'react';
import CanvasJSReact from '../canvas/canvasjs.react';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PieChart = (props) => {

    const { dataPoints, title } = props;

    const options = {
        animationEnabled: true,
        title:{
            text: title
        },
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