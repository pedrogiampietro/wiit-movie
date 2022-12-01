import axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import SingleData from '../../components/SingleData/SingleData'
import './Home.css'
import { Link } from 'react-router-dom'

import LocalSearch from '../../components/Search/LocalSearch'

import Navbar from '../../components/HomeNav/HomeNav'
import Myloader from 'react-spinners/PuffLoader'
import Slider from '../../components/Slider'

const Home = () => {
	const [allContent, setAllContent] = useState([])
	const [popularSeries, setPopularSeries] = useState([])
	const [topRated, setTopRated] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	// eslint-disable-next-line
	let [color, setColor] = useState('grey')

	const [trendingMoviesData, setTrendingMoviesData] = useState([])
	const [trendingTvShows, setTrendingTvShows] = useState([])
	const [latestMovies, setLatestMovies] = useState([])
	const [latestTvShows, setLatestTvShows] = useState([])

	const history = useHistory()

	useEffect(() => {
		window.scroll(0, 0)

		getTrendingMoviesData()
		getTrendingTvShows()
		getLatestMovies()
		getLatestTvShows()
	}, [])

	async function getTrendingMoviesData() {
		setIsLoading(true)
		try {
			let res = await fetch(
				`https://streaminal-api.onrender.com/get-trending-movies`
			)
			res = await res.json()
			setTrendingMoviesData(res.trendingMovies)

			setIsLoading(false)
		} catch (e) {
			console.log(e)
		}
	}

	async function getTrendingTvShows() {
		setIsLoading(true)
		try {
			let res = await fetch(
				`https://streaminal-api.onrender.com/get-trending-tv-shows`
			)
			res = await res.json()
			setTrendingTvShows(res.trendingTvShows)
			setIsLoading(false)
		} catch (e) {
			console.log(e)
		}
	}

	async function getLatestMovies() {
		setIsLoading(true)
		try {
			let res = await fetch(
				`https://streaminal-api.onrender.com/get-latest-movies`
			)
			res = await res.json()
			setLatestMovies(res.latestMovies)
			setIsLoading(false)
		} catch (e) {
			console.log(e)
		}
	}

	async function getLatestTvShows() {
		setIsLoading(true)
		try {
			let res = await fetch(
				`https://streaminal-api.onrender.com/get-latest-tv-shows`
			)
			res = await res.json()
			setLatestTvShows(res.latestTvShows)
			setIsLoading(false)
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<>
			{isLoading ? (
				<div className='major' style={{ height: '600px' }}>
					<Myloader color={color} size={60} />
				</div>
			) : (
				<>
					<LocalSearch
						onSearch={(q) => {
							history.push(`/search/${q}`)
						}}
						placehold='Search Movies'
					/>

					<div className='bg__home'>
						<Navbar />
					</div>

					<>
						<Slider title='Filmes em alta' data={trendingMoviesData} />
						<Slider title='Series em Alta' data={trendingTvShows} />
						<Slider title='Últimos filmes' data={latestMovies} />
						<Slider title='Últimas séries' data={latestTvShows} />
					</>
				</>
			)}
		</>
	)
}

export default Home
