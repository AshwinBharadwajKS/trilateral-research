import React from 'react'
import { Line } from 'react-chartjs-2'

export default class PersonList extends React.Component {
    state = {
        calendar: [],
        carbonIntensity: [],
        actual: [],
        forecast: []
      }
      render() {
        return (
            <div>
              <h4 className = "header">Plot of actual vs forecast carbon intensity for {this.props.date}</h4>  
              <Line
                data={{
                  labels: this.props.labels,
                  datasets: [
                    {
                      label: 'Actual Carbon Intensity',
                      data: this.props.actual,
                      backgroundColor: [
                        'rgba(255,255,255, 0.2)'
                      ],
                      borderWidth: 4,
                      borderColor: ['rgba(199, 0, 57, 0.5)'],
                      pointBorderColor: ['rgba(254, 37, 0, 0.2)'],
                      pointRadius: 1
                    },
                    {
                        label: 'Forecast Carbon Intensity',
                        data: this.props.forecast,
                        backgroundColor: [
                            'rgba(255,255,255,0.2)'
                        ],
                        borderWidth: 4,
                        borderColor: ['rgba(58, 222, 32 , 0.5)'],
                        pointBorderColor: ['rgba(3, 246, 251, 0.2)'],
                        pointRadius: 1
                      },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          beginAtZero: true,
                        },
                      },
                    ],
                  },
                  legend: {
                    labels: {
                      fontSize: 25,
                    },
                  },
                }}
              />
            </div>
          )
      }
}

