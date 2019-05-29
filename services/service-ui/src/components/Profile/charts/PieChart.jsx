import React from 'react';
import CanvasJSReact from '../canvas/canvasjs.react';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PieChart = (props) => {

    const { dataPoints } = props;

    const options = {
        animationEnabled: true,
        data: [{
            type: "pie",
            showInLegend: false,
            legendText: "{label}",
            toolTipContent: "{label}: <strong>{y}%</strong>",
            indexLabelPlacement: "inside",
            dataPoints: dataPoints
        }]
    }
    return (
        <div>
            <CanvasJSChart options={options}
            /* onRef={ref => this.chart = ref} */
            />
            {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
        </div>
    );
}

export default PieChart; 