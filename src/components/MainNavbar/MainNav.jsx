import Heading from '../Header/Heading'
import './MainNav.css'
import React from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '../../assets/images/home-icon.svg'
// import WhatshotIcon from '@mui/icons-material/Whatshot'
// import MovieIcon from '../../assets/images/movie-icon.svg'
// import TheatersIcon from '../../assets/images/series-icon.svg'
import $ from 'jquery'

$(function () {
	$(document).on('scroll', function () {
		var $nav = $('.navbar')
		$nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height())
	})
})

const MainNav = () => {
	return (
		<>
			<nav className='navbar navbar-expand navbar-light fixed-top'>
				<Link className='navbar-brand' to='/'>
					<Heading />
				</Link>

				<div className='collapse navbar-collapse'>
					<ul className='navbar-nav mr-auto'>
						<li className='nav-item active  nav__link'>
							<Link className='nav-link' to='/'>
								<img
									src={HomeIcon}
									style={{
										fontSize: '17px',
										marginBottom: '5px',
										marginRight: '0px',
									}}
									alt=''
								/>
								Home <span className='sr-only'>(current)</span>
							</Link>
						</li>

						{/* <li className="nav-item">
              <Link className="nav-link" to="/not">
                Search
              </Link>
            </li> */}
					</ul>

					<div className='all__right'>
						<div className='btn-login'>
							<Link to='/login'>
								<button className=' login-btn'>login</button>
							</Link>
						</div>
					</div>
				</div>
			</nav>
		</>
	)
}

export default MainNav
