import React from 'react';

const lineStyle = {
  stroke:"black",
  strokeWidth:"1"
}
const medianStyle = {
  stroke:"white",
  strokeWidth:1
}
const rectStyle = {
  fill:"blue",
  strokeWidth:"1"
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

export default BoxPlot;