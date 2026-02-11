import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	isAuthenticated,
	logout,
	getUsername,
} from '../services/authService';
import { getAllArtists, deleteArtist } from '../services/api';
import ArtistForm from './ArtistForm';
import BulkImport from './BulkImport';
import { Plus, Edit, Trash2, LogOut, User, Upload } from 'lucide-react';
import React from 'react';


const AdminDashboard = () => {
	const navigate = useNavigate();
	const [artists, setArtists] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const [showBulkImport, setShowBulkImport] = useState(false);
	const [editingArtist, setEditingArtist] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!isAuthenticated()) {
			navigate('/login');
			return;
		}
		fetchArtists();
	}, [navigate]);

	const fetchArtists = async () => {
		try {
			const data = await getAllArtists();
			setArtists(data);
		} catch (error) {
			console.error('Error fetching artists:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	const handleDelete = async (id) => {
		if (window.confirm('Are you sure you want to delete this artist?')) {
			try {
				await deleteArtist(id);
				fetchArtists();
			} catch (error) {
				console.error('Error deleting artist:', error);
				alert('Failed to delete artist');
			}
		}
	};

	const handleEdit = (artist) => {
		setEditingArtist(artist);
		setShowForm(true);
	};

	const handleFormClose = () => {
		setShowForm(false);
		setEditingArtist(null);
		fetchArtists();
	};

	const handleBulkImportClose = () => {
		setShowBulkImport(false);
		fetchArtists();
	};

	if (loading) {
		return (
			<div className='min-h-screen bg-gray-950 flex items-center justify-center'>
				<div className='text-white text-2xl'>Loading...</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gray-950'>
			{/* Header */}
			<div className='bg-gray-900 border-b border-gray-800 sticky top-0 z-40'>
				<div className='container mx-auto px-4 py-4'>
					<div className='flex items-center justify-between'>
						<div>
							<h1 className='text-3xl font-black text-white'>
								Admin Dashboard
							</h1>
							<p className='text-gray-400 mt-1'>
								Manage Hip Hop Roster
							</p>
						</div>
						<div className='flex items-center gap-4'>
							<div className='flex items-center gap-2 text-gray-400'>
								<User className='w-5 h-5' />
								<span>{getUsername()}</span>
							</div>
							<button
								onClick={handleLogout}
								className='flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition'>
								<LogOut className='w-5 h-5' />
								Logout
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className='container mx-auto px-4 py-8'>
				{/* Actions */}
				<div className='mb-8 flex justify-between items-center flex-wrap gap-4'>
					<h2 className='text-2xl font-bold text-white'>
						Artists ({artists.length})
					</h2>
					<div className='flex gap-3'>
						<button
							onClick={() => setShowBulkImport(true)}
							className='flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-lg transition'>
							<Upload className='w-5 h-5' />
							Bulk Import
						</button>
						<button
							onClick={() => {
								setEditingArtist(null);
								setShowForm(true);
							}}
							className='flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition'>
							<Plus className='w-5 h-5' />
							Add Artist
						</button>
					</div>
				</div>

				{/* Artists Table */}
				<div className='bg-gray-900 rounded-xl border border-gray-800 overflow-hidden'>
					<div className='overflow-x-auto'>
						<table className='w-full'>
							<thead className='bg-gray-800'>
								<tr>
									<th className='px-6 py-4 text-left text-gray-400 font-semibold'>
										Name
									</th>
									<th className='px-6 py-4 text-left text-gray-400 font-semibold'>
										Tier
									</th>
									<th className='px-6 py-4 text-left text-gray-400 font-semibold'>
										Lyricism
									</th>
									<th className='px-6 py-4 text-left text-gray-400 font-semibold'>
										Flow
									</th>
									<th className='px-6 py-4 text-left text-gray-400 font-semibold'>
										Impact
									</th>
									<th className='px-6 py-4 text-right text-gray-400 font-semibold'>
										Actions
									</th>
								</tr>
							</thead>
							<tbody className='divide-y divide-gray-800'>
								{artists.map((artist) => (
									<tr
										key={artist.id}
										className='hover:bg-gray-800/50 transition'>
										<td className='px-6 py-4 text-white font-semibold'>
											{artist.name}
										</td>
										<td className='px-6 py-4'>
											<span className='px-3 py-1 bg-yellow-500 text-black font-bold rounded-full text-sm'>
												{artist.overallTier}
											</span>
										</td>
										<td className='px-6 py-4 text-gray-400'>
											{artist.lyricism || 'N/A'}
										</td>
										<td className='px-6 py-4 text-gray-400'>
											{artist.flow || 'N/A'}
										</td>
										<td className='px-6 py-4 text-gray-400'>
											{artist.impact || 'N/A'}
										</td>
										<td className='px-6 py-4'>
											<div className='flex items-center justify-end gap-2'>
												<button
													onClick={() =>
														handleEdit(artist)
													}
													className='p-2 bg-blue-500 hover:bg-blue-400 text-white rounded-lg transition'>
													<Edit className='w-4 h-4' />
												</button>
												<button
													onClick={() =>
														handleDelete(artist.id)
													}
													className='p-2 bg-red-500 hover:bg-red-400 text-white rounded-lg transition'>
													<Trash2 className='w-4 h-4' />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			{/* Artist Form Modal */}
			{showForm && (
				<ArtistForm artist={editingArtist} onClose={handleFormClose} />
			)}

			{/* Bulk Import Modal */}
			{showBulkImport && (
				<BulkImport
					onClose={handleBulkImportClose}
					onSuccess={handleBulkImportClose}
				/>
			)}
		</div>
	);
};

export default AdminDashboard;
