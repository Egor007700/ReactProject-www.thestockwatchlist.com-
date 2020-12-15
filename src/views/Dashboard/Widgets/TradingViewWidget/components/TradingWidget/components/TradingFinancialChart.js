
import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { curveLinear, curveCatmullRom } from "d3-shape";
import { ChartCanvas, Chart } from "react-stockcharts";
import { LineSeries, AreaSeries } from "react-stockcharts/lib/series";

import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {
	OHLCTooltip,
} from "react-stockcharts/lib/tooltip";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";
import Dimensions from 'react-dimensions'
import { getData } from "./utils"

class TradingFinancialChart extends React.Component {
	constructor(props)
	{
	  super(props);
	  console.log('Fin Constructor');
	}
	componentWillMount()
	{

	}
	componentDidMount()
    {

	}
	componentDidUpdate()
	{

	}
	componentWillReceiveProps(nextProps){

        
    }
	render() {
		const { type, data: initialData, width, ratio} = this.props;
		const xScaleProvider = discontinuousTimeScaleProvider
			.inputDateAccessor(d => d.date);
		const {
			data,
			xScale,
			xAccessor,
			displayXAccessor,
		} = xScaleProvider(initialData);

		const start = xAccessor(last(data));
		const end = xAccessor(data[Math.max(0, data.length - 150)]);
		const xExtents = [start, end];
		return (
			<ChartCanvas 
				height={this.props.containerHeight}
				//height={200}
				ratio={ratio}
				width={this.props.containerWidth}
				// width={239}
				margin={{ left: 10, right: 10, top: 0, bottom: 0 }}
				padding={0}
				type={type}
				seriesName="MSFT"
				data={data}
				xScale={xScale}
				xAccessor={xAccessor}
				displayXAccessor={displayXAccessor}
				xExtents={xExtents}
			>
				<Chart id={1}
					yExtents={d => [d.high, d.low]}
				>
					<LineSeries
						yAccessor={d => d.close}
						//interpolation={interpolation}
						interpolation={curveCatmullRom}
						strokeOpacity={1}
						strokeWidth={4}
						stroke="#527cbf"
						fill="transparent"
					/>
				</Chart>
				{/* <CrossHairCursor /> */}
			</ChartCanvas>
		);
	}
}

TradingFinancialChart.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

TradingFinancialChart.defaultProps = {
	type: "svg",
};
TradingFinancialChart = fitWidth(TradingFinancialChart);

export default Dimensions()(TradingFinancialChart);
