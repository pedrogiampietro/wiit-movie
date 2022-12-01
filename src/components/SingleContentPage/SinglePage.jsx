import axios from 'axios'
import React, { useEffect, useState, useMemo } from 'react'
import { useLocation, useHistory, useParams } from 'react-router-dom'
import { img_300, img_500, unavailable } from '../../api/config/DefaultImages'
import SingleData from '../SingleData/SingleData'
import './SinglePage.css'
import SingleVideoPage from './SingleVideoPage'
import Myloader from 'react-spinners/ClipLoader'
import Carousel from '../Carousel/Carousel'

function useQuery() {
	const { search } = useLocation()

	return useMemo(() => new URLSearchParams(search), [search])
}

function renameKey(object, oldKey, newKey) {
	if (oldKey !== newKey) {
		Object.defineProperty(
			object,
			newKey,
			Object.getOwnPropertyDescriptor(object, oldKey)
		)
		delete object[oldKey]
	}
}

async function getMovieDetails(id) {
	try {
		let res = await fetch(
			`https://api.consumet.org/movies/flixhq/info?id=${id}`
		)
		res = await res.json()
		return res
	} catch (e) {
		console.log(e)
	}
}

async function getStreamURLS(episodeId, mediaId, server) {
	try {
		let res = await fetch(
			`https://api.consumet.org/movies/flixhq/watch?episodeId=${episodeId}&mediaId=${mediaId}&server=${server}`
		)
		res = await res.json()
		return res
	} catch (e) {
		console.log(e)
	}
}

function cleanStreamData(streamData) {
	streamData.sources.map(function (item) {
		delete item.isM3U8
		return item
	})

	streamData.sources.forEach((obj) => {
		renameKey(obj, 'url', 'file')
		renameKey(obj, 'quality', 'label')
	})

	streamData.subtitles.forEach((obj) => {
		renameKey(obj, 'url', 'file')
		renameKey(obj, 'lang', 'language')
		obj['lang'] = obj['language']
	})
}

const SinglePage = () => {
	// eslint-disable-next-line

	const [isLoading, setIsLoading] = useState(false)
	const [color, setColor] = useState('grey')
	const [movieDetails, setMovieDetails] = useState({})
	const [streamData, setStreamData] = useState({})
	const [episode, setEpisode] = useState({})
	const [seasonData, setSeasonData] = useState({})
	const query = useQuery()

	useEffect(() => {
		async function fetchData() {
			let movieDetails = await getMovieDetails(query.get('id'))
			setMovieDetails(movieDetails, setEpisode(movieDetails.episodes[0]))

			let episodes = movieDetails.episodes
			let seasonDataObj = {}
			for (let index = 0; index < episodes.length; index++) {
				const episode = episodes[index]

				if (episode.season in seasonDataObj) {
					seasonDataObj[episode.season].push(episode)
				} else {
					seasonDataObj[episode.season] = [episode]
				}
			}
			setSeasonData(seasonDataObj)
		}
		fetchData()
	}, [query])

	useEffect(() => {
		if (Object.keys(episode).length === 0) return

		async function changeEpisode() {
			let streamDataObj = await getStreamURLS(
				episode.id,
				query.get('id'),
				'upcloud'
			)
			cleanStreamData(streamDataObj)
			setStreamData(streamDataObj, setIsLoading(false))
		}
		changeEpisode()
	}, [episode, query])

	return (
		<>
			{isLoading ? (
				<div className='load_app' style={{ height: '500px' }}>
					<Myloader color={color} size={60} />
					<p
						className='pt-4 text-secondary text-loading'
						style={{ textTransform: 'capitalize', fontSize: '1rem' }}
					>
						Loading Please Wait...
					</p>
				</div>
			) : (
				<>
					<div>
						{movieDetails && (
							<div
								className='open__modal'
								style={{
									backgroundImage: `url(${movieDetails.image})`,
								}}
							>
								<img
									className='poster__img'
									src={movieDetails.image ? movieDetails.image : unavailable}
									alt=''
								/>
								<img
									className='backdrop__img'
									src={movieDetails.image ? movieDetails.image : unavailable}
									alt=''
								/>

								<div className='open__detailsPage'>
									<h3>{movieDetails.title}</h3>
									<div
										style={{
											zIndex: '1000',
											marginTop: '10px',
											textAlign: 'left',
										}}
										className='year'
									>
										{movieDetails.releaseDate}.
										<b className='title_me'>
											{movieDetails === 'Movie' ? 'Filme' : 'Serie .'}
										</b>
										<b className='vote_back'>
											<b className='tmdb'>TMDB</b>
											<b className='vote_ave'>-⭐{movieDetails.rating}</b>
										</b>
									</div>
									<h5
										style={{
											display: 'flex',
											fontSize: '12px',
										}}
										className='genreList'
									>
										{movieDetails.genres?.map((n, i) => {
											return (
												<p
													key={n}
													style={{ fontSize: '13px', marginLeft: '6px' }}
													className='mygenre'
												>
													{i > 0 && ', '}
													{n}
												</p>
											)
										})}
									</h5>

									<div className='tagline'>
										<h5>{movieDetails.tags}</h5>
									</div>
									<div className='overview'>
										<p>{movieDetails.description}</p>
									</div>
									<div className='other_lists'>
										<ul>
											<li>
												DURATION:{' '}
												<span>
													{movieDetails.type === 'tv'
														? `${movieDetails.episode_run_time[0]} min episodes`
														: `${movieDetails.duration}`}
												</span>
											</li>
											{movieDetails.type === 'tv' ? (
												<li>
													{/* SEASONS: <span>{content.number_of_seasons}</span> */}
												</li>
											) : (
												''
											)}
										</ul>
									</div>
								</div>
							</div>
						)}
					</div>

					<div className='videopage'>
						{movieDetails && (
							<SingleVideoPage
								title={movieDetails.title}
								streamData={streamData}
								getStreamURLS={getStreamURLS}
								episodeId={episode.id}
								queryGetId={query.get('id')}
								cleanStreamData={cleanStreamData}
								setStreamData={setStreamData}
								setIsLoading={setIsLoading}
							/>
						)}
					</div>

					<div className='all__cast px-5 pt-5'>
						<div className='cast__title'>
							<h2>Cast</h2>
						</div>
						<div>
							<Carousel casts={movieDetails.casts} />
						</div>
					</div>
					{/* <div className='similar__shows'>
						<div className='btn__title'>
							<h5>You May Also Like </h5>
						</div>
						<div className='similar'>
							{similarMovies &&
								similarMovies.map((n) => (
									<SingleData key={n.id} {...n} mediaType='movie' />
								))}
						</div>
					</div> */}
				</>
			)}
		</>
	)
}

export default SinglePage
