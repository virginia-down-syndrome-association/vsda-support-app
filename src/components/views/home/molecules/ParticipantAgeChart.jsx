import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)


//
const labels = [
  '0-1', // 0
  '1-2', // 1
  '3-5', // 2
  '6-12', // 3
  '13-18', // 4
  '18-25', // 5
  '26-45', // 6
  '45 and above' // 7
]

const ageData = [
  4, // 0
  3, // 1
  5, // 2
  5, // 3
  2, // 4
  3, // 5
  2, // 6
  1 // 7
]

const data = {
  labels,
  datasets: [
    {
      label: 'Age Range',
      data: ageData,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ]
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
  return (
    <>
      <Bar options={options} data={data} />;
    </>
  )
}
