import React from "react";
import PropTypes from "prop-types";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { curveLinear, curveCatmullRom } from "d3-shape";
import { ChartCanvas, Chart, ZoomButtons } from "react-stockcharts";
import {
  	BarSeries,
	  OHLCSeries,
	  ElderRaySeries,
    StraightLine,
    CandlestickSeries,
    LineSeries, AreaSeries
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
	CrossHairCursor,
	EdgeIndicator,
	MouseCoordinateX,
    MouseCoordinateY,
    PriceCoordinate
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {
	OHLCTooltip,
	SingleValueTooltip,
} from "react-stockcharts/lib/tooltip";
import { change, elderRay } from "react-stockcharts/lib/indicator";
import { fitWidth, fitDimensions } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

class TradingViewChart extends React.Component {
    constructor(props) {
        super(props);
        this.saveNode = this.saveNode.bind(this);
        this.resetYDomain = this.resetYDomain.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.state={

        }
      }
      componentWillMount() {
        this.setState({
          suffix: 1
        });
      }

      componentDidMount() {

      }
      saveNode(node) {
        this.node = node;
      }
      resetYDomain() {
        this.node.resetYDomain();
      }
      handleReset() {
        this.setState({
          suffix: this.state.suffix + 1
        });
      }
      render() {
  
        const { type,  ratio, interpolation, containerWidth, containerHeight, width } = this.props;

        const { mouseMoveEvent, panEvent, zoomEvent, zoomAnchor } = this.props;
        const { clamp } = this.props;
    
        const { data: initialData } = this.props;
    
        const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
          d => d.date
        );
        const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
          initialData
        );
    
        const start = xAccessor(last(data));
        const end = xAccessor(data[Math.max(0, data.length - 150)]);
        const xExtents = [start, end];
    
        const margin = { left: 30, right: 40, top: 10, bottom: 30 };
    
        const height = this.props.containerHeight - 12;
        // const height = 500 - 12;
    
        const gridHeight = height - margin.top - margin.bottom;
        const gridWidth = containerWidth - margin.left - margin.right;
        // const gridWidth = width - margin.left - margin.right;
    
        const showGrid = true;
        const yGrid = showGrid
          ? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.2 }
          : {};
        const xGrid = showGrid
          ? { innerTickSize: -1 * gridHeight, tickStrokeOpacity: 0.2 }
          : {};
        console.log('Container Width = ', containerWidth);
        return (
          <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <ChartCanvas
            ref={this.saveNode}
            height={height}
            // height={500}
            ratio={ratio}
            width={containerWidth}
            // width={width}
            margin={margin}
            padding={0}
            mouseMoveEvent={mouseMoveEvent}
            panEvent={panEvent}
            zoomEvent={zoomEvent}
            clamp={clamp}
            zoomAnchor={zoomAnchor}
            type={type}
            seriesName={`MSFT_${this.state.suffix}`}
            data={data}
            xScale={xScale}
            xExtents={xExtents}
            xAccessor={xAccessor}
            displayXAccessor={displayXAccessor}
          >
            <Chart id={1} yExtents={d => [d.high, d.low]}>
              <XAxis
                axisAt="bottom"
                orient="bottom"
                showTickLabel={false}
                showTick={true}
                showDomain={true}
                zoomEnabled={zoomEvent}
                {...xGrid}
                //tickStroke={'#11203d'}
                tickStroke={'#95c0e9'}
                tickStrokeOpacity={0.05}
                stroke={'#11203d'}
                opacity={1}
                fontFamily={"Roboto-Regular"}
                fontSize={8.53}
              />
              <YAxis
                axisAt="right"
                orient="right"
                ticks={5}
                zoomEnabled={zoomEvent}
                {...yGrid}
                tickStroke={'#95c0e9'}
                tickStrokeOpacity={0.05}
                stroke={'#11203d'}
                opacity={1}
                fontFamily={"Roboto-Regular"}
                fontSize={8.53}
              />
              <PriceCoordinate
                at="right"
                orient="right"
                price={last(data).close}
                displayFormat={format(".2f")}
                arrowWidth={0}
                yAxisPad={50}
                fill='transparent'
                rectWidth={40}
                rectHeight={20}
                lineStroke={last(data).close > last(data).open ? "#3db890" : "#ec3256"}
                lineOpacity={1}
                strokeDasharray="ShortDot"                
                />
              <MouseCoordinateY
                at="right"
                orient="right"
                displayFormat={format(".2f")}
                fill={'transparent'}
                //stroke={d => d.close > d.open ? "#3db890" : "#ec3256"}
              />
              <CandlestickSeries wickStroke={d => d.close > d.open ? "#3db890" : "#ec3256"} 
              stroke={d => d.close > d.open ? "#3db890" : "#ec3256"} 
              fill={d => d.close > d.open ? "#3db890" : "#ec3256"}
              opacity={1}/>              
              <ZoomButtons onReset={this.handleReset} size={[20, 20]} fill={'#4a72b6'} fillOpacity={1} rx = {10} ry={10} textDy={".10em"}/>
              {/* <LineSeries
                yAccessor={d => d.low}
                // interpolation={interpolation}
                interpolation={curveCatmullRom}
                strokeOpacity={1}
                strokeWidth={4}
                stroke="#527cbf"
                fill="transparent"
              /> */}
            </Chart>
            <CrossHairCursor />
          </ChartCanvas>
          </div>
        );
      }
}

TradingViewChart.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

TradingViewChart.defaultProps = {
	type: "svg",
};
// TradingViewChart = fitDimensions(TradingViewChart);
TradingViewChart = fitWidth(TradingViewChart);

export default TradingViewChart;
