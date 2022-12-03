import { Redirect, Route } from 'react-router-dom'
import { SignIn } from '../pages/Login'

const RoutesAuth = () => {
	return (
		<>
			<Route exact path='/' render={() => <Redirect to='/login' />} />
			<Route path='/login' component={SignIn} exact />
		</>
	)
}

export default RoutesAuth
