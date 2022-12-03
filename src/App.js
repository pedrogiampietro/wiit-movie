import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Routes from './routes'

import Myloader from 'react-spinners/ClipLoader'
import myLogo from './assets/images/wiit-logo.png'
import NotFound from './pages/Errors/NotFound'
// import RoutesAuth from './routes/RoutesAuth'

import { AuthContextProvider } from './contexts/AuthContext'

import 'bootstrap/dist/css/bootstrap.min.css'
import './../node_modules/touch-loader/touchLoader'
import './App.css'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function App() {
	const [spinner, setSpinner] = useState(true)

	useEffect(() => {
		setTimeout(() => setSpinner(false), 500)
	}, [])

	return (
		<>
			{!spinner ? (
				<AuthContextProvider>
					<BrowserRouter>
						<Switch>
							<Route path='/error' exact={true} component={NotFound} />
							<Route path='/' component={Routes} />
							{/* <Route path='/(login)' exact component={RoutesAuth} /> */}
						</Switch>
						<ToastContainer />
					</BrowserRouter>
				</AuthContextProvider>
			) : (
				<div className='load_app' style={{ height: '400px' }}>
					<Myloader
						color='grey'
						size={80}
						className='m__load'
						speedMultiplier={1.5}
					/>
					<img src={myLogo} alt='' width='300' className='logo2 pt-4' />{' '}
				</div>
			)}
		</>
	)
}
