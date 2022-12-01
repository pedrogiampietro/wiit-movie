import $ from 'jquery'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import './SinglePage.css'

import NetPlayer from 'netplayer'

const SingleVideoPage = ({ streamData, title }) => {
	return (
		<>
			<div className='wrapper'>
				<div className='image play_trailer' data-title='Arrival'>
					<div
						className='btn btn-success px-4'
						data-toggle='modal'
						data-target={`#${title && title.split(' ')[0]}`}
					>
						<span>
							<PlayCircleIcon
								style={{
									backgroundColor: 'linear-gradient(200deg, #00aeff, #a68eff)',
								}}
							/>
						</span>{' '}
						Assistir Agora
					</div>
				</div>
			</div>

			<div
				className='modal fade myModal'
				id={`${title && title.split(' ')[0]}`}
				tabIndex={`-1`}
				aria-labelledby='exampleModalLabel'
			>
				<div className='modal-dialog'>
					<div
						className='modal-content'
						style={{ zIndex: '1500', marginTop: '20px' }}
					>
						<div className='modal-header'>
							<h5 className='modal-title' id='exampleModalLabel'>
								{title} Official Trailer
							</h5>
							<button
								type='button'
								className='close'
								data-dismiss='modal'
								aria-label='Close'
							>
								<span aria-hidden='true' style={{ color: 'white' }}>
									&times;
								</span>
							</button>
						</div>
						<div className='modal-video'>
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
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default SingleVideoPage
