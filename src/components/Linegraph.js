import { pink, red, yellow } from "@material-ui/core/colors";
import React from "react";
import { Line } from "react-chartjs-2";
const Linegraph = ({timelineData, caseType}) => {
    let data1 = timelineData.dates
    let datesArr = []
    let casesOnDate = []
    for(let key in data1){
        if(data1.hasOwnProperty(key)){
        //console.log(data1[key].total.confirmed)
        datesArr.push(key)
        casesOnDate.push(data1[key].total[caseType])
        }
    }
    console.log(casesOnDate)
    //console.log(datesArr.slice(Math.max(datesArr.length-30,1)))
  const data = {
    labels:datesArr.slice(datesArr.length-30,datesArr.length-1),
    datasets: [
      {
        label: "Infected",
        data: casesOnDate.slice(casesOnDate.length-30,casesOnDate.length-1),
        borderColor: [red[900]],
        backgroundColor: pink[500],
        pointBackgroundColor: "pink",
        pointBorderColor: "blue",
        fill: true,
        tension: 0.3
      },
      {
        label: "Recovered",
        data: casesOnDate.slice(casesOnDate.length-30,casesOnDate.length-1),
      },
      {
        label: "Deaths",
        data: casesOnDate.slice(casesOnDate.length-30,casesOnDate.length-1),
      },
    ],
  };
  const options = {
    title: {
      display: true,
      text: "Line Chart",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 6,
            stepSize: 2,
          },
        },
      ],
      xAxes:[{
          type: 'time',
          time:{
              unit: 'day'
          }
      }]
    },
  };
  return <Line data={data} options={options}/>;
};

export default Linegraph;
