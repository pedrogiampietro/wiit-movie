import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import { img_300, noPicture } from '../../api/config/DefaultImages'
import './Carousel.css'
const handleDragStart = (e) => e.preventDefault()

const Gallery = ({ casts }) => {
	const responsive = {
		0: {
			items: 1,
		},
		380: {
			items: 1,
		},
		512: {
			items: 2,
		},
		665: {
			items: 3,
		},
		767: {
			items: 3,
		},
		870: {
			items: 4,
		},
		1024: {
			items: 6,
		},
		1265: {
			items: 7,
		},
	}

	const items = casts?.map((n) => {
		return (
			<div className='carousel__d'>
				<img
					src={n.profile_path ? `${img_300}/${n.profile_path}` : noPicture}
					alt=''
					className='caro_img'
					onDragStart={handleDragStart}
				/>
				<div className='caro__details'>
					{/* <h6 className='cast__name'>{n}</h6> */}
					<h6 className='character'>{n}</h6>
				</div>
			</div>
		)
	})

	return (
		<AliceCarousel
			infinite
			autoPlay
			disableButtonsControls
			disableDotsControls
			mouseTracking
			items={items}
			responsive={responsive}
			animationDuration={4000}
		/>
	)
}

export default Gallery
