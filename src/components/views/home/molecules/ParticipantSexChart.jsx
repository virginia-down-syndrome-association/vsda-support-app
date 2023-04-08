import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import '../style.scss'

ChartJS.register(ArcElement, Tooltip, Legend)

const data = {
  labels: ['Male', 'Female', 'Other'],
  datasets: [
    {
      label: 'Participant Sex',
      data: [6, 3, 1],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }
  ]
}

export default function ParticipantSexChart (props) {
  return (
    <div className='sexPie'>
      <Doughnut data={data} />;
    </div>
  )
}
