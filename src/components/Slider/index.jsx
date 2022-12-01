import React from 'react'
import Results from '../Results'

import styles from './styles.module.scss'

const Slider = ({ title = 'Title is empty', data = [] }) => {
	return (
		<>
			<div className={styles.sliderContainer}>
				<h2 className={styles.heading}>{title}</h2>
				<div className={styles.slider}>
					<div className={styles.slides}>
						<Results results={data} />
					</div>
				</div>
			</div>
		</>
	)
}

export default Slider
