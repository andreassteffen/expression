import React from 'react';
import { VictoryBar, VictoryChart, VictoryLabel, VictoryAxis,VictoryTheme,  VictoryCandlestick }  from 'victory';
import BoxPlot from './BoxPlot';
import SymbolInput from './SymbolInput';


const chartStyle={
  width: "1000px",
  paddingBottom:100
}

const labelStyle = {
  cursor:"pointer",
  fontSize: 8
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {data: []}
    this.fetchData = this.fetchData.bind(this);
  }
  componentDidMount(){
  }
  fetchData(symbol) {
    console.log("ASDFASDF", event.target);
    fetch('api/expression/'+symbol)
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
        <SymbolInput handleSubmit={this.fetchData}/>

        <VictoryChart  domainPadding={40}>
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
