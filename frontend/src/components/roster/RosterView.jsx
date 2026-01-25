import { useState } from 'react';
import RosterCard from './RosterCard';
import Searchbar from '../Searchbar';
import { Filter } from 'lucide-react';

const RosterView = ({ artists }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedTier, setSelectedTier] = useState('ALL');

	const tiers = ['ALL', 'S', 'A', 'B', 'C', 'D', 'F'];

	const filteredArtists = artists
		.filter((artist) =>
			artist.name.toLowerCase().includes(searchTerm.toLowerCase()),
		)
		.filter(
			(artist) =>
				selectedTier === 'ALL' || artist.overallTier === selectedTier,
		)
		.sort((a, b) => {
			const tierOrder = { S: 0, A: 1, B: 2, C: 3, D: 4, F: 5 };
			return tierOrder[a.overallTier] - tierOrder[b.overallTier];
		});

	return (
		<div className='py-8'>
			<div className='text-center mb-12'>
				<h1 className='text-5xl font-black text-white mb-4'>
					THE ROSTER
				</h1>
				<p className='text-gray-400 text-lg'>
					{artists.length} Artists Ranked • Tier-Based Rating System
				</p>
			</div>

			<Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

			{/* Tier Filter */}
			<div className='flex items-center justify-center gap-2 mb-8 flex-wrap'>
				<Filter className='w-5 h-5 text-gray-400' />
				{tiers.map((tier) => (
					<button
						key={tier}
						onClick={() => setSelectedTier(tier)}
						className={`px-4 py-2 rounded-lg font-bold transition ${
							selectedTier === tier
								? 'bg-yellow-500 text-black'
								: 'bg-gray-800 text-gray-300 hover:bg-gray-700'
						}`}>
						{tier}
					</button>
				))}
			</div>

			{/* Artist Grid */}
			{filteredArtists.length === 0 ? (
				<div className='text-center py-20'>
					<p className='text-gray-400 text-xl'>No artists found</p>
				</div>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
					{filteredArtists.map((artist) => (
						<RosterCard key={artist.id} artist={artist} />
					))}
				</div>
			)}
		</div>
	);
};

export default RosterView;
