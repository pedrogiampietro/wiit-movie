import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import GoogleIcon from '../../assets/images/google.svg'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import FilledInput from '@mui/material/FilledInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import AppleIcon from '../../assets/images/apple.ico'

import './SignIn.css'

export function SignIn() {
	const [values, setValues] = useState({
		password: '',
		showPassword: false,
	})
	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value })
	}

	const handleClickShowPassword = () => {
		setValues({
			...values,
			showPassword: !values.showPassword,
		})
	}

	const handleMouseDownPassword = (event) => {
		event.preventDefault()
	}

	return (
		<>
			<div className='login__main'>
				<div className='login__row row '>
					<div className='login__right card'>
						<div className='form__login'>
							<div className='login__title'>
								<h2>Criar sua conta de graça!</h2>
								<p>Não precisa de cartão.</p>
							</div>
							<div className='login__btns'>
								<div className='google__login'>
									<button className='google'>
										<img src={GoogleIcon} width='20' alt='' /> Continuar com
										Google
									</button>
								</div>
								<div className='apple__login'>
									<button className='apple'>
										<img src={AppleIcon} width='20' alt='' /> Continuar com
										Apple
									</button>
								</div>
								<div className='or__line'>
									<p className='span-h'></p>
									<p className='span-p'> or</p>
									<p className='span-k'></p>
								</div>
								<Box
									component='form'
									noValidate
									sx={{
										'& .MuiInputBase-input': {
											m: 1,
											height: '4ch',
											width: '35ch',
										},
										'& > :not(style)': { m: 1, width: '35ch' },
										'& .MuiButtonBase-root': {
											display: 'flex',
											justifyContent: 'flex-end',
											paddingX: '10px',
											width: '30px',
										},
										'& .MuiInputBase-input::after': {
											color: 'red',
											borderBottom: '2px solid red',

											'&focus': {
												color: 'pink',
												borderBottom: '2px solid red',
											},
										},
									}}
									className='input_all'
									autoComplete='off'
								>
									<div className='sign_name'>
										<h5>Usuário</h5>
										<TextField
											sx={{}}
											fullWidth
											id='standard-basic'
											className=''
											variant='filled'
											focused
											size='small'
										/>
									</div>
									<div className='sign_pass'>
										<h5>Senha</h5>

										<FormControl variant='filled' size='small' fullWidth>
											<FilledInput
												id='filled-adornment-password'
												type={values.showPassword ? 'text' : 'password'}
												value={values.password}
												onChange={handleChange('password')}
												endAdornment={
													<InputAdornment position='end'>
														<IconButton
															aria-label='toggle password visibility'
															onClick={handleClickShowPassword}
															onMouseDown={handleMouseDownPassword}
															edge='end'
														>
															{values.showPassword ? (
																<VisibilityOff />
															) : (
																<Visibility />
															)}
														</IconButton>
													</InputAdornment>
												}
											/>
										</FormControl>
									</div>
								</Box>
								<div className='new__acc'>
									<button>Criar conta</button>
									<p>
										Você já tem uma conta? <b>Faça login aqui</b>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
