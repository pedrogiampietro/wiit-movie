import { unavailable } from '../../assets/DefaultImages'
import './SingleData.css'
import MuiPlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import { styled } from '@mui/material/styles'

const PlayArrowRoundedIcon = styled(MuiPlayArrowRoundedIcon)(`

  &.MuiSvgIcon-root{
    color:#abb7c4 ;
  },  &.MuiSvgIcon-root:hover {
    color: #d13131 ;
  }
  
`)
const SingleData = ({ title, image, releaseDate }) => {
	return (
		<>
			<div style={{ color: 'white' }} className='SingleDataMedia'>
				<img src={image ? image : unavailable} alt='' />
				<div className='read__more'>
					<PlayArrowRoundedIcon
						style={{
							border: '2px solid #abb7c4',
							borderRadius: '50px',
							fontSize: '3.2rem',
							cursor: 'pointer',
						}}
						className='play__btn'
					/>
				</div>
				<div className='SingleDataDetails'>
					<h6>
						{title}({(releaseDate || '-----').substring(0, 4)})
					</h6>
				</div>
			</div>
		</>
	)
}

export default SingleData
