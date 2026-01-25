import { getTierColors } from '../utils/tierColors';
import { BarChart3 } from 'lucide-react';

const StatsGrid = ({ artist }) => {
	const colors = getTierColors(artist.overallTier);

	const stats = [
		{ label: 'Lyricism', value: artist.lyricism },
		{ label: 'Flow', value: artist.flow },
		{ label: 'Creativity', value: artist.creativity },
		{ label: 'Rhythm', value: artist.rhythm },
		{ label: 'Longevity', value: artist.longevity },
		{ label: 'Impact', value: artist.impact },
		{ label: 'Delivery', value: artist.delivery },
		{ label: 'Storytelling', value: artist.storytelling },
	];

	return (
		<div className='max-w-6xl mx-auto mb-8'>
			<div className='bg-gray-900 rounded-2xl p-8 border border-gray-800'>
				<h3 className='text-3xl font-bold mb-6 flex items-center gap-3 text-white'>
					<BarChart3 className='w-8 h-8' />
					Statistics
				</h3>
				<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
					{stats.map((stat, idx) => (
						<div
							key={idx}
							className='bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition'>
							<span className='text-gray-400 text-sm block mb-2'>
								{stat.label}
							</span>
							<p className={`font-black text-3xl ${colors.text}`}>
								{stat.value || 'N/A'}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default StatsGrid;
