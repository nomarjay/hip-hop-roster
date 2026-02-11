import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { Lock, User } from 'lucide-react';
import api from '../services/api'; // Or wherever your axios instance is defined
import React from 'react';


const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		try {
			await login(username, password);
			navigate('/admin');
		} catch (err) {
			setError('Invalid username or password');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen bg-gray-950 flex items-center justify-center px-4'>
			<div className='max-w-md w-full'>
				<div className='text-center mb-8'>
					<h1 className='text-4xl font-black text-white mb-2'>
						Admin Login
					</h1>
					<p className='text-gray-400'>
						Access the Hip Hop Roster dashboard
					</p>
				</div>

				<div className='bg-gray-900 rounded-2xl p-8 border border-gray-800'>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div>
							<label className='block text-gray-400 mb-2 font-semibold'>
								Username
							</label>
							<div className='relative'>
								<User className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
								<input
									type='text'
									value={username}
									onChange={(e) =>
										setUsername(e.target.value)
									}
									className='w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20'
									placeholder='Enter username'
									required
								/>
							</div>
						</div>

						<div>
							<label className='block text-gray-400 mb-2 font-semibold'>
								Password
							</label>
							<div className='relative'>
								<Lock className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
								<input
									type='password'
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									className='w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20'
									placeholder='Enter password'
									required
								/>
							</div>
						</div>

						{error && (
							<div className='bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg'>
								{error}
							</div>
						)}

						<button
							type='submit'
							disabled={loading}
							className='w-full py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition disabled:opacity-50 disabled:cursor-not-allowed'>
							{loading ? 'Logging in...' : 'Login'}
						</button>
					</form>

					<div className='mt-6 text-center'>
						<button
							onClick={() => navigate('/')}
							className='text-gray-400 hover:text-white transition'>
							Back to Roster
						</button>
					</div>
				</div>

				<div className='mt-6 text-center text-gray-500 text-sm'>
					Default credentials: admin / admin123
				</div>
			</div>
		</div>
	);
};

export default Login;
