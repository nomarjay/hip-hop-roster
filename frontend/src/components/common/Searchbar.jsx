import { Search } from 'lucide-react';

const Searchbar = ({
	searchTerm,
	setSearchTerm,
	placeholder = 'Search artists...',
}) => {
	return (
		<div className='relative max-w-2xl mx-auto mb-8'>
			<Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
			<input
				type='text'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder={placeholder}
				className='w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition'
			/>
		</div>
	);
};

export default Searchbar;
