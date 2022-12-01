import * as React from 'react'
import './LocalSearch.css'
import './../../pages/PagesStyles.css'
import { useEffect } from 'react'
import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { createTheme, ThemeProvider } from '@material-ui/core'

export default function LocalSearch({ onSearch }) {
	// eslint-disable-next-line
	const [searchQuery, setSearchQuery] = useState('')

	const darkTheme = createTheme({
		palette: {
			type: 'dark',
			primary: {
				main: '#abb7c4;',
			},
		},
	})

	return (
		<>
			<ThemeProvider theme={darkTheme}>
				<div className='search'>
					<div className='form_search'>
						<input
							type='search'
							name='searchbar'
							placeholder='Filmes, Series, animes...'
							value={searchQuery}
							onChange={(e) => {
								setSearchQuery(e.target.value)
							}}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
								}
							}}
						/>
						<SearchIcon className='icon' label='ss' />
						<div
							className='btn btn-primary brn-sm search__icon'
							onClick={() => {
								onSearch(searchQuery)
							}}
						>
							Buscar
						</div>
					</div>
				</div>
			</ThemeProvider>
		</>
	)
}
