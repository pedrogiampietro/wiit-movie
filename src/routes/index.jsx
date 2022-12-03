import { Route, Switch, Redirect } from 'react-router-dom'

import Home from '../pages/Home/Home'
import SinglePage from '../components/SingleContentPage/SinglePage'
import MainNav from '../components/MainNavbar/MainNav'
import Footer from '../components/Footer/Footer'
import CopyWrite from '../components/CopyWrite__footer/LastFooter'
import BottomNav from '../components/MainNavbar/BottomNav'
import SearchResults from '../pages/SearchResults'

const Routes = () => {
	return (
		<>
			<MainNav />

			<div className='App'>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/watch' children={<SinglePage />} />
					<Route path='/search/:query' children={<SearchResults />} />
					<Redirect to='/error' />
				</Switch>
			</div>
			<Footer />
			<BottomNav />
			<CopyWrite />
		</>
	)
}

export default Routes
