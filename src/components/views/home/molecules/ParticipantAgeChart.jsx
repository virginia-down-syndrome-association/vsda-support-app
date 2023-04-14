import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

// //
// const labels = [
//   '0-1', // 0
//   '1-2', // 1
//   '3-5', // 2
//   '6-12', // 3
//   '13-18', // 4
//   '18-25', // 5
//   '26-45', // 6
//   '45 and above' // 7
// ]

const labels = [
  '0-1', // 0
  '2-5', // 1
  '6-12', // 3
  '13-18', // 4
  '18-25', // 5
  '26-44', // 6
  '45 and above' // 7
]

const dataFactory = (ages) => {
  const ageSummary = [
    ages.filter(age => age >= 0 && age <= 1).length,
    ages.filter(age => age >= 2 && age <= 5).length,
    ages.filter(age => age >= 6 && age <= 12).length,
    ages.filter(age => age >= 13 && age <= 18).length,
    ages.filter(age => age >= 19 && age <= 25).length,
    ages.filter(age => age >= 26 && age <= 44).length,
    ages.filter(age => age >= 45).length
  ]

  return {
    labels,
    datasets: [
      {
        label: 'Participant Count',
        data: ageSummary,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  }
}

const options = {
  scales: {
    xAxes: [{
      display: false,
      ticks: {
        max: 3
      }
    }, {
      display: true,
      ticks: {
        autoSkip: false,
        max: 4
      }
    }],
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
}

export default function ParticipantAgeChart(props) {
  const { ages } = props
  const [data, setData] = useState({})

  useEffect(() => {
    if (ages.length > 0) {
      const newData = dataFactory(ages)
      console.log('newData', newData)
      setData(newData)
    }
  }, [ages])

  return (
    <>
      {(ages.length > 0 && data && data.datasets) && <Bar options={options} data={data} />}
    </>
  )
}
