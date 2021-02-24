import React from 'react';
import axios from 'axios';
import LineChart from './LineChart';
import './styles.css';
import Logo from './Logo.svg'


export default class PersonList extends React.Component {
  state = {
    calendar: [],
    carbonIntensity: [],
    actual: [],
    forecast: [],
    labels: [],
    selectedDate: null
  }

  componentDidMount() {
    //To get the previous 5 dates  
    let calendar = [];
    for(let x = 5; x > 0 ; x--){
        let date = new Date();
        let last = new Date(date.getTime() - (x * 24 * 60 * 60 * 1000));
        let day =last.getDate();
        let month=last.getMonth()+1;
        let year=last.getFullYear();
        let finalDate = year + "-" + month + "-" + day;
        calendar[5-x] = finalDate;
    }
    this.setState({ calendar })
  }

  plotGraph = (selectedDate) => {
    //fetching data for the selected date  
    axios.get(`https://api.carbonintensity.org.uk/intensity/date/${selectedDate}`)
      .then(res => {
        const persons = res.data;
        this.setState({ carbonIntensity: res && res.data && res.data.data, selectedDate }, () => this.storeValues());
      })
  }

  storeValues = () => {
      //storing the actual and forecast values in different arrays
      let { carbonIntensity } = this.state;
      let actual = carbonIntensity && carbonIntensity.map((data) => {
          return data.intensity.actual;
      })
      let forecast = carbonIntensity && carbonIntensity.map((data) => {
        return data.intensity.forecast;
      })
      let labels = carbonIntensity && carbonIntensity.map((data) => {
        return data.from.slice(11,16);
      })
    this.setState({ actual , forecast, labels })
  }

  render() {
    let { calendar, actual, forecast, labels, selectedDate } = this.state;
    return (
        <div>
            <div className="mainWrapper">
                <img src={Logo} className="logo"/>
                <h1 className= "header">Carbon Intensity Data</h1>
                <div className="calendarWrapper">
                    {calendar && calendar.map((date,index) => {
                        return(
                            <div className="tile" onClick={() => this.plotGraph(date)}>
                                {date}
                            </div>
                        )
                    })}
                </div>
                <div className = "graph">
                    {(actual && actual.length > 0 && forecast && forecast.length > 0) ? 
                    <LineChart actual={actual} forecast={forecast} labels={labels} date={selectedDate}/> : <h3 className = "header">Select a date to view the graph of Actual vs Forecast Carbon intensity</h3> }
                </div>
                </div>
            </div>
    )
  }
}