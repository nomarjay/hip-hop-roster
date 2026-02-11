import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ArtistHeader from './ArtistHeader';
import StatsGrid from './StatsGrid';
import BadgeSection from './BadgeSection';
import React from 'react';


const ArtistDetailView = ({ artists }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const artist = artists.find((a) => a.id === parseInt(id));

	if (!artist) {
		return (
			<div className='flex items-center justify-center h-screen'>
				<div className='text-center'>
					<p className='text-white text-2xl mb-4'>Artist not found</p>
					<button
						onClick={() => navigate('/')}
						className='px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition'>
						Back to Roster
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen py-8'>
			<button
				onClick={() => navigate('/')}
				className='mb-6 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-white font-semibold flex items-center gap-2'>
				<ArrowLeft className='w-5 h-5' />
				Back to Roster
			</button>

			<ArtistHeader artist={artist} />
			<StatsGrid artist={artist} />
			<BadgeSection artist={artist} />
		</div>
	);
};

export default ArtistDetailView;
