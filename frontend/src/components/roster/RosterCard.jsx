import { useNavigate } from 'react-router-dom';
import { getTierColors } from '../utils/tierColors';
import { Crown, Trophy, Star, Flame } from 'lucide-react';

const RosterCard = ({ artist }) => {
	const navigate = useNavigate();
	const colors = getTierColors(artist.overallTier);

	const getTierIcon = (tier) => {
		if (tier === 'S') return <Crown className='w-5 h-5' />;
		if (tier === 'A') return <Trophy className='w-5 h-5' />;
		if (tier === 'B') return <Star className='w-5 h-5' />;
		return <Flame className='w-5 h-5' />;
	};

	return (
		<div
			onClick={() => navigate(`/artist/${artist.id}`)}
			className='relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:-translate-y-2'>
			<div
				className={`relative bg-gradient-to-br ${colors.bg} p-1 rounded-xl shadow-2xl ${colors.glow} shadow-xl`}>
				<div className='bg-gray-900 rounded-lg p-4'>
					{/* Tier Badge */}
					<div
						className={`absolute top-2 right-2 bg-gradient-to-br ${colors.bg} rounded-full p-2 ${colors.glow} shadow-lg flex items-center justify-center`}>
						{getTierIcon(artist.overallTier)}
						<span className='text-white font-black text-lg ml-1'>
							{artist.overallTier}
						</span>
					</div>

					{/* Artist Image */}
					<div className='relative mb-4'>
						<div className='w-full h-48 bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden'>
							{artist.profileImageUrl ? (
								<img
									src={artist.profileImageUrl}
									alt={artist.name}
									className='w-full h-full object-cover'
								/>
							) : (
								<div className='text-gray-600 text-6xl font-black'>
									{artist.name.charAt(0)}
								</div>
							)}
						</div>
						<div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4'>
							<h3 className='text-white font-bold text-xl truncate'>
								{artist.name}
							</h3>
						</div>
					</div>

					{/* Quick Stats */}
					<div className='grid grid-cols-2 gap-2 text-xs'>
						<div className='bg-gray-800 rounded p-2'>
							<span className='text-gray-400 block'>
								Lyricism
							</span>
							<p className={`font-bold ${colors.text}`}>
								{artist.lyricism || 'N/A'}
							</p>
						</div>
						<div className='bg-gray-800 rounded p-2'>
							<span className='text-gray-400 block'>Flow</span>
							<p className={`font-bold ${colors.text}`}>
								{artist.flow || 'N/A'}
							</p>
						</div>
						<div className='bg-gray-800 rounded p-2'>
							<span className='text-gray-400 block'>Impact</span>
							<p className={`font-bold ${colors.text}`}>
								{artist.impact || 'N/A'}
							</p>
						</div>
						<div className='bg-gray-800 rounded p-2'>
							<span className='text-gray-400 block'>
								Longevity
							</span>
							<p className={`font-bold ${colors.text}`}>
								{artist.longevity || 'N/A'}
							</p>
						</div>
					</div>

					{/* Badges Preview */}
					<div className='mt-3 flex gap-1 flex-wrap'>
						{artist.badges && artist.badges.length > 0 ? (
							<>
								{artist.badges.slice(0, 2).map((badge, idx) => (
									<span
										key={idx}
										className={`text-xs px-2 py-1 bg-gradient-to-r ${colors.bg} rounded-full text-white font-semibold`}>
										{badge}
									</span>
								))}
								{artist.badges.length > 2 && (
									<span className='text-xs px-2 py-1 bg-gray-700 rounded-full text-gray-300'>
										+{artist.badges.length - 2}
									</span>
								)}
							</>
						) : (
							<span className='text-xs text-gray-500'>
								No badges
							</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default RosterCard;
