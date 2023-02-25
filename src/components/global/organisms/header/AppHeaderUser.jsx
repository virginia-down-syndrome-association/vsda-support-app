import { Dropdown, Icon } from 'semantic-ui-react'
import { signOut } from '@/utilities/oauth'
import { useSelector } from 'react-redux'

export default function UserMenu () {
  const userId = useSelector((state) => state.auth.credential.userId)

  const trigger = (
    <span>
      <Icon name='user' /> Welcome. {userId}
    </span>
  )

  const handleClick = (e) => { if (e.target.innerText === 'Sign Out') signOut() }

  const options = [
    {
      key: 'user',
      text: (
        <span>
          Signed in as <strong>{userId}</strong>
        </span>
      ),
      disabled: true
    },
    { key: 'faq', text: 'FAQ', event: 'nav-faq' },
    { key: 'resources', text: 'Related Resources', event: 'nav-resources' },
    { key: 'sign-out', text: 'Sign Out', event: 'sign-out' }
  ]

  return (
    <Dropdown className="UserMenu__container"trigger={trigger} options={options} onChange={handleClick} />

  )
}
