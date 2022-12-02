import NetPlayer from 'netplayer'
import './styles.css'

export function NetPlayerComponent({ streamData }) {
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
			</div>
		</>
	)
}
