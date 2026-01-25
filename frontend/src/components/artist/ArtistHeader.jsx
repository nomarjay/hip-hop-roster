import { getTierColors } from '../utils/tierColors';
import { Crown, Trophy, Star, Flame } from 'lucide-react';

const ArtistHeader = ({ artist }) => {
	const colors = getTierColors(artist.overallTier);

	const getTierIcon = (tier) => {
		if (tier === 'S') return <Crown className='w-8 h-8' />;
		if (tier === 'A') return <Trophy className='w-8 h-8' />;
		if (tier === 'B') return <Star className='w-8 h-8' />;
		return <Flame className='w-8 h-8' />;
	};

	return (
		<div
			className={`relative bg-gradient-to-br ${colors.bg} p-1 rounded-3xl shadow-2xl ${colors.glow} shadow-2xl max-w-6xl mx-auto mb-8`}>
			<div className='bg-gray-900 rounded-3xl p-8'>
				<div className='flex flex-col md:flex-row gap-8'>
					{/* Artist Image */}
					<div className='relative flex-shrink-0'>
						<div
							className={`absolute -inset-2 bg-gradient-to-r ${colors.bg} rounded-2xl blur opacity-75`}></div>
						<div className='relative w-80 h-80 bg-gray-800 rounded-2xl flex items-center justify-center overflow-hidden'>
							{artist.profileImageUrl ? (
								<img
									src={artist.profileImageUrl}
									alt={artist.name}
									className='w-full h-full object-cover'
								/>
							) : (
								<div className='text-gray-600 text-9xl font-black'>
									{artist.name.charAt(0)}
								</div>
							)}
						</div>

						{/* Tier Badge */}
						<div
							className={`absolute -top-4 -right-4 bg-gradient-to-br ${colors.bg} rounded-full p-4 ${colors.glow} shadow-2xl border-4 border-gray-900`}>
							<div className='flex flex-col items-center'>
								{getTierIcon(artist.overallTier)}
								<span className='text-white font-black text-3xl mt-1'>
									{artist.overallTier}
								</span>
								<span className='text-white text-xs font-bold'>
									TIER
								</span>
							</div>
						</div>
					</div>

					{/* Artist Info */}
					<div className='flex-1'>
						<h1 className='text-6xl font-black mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent'>
							{artist.name}
						</h1>
						<p className='text-gray-400 text-lg mb-6 leading-relaxed'>
							{artist.bio || 'No bio available'}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ArtistHeader;
