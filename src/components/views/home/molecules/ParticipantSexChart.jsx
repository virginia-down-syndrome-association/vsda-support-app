import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import '../style.scss'

ChartJS.register(ArcElement, Tooltip, Legend)

const dataFactory = (participants) => {
  const sexes = participants.map(({ properties }) => properties.Sex)

  const data = [
    sexes.filter(sex => sex === 'male').length,
    sexes.filter(sex => sex === 'female').length,
    sexes.filter(sex => sex !== 'male' && sex !== 'female').length
  ]
  return {
    labels: ['Male', 'Female', 'Prefer not to say'],
    datasets: [
      {
        label: 'Participant Sex',
        data,
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
}

export default function ParticipantSexChart (props) {
  const { participants } = useSelector(state => state.participants)
  const [data, setData] = useState(null)

  useEffect(() => {
    if (participants.length > 0) {
      setData(dataFactory(participants))
    }
  }, [participants])

  return (
    <div className='sexPie'>
      { data && <Doughnut data={data} /> }
    </div>
  )
}
