import React, { useEffect, useState, useMemo } from 'react'
import { VimePlayerComponent } from '../Players/VimePlayer'
import { useLocation } from 'react-router-dom'
import { unavailable } from '../../assets/DefaultImages'

import {
	getFromLocalStorage,
	saveToLocalStorage,
} from '../../utils/localStorage'

import './SinglePage.css'
import { NetPlayerComponent } from '../Players/NetPlayer/SingleVideoPage'
import Myloader from 'react-spinners/ClipLoader'

import {
	Accordion,
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
} from 'react-accessible-accordion'

import accordionStyles from './accordionStyles.module.scss'
import styles from './styles.module.scss'
import { ConstructionOutlined } from '@mui/icons-material'

const SinglePage = () => {
	// eslint-disable-next-line

	const [isLoading, setIsLoading] = useState(true)
	const [color, setColor] = useState('grey')
	const [movieDetails, setMovieDetails] = useState({})
	const [streamData, setStreamData] = useState({})
	const [episode, setEpisode] = useState({})
	const [seasonData, setSeasonData] = useState({})
	const [currentEpisode, setCurrentEpisode] = useState(null)
	const query = useQuery()

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
		setIsLoading(true)

		try {
			let res = await fetch(
				`https://api.consumet.org/movies/flixhq/watch?episodeId=${episodeId}&mediaId=${mediaId}&server=${server}`
			)
			res = await res.json()

			setIsLoading(false)

			return res
		} catch (e) {
			console.log(e)
		}
	}

	function cleanStreamData(streamData) {
		streamData?.sources?.map(function (item) {
			delete item.isM3U8
			return item
		})

		streamData?.sources?.forEach((obj) => {
			renameKey(obj, 'url', 'file')
			renameKey(obj, 'quality', 'label')
		})

		streamData?.subtitles?.forEach((obj) => {
			renameKey(obj, 'url', 'file')
			renameKey(obj, 'lang', 'language')
			obj['lang'] = obj['language']
		})
	}

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
		if (episode !== undefined && Object?.keys(episode).length === 0) return

		async function changeEpisode() {
			let streamDataObj = await getStreamURLS(
				episode.id,
				query.get('id'),
				'upcloud'
			)
			cleanStreamData(streamDataObj)
			setStreamData(streamDataObj)
		}
		changeEpisode()
	}, [episode, query])

	// query.get(id) -> tv/watch-slow-horses-full-78697
	// episode.id -> 1241293

	// set current episode if found in local storage
	useEffect(() => {
		if (movieDetails.episodes == null) return
		const savedEpisode = getFromLocalStorage(`${episode.id}-episodeNum`)

		if (savedEpisode != null) {
			setCurrentEpisode(savedEpisode)
		} else {
			setCurrentEpisode(movieDetails?.episodes[0]?.id)
		}
	}, [movieDetails.episodes])

	// user changes episode: save current episode to local storage and get new streaming url
	useEffect(() => {
		if (currentEpisode == null || episode.id == null) return
		saveToLocalStorage(`${episode.id}-episodeNum`, currentEpisode)
		getStreamURLS(episode.id, query.get('id'), 'upcloud')
	}, [currentEpisode])

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

					{movieDetails.type === 'TV Series' ? (
						<div className={styles.rightDiv}>
							<div className={styles.episodeTitle}>
								Você está assistindo: S{episode?.season} E{episode?.number}:{' '}
								{episode?.title}
							</div>
							<div className={styles.seasonsList}>
								<Accordion
									allowZeroExpanded={true}
									className={accordionStyles.accordion}
								>
									{Object.keys(seasonData).map((season) => {
										return (
											<AccordionItem
												className={accordionStyles.accordion__item}
												key={season}
											>
												<AccordionItemHeading>
													<AccordionItemButton
														className={accordionStyles.accordion__button}
													>
														Season {season}
													</AccordionItemButton>
												</AccordionItemHeading>
												<div className={styles.episodesList}>
													{seasonData[season].map((ep) => {
														return (
															<AccordionItemPanel
																className={accordionStyles.accordion__panel}
																key={ep.id}
															>
																<div
																	className={`${styles.episode} ${
																		ep?.id === episode?.id
																			? styles.activeEpisode
																			: ''
																	}`}
																	onClick={() => {
																		setEpisode(ep)
																	}}
																>
																	{`Episode ${ep?.number}`}
																</div>
															</AccordionItemPanel>
														)
													})}
												</div>
											</AccordionItem>
										)
									})}
								</Accordion>
							</div>
						</div>
					) : (
						''
					)}

					<div className='videopage'>
						<VimePlayerComponent
							title={movieDetails.title}
							episodeNumber={episode.number}
							url={streamData?.sources?.at(-1)?.file}
							subtitles={streamData.subtitles}
						/>
					</div>
				</>
			)}
		</>
	)
}

export default SinglePage
