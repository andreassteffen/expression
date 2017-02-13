import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryBar, VictoryChart, VictoryLabel, VictoryAxis,VictoryTheme, VictoryArea, VictoryStack, VictoryScatter, VictoryCandlestick }  from 'victory';

const data = [
              {x: 'kidney', open: 5, close: 40, high: 45, low: 3, outlier: [17,23,43]},
              {x: 'lung', open: 10, close: 15, high: 20, low: 5, outlier: [17,23,43]},
              {x: 'eye', open: 15, close: 20, high: 25, low: 10, outlier: [17,23,43]},
              {x: 'heart', open: 5, close: 40, high: 45, low: 3, outlier: [17,23,43]},
              {x: 'brain', open: 10, close: 15, high: 20, low: 5, outlier: [17,23,43]},
              {x: 'nose', open: 15, close: 20, high: 25, low: 10, outlier: [17,23,43]},
              {x: 'hair', open: 5, close: 40, high: 45, low: 3, outlier: [17,23,43]},
              {x: 'feet', open: 10, close: 15, high: 20, low: 5, outlier: [17,23,43]},
              {x: 'testis', open: 15, close: 20, high: 25, low: 10, outlier: [17,23,43]},
              {x: 'knee', open: 5, close: 40, high: 45, low: 3, outlier: [17,23,43]},
              {x: 'liver', open: 10, close: 15, high: 20, low: 5, outlier: [17,23,43]},
              {x: 'pancreas', open: 15, close: 20, high: 25, low: 10, outlier: [17,23,43]}
             ]

const chartStyle={
  width: "800px"
}

// line bottom - low
// line top - high
// box bottom - open
// box top - close
const lineStyle = {
  stroke:"black",
  strokeWidth:"1"
}
const medianStyle = {
  stroke:"white",
  strokeWidth:1
}
const rectStyle = {
  fill:"black",
  strokeWidth:"1"
}
const labelStyle = {
  cursor:"pointer"
}
class BoxPlot extends React.Component {
  componentWillMount() {
    const {style, candleWidth } = this.calculateAttributes(this.props);
    this.style = style;
    this.candleWidth = candleWidth;
  }
  calculateAttributes(props) {
    const {data, datum, active, width} = props;
    const style =  props.style;
    const padding = props.padding.left || props.padding;
    const candleWidth = style.width || 0.5 * (width - 2 * padding) / data.length;
    return { style, candleWidth };
  }
  render() {
    const {x, y, y1, y2, candleHeight, width, scale, datum} = this.props;
    return (
      <g>
        <line style={lineStyle} x1={x} x2={x} y1={y1} y2={y2} />
        <rect style={rectStyle} x={x-this.candleWidth/2} y={y} width={this.candleWidth} height={candleHeight} />
        <line style={medianStyle} x1={x-this.candleWidth/2} x2={x+this.candleWidth/2} y1={y+candleHeight/2} y2={y+candleHeight/2} />
        <text x={x} y={y}>        
          {console.log(this.props)}
          {console.log(x,y,y1,y2, candleHeight, width)}
        </text>
      </g>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div style={chartStyle}>
        <VictoryChart   domain={{y:[0, 60]}}           domainPadding = {40}>
        <VictoryAxis orientation="bottom" 
                         tickLabelComponent={<VictoryLabel style={labelStyle} events={{onClick: (evt) => alert("x: " + evt.clientX)}} dx={-5} dy={-0.1} textAnchor="start" verticalAnchor="middle" angle={90}/>}
                    />
                    <VictoryAxis dependentAxis />
          <VictoryCandlestick
            data={data}
            style={{
              data: {fill: (d) => d.close > 10 ? "red" : "blue"},
              labels: {fontSize: 12},
              parent: {border: "5px solid #ccc"}
            }}
            dataComponent={<BoxPlot />}
          />

        </VictoryChart>
      </div>
    );
  }
}
const app = document.getElementById('app');
ReactDOM.render(<App/>, app);