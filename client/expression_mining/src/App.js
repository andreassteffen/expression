import React from 'react';
import { VictoryBar, VictoryChart, VictoryLabel, VictoryAxis,VictoryTheme,  VictoryCandlestick }  from 'victory';
import BoxPlot from './BoxPlot';

/*
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
*/

const chartStyle={
  width: "800px"
}

const labelStyle = {
  cursor:"pointer",
  fontSize: 8
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {data: []}
  }
  componentDidMount(){
    fetch('api/expression/KRAS')
    .then((response) => {
      return response.json();
    })
    .then( (data) => {
        console.log(data);
        this.setState({data:data})
    });
  }
  render() {
    return (
      <div style={chartStyle}>
        <VictoryChart domain={{y:[0, 60]}} domainPadding={40}>
        <VictoryAxis orientation="bottom" 
                         tickLabelComponent={<VictoryLabel style={labelStyle} events={{onClick: (evt) => alert("x: " + evt.clientX)}} dx={-5} dy={-0.1} textAnchor="start" verticalAnchor="middle" angle={90}/>}
                    />
                    <VictoryAxis dependentAxis  tickLabelComponent={<VictoryLabel dx={5} style={labelStyle}/>}/>
          <VictoryCandlestick
            data={this.state.data}
            dataComponent={<BoxPlot />}
          />

        </VictoryChart>
      </div>
    );
  }
}

export default App;
