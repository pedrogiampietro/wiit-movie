import NetPlayer from 'netplayer'
import './SinglePage.css'

const SingleVideoPage = ({
	streamData,
	getStreamURLS,
	episodeId,
	queryGetId,
	cleanStreamData,
	setStreamData,
	setIsLoading,
}) => {
	async function changeServer(e) {
		const server = e.target.id

		let streamDataObj = await getStreamURLS(episodeId, queryGetId, server)
		cleanStreamData(streamDataObj)
		setStreamData(streamDataObj, setIsLoading(false))
	}

	return (
		<>
			<div className='wrapper'>
				<div className='videoDiv'>
					{streamData?.sources?.length > 0 && (
						<NetPlayer
							sources={streamData.sources}
							subtitles={streamData.subtitles}
							// onVmr
							hlsConfig={{
								maxLoadingDelay: 4,
								minAutoBitrate: 0,
								lowLatencyMode: true,
							}}
							autoPlay={true}
						/>
					)}
					<aside className='video-options'>
						<h1>Opção de servidores</h1>

						<hr />
						<div className='two-column'>
							<div className='single-col'>
								<div className='styled-input-container'>
									<div className='styled-input-single'>
										<input
											type='radio'
											name='fieldset-1'
											id='upcloud'
											onClick={(e) => changeServer(e)}
										/>
										<label htmlFor='upcloud'>UpCloud</label>
									</div>
									<div className='styled-input-single'>
										<input
											type='radio'
											name='fieldset-1'
											id='vidcloud'
											onClick={(e) => changeServer(e)}
										/>
										<label htmlFor='vidcloud'>Vidcloud</label>
									</div>
								</div>
							</div>
						</div>
					</aside>
				</div>
			</div>
		</>
	)
}

export default SingleVideoPage
