import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import Header from '../../Components/Header'
import Results from '../../components/Results'
import styles from './styles.module.scss'

export default function SearchResults() {
	const [results, setResults] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const { query } = useParams()

	async function getSearchResults(query) {
		try {
			let res = await fetch(`https://api.consumet.org/movies/flixhq/${query}`)
			res = await res.json()
			setResults(res.results)
			setIsLoading(false)
		} catch (e) {
			console.log(e)
		}
	}

	useEffect(() => {
		getSearchResults(query)
	}, [query])

	return (
		<div className='mainContainer'>
			{isLoading ? (
				<div className={styles.loader}>
					<div className='lds-ripple'>
						<div></div>
						<div></div>
					</div>
				</div>
			) : (
				<div className={styles.results}>
					<Results results={results} />
				</div>
			)}
		</div>
	)
}
