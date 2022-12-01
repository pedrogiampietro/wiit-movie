import React from 'react'
import SingleData from '../../components/SingleData/SingleData'
import { Link } from 'react-router-dom'

import styles from './styles.module.scss'

export default function Results({ results }) {
	console.log('results', results)

	return (
		<div className={styles.results}>
			{results.map((result) => {
				return (
					<Link to={`/watch?id=${result.id}`} key={result.id}>
						<SingleData
							title={result.title}
							type={result.type}
							image={result.image}
							releaseDate={result.releaseDate}
						/>
					</Link>
				)
			})}
		</div>
	)
}
