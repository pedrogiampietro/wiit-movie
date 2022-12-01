import Heading from '../Header/Heading'
import './footer.css'

const Footer = () => {
	return (
		<>
			<div className='footer'>
				<div className='footer__container__row'>
					<div className='col-fot1'>
						<Heading />
						<div className='footer__details'>
							<p>
								Filmes e series em um só lugar, feito pela comunidade para a
								comunidade
							</p>
							<p>Totalmente sem anuncíos, 0 ads!</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Footer
