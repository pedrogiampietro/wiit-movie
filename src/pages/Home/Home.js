import axios from 'axios'
import { useEffect, useState } from 'react'
import SingleData from '../../components/SingleData/SingleData'
import './Home.css'
import { Link } from 'react-router-dom'

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
					<div style={{ marginTop: '-10px' }} className='bg__home'>
						<Navbar />
					</div>
					<>
						<Slider title='Trending Movies' data={trendingMoviesData} />
						<Slider title='Trending TV Shows' data={trendingTvShows} />
						<Slider title='Latest Movies' data={latestMovies} />
						<Slider title='Latest TV Shows' data={latestTvShows} />
					</>
					{/* <div className='TreadingHome3 pt-4'>
						<div className='title__home'>
							<div className='btn__home'>
								<h6>
									Movies On Air &#160;
									<span style={{ paddingTop: '10px' }}>&#11166;</span>
								</h6>
							</div>
							<div className='view__more'>
								<Link to='/all-movies' style={{ textDecoration: 'none' }}>
									<p>View more &#187;</p>
								</Link>
							</div>
						</div>

						<div className='ListContent2'>
							{allContent &&
								allContent.map((n) => (
									<SingleData key={n.id} {...n} mediaType='movie' />
								))}
						</div>
					</div>
					<hr />
					<div className='TreadingHome3'>
						<div className='title__home'>
							<div className='btn__home'>
								<h6>
									TvSeries On Air &#160;
									<span style={{ paddingTop: '10px' }}>&#11166;</span>
								</h6>
							</div>
							<div className='view__more'>
								<Link to='/all-series' style={{ textDecoration: 'none' }}>
									<p>View more &#187;</p>
								</Link>
							</div>
						</div>
						<div className='ListContent2'>
							{popularSeries &&
								popularSeries.map((n) => (
									<SingleData key={n.id} mediaType='tv' {...n} />
								))}
						</div>
					</div>
					<hr />
					<div className='TreadingHome3'>
						<div className='title__home'>
							<div className='btn__home' style={{ width: '160px' }}>
								<h6>
									Top Rated &#160;
									<span style={{ paddingTop: '10px' }}>&#11166;</span>
								</h6>
							</div>
							<div className='view__more'>
								<Link to='/all-movies' style={{ textDecoration: 'none' }}>
									<p>View more &#187;</p>
								</Link>
							</div>
						</div>
						<div className='ListContent2'>
							{topRated &&
								topRated.map((n) => (
									<SingleData key={n.id} mediaType='movie' {...n} />
								))}
						</div>
					</div> */}
				</>
			)}
		</>
	)
}

export default Home
