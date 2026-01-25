import { getTierColors } from '../utils/tierColors';
import { Award } from 'lucide-react';

const BadgeSection = ({ artist }) => {
	const colors = getTierColors(artist.overallTier);

	return (
		<div className='max-w-6xl mx-auto'>
			<div className='bg-gray-900 rounded-2xl p-8 border border-gray-800'>
				<h3 className='text-3xl font-bold mb-6 flex items-center gap-3 text-white'>
					<Award className='w-8 h-8' />
					Badges & Achievements
				</h3>
				{artist.badges && artist.badges.length > 0 ? (
					<div className='flex gap-3 flex-wrap'>
						{artist.badges.map((badge, idx) => (
							<div
								key={idx}
								className={`px-6 py-3 bg-gradient-to-r ${colors.bg} rounded-xl text-white font-bold text-lg ${colors.glow} shadow-lg hover:scale-105 transition-transform`}>
								{badge}
							</div>
						))}
					</div>
				) : (
					<p className='text-gray-500 text-lg'>
						No badges earned yet
					</p>
				)}
			</div>
		</div>
	);
};

export default BadgeSection;
