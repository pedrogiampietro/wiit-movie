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
	episodeSeason,
	episodeNumber,
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
							hlsConfig={{
								maxLoadingDelay: 4,
								minAutoBitrate: 0,
								lowLatencyMode: true,
							}}
							autoPlay={true}
						/>
					)}
				</div>
				<aside className='video-options'>
					<h1 style={{ color: '#fff' }}>Opção de servidores</h1>

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
									<label htmlFor='upcloud' style={{ color: '#fff' }}>
										UpCloud
									</label>
								</div>
								<div className='styled-input-single'>
									<input
										type='radio'
										name='fieldset-1'
										id='vidcloud'
										onClick={(e) => changeServer(e)}
									/>
									<label htmlFor='vidcloud' style={{ color: '#fff' }}>
										Vidcloud
									</label>
								</div>
								<div className='styled-input-single'>
									<input
										type='radio'
										name='fieldset-1'
										id='mixdrop'
										onClick={(e) => changeServer(e)}
									/>
									<label htmlFor='mixdrop' style={{ color: '#fff' }}>
										MixDrop
									</label>
								</div>
							</div>
						</div>
					</div>
				</aside>
			</div>
		</>
	)
}

export default SingleVideoPage
