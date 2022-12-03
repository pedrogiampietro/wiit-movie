import { createContext, useEffect, useState } from 'react'
import { auth } from '../constants/auth'

import {
	getFromLocalStorage,
	removeStorage,
	saveToLocalStorage,
} from '../utils/localStorage'
import { apiClient } from '../services/api'
import { toast } from 'react-toastify'

export const AuthContext = createContext({})

export function AuthContextProvider({ children }) {
	const [error, setError] = useState()
	const [loading, setLoading] = useState(true)
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	useEffect(() => {
		const token = getFromLocalStorage(auth.TOKEN)

		if (token) {
			setIsAuthenticated(true)
		} else {
			setIsAuthenticated(false)
			setLoading(false)
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	async function signIn(login) {
		try {
			const response = await apiClient().post('/sign-in', login)

			saveToLocalStorage(auth.TOKEN, response.data.tokens.token)
			saveToLocalStorage(auth.REFRESH_TOKEN, response.data.tokens.refreshToken)
			saveToLocalStorage(auth.USER, {
				email: response.data.email,
				name: response.data.name,
			})
			setIsAuthenticated(true)

			apiClient().defaults.headers[
				'Authorization'
			] = `Bearer ${response.data?.token}`

			toast.success(
				'Olá! Que bom te ver por aqui, seu login foi um sucesso! 😍',
				{
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				}
			)

			const timeOutRedirect = setTimeout(() => {
				window.location.href = '/admin'
			}, 1000)

			return () => clearTimeout(timeOutRedirect)
		} catch ({ response }) {
			setError(response.data)
			toast.error(response.data, {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			})
		}
	}

	async function signOut() {
		setIsAuthenticated(false)
		removeStorage(auth.TOKEN)
		removeStorage(auth.REFRESH_TOKEN)
		removeStorage(auth.USER)

		toast.success('Ahhh, você já está indo? Isso será um até logo! 😁', {
			position: 'top-right',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		})

		const timeOutRedirect = setTimeout(() => {
			window.location.href = '/login'
		}, 1000)

		return () => clearTimeout(timeOutRedirect)
	}

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				error,
				setError,
				loading,
				signIn,
				signOut,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
