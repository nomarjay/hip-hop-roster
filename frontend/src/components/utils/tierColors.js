export const tierColors = {
	S: {
		bg: 'from-yellow-600 via-amber-500 to-yellow-600',
		border: 'border-yellow-400',
		glow: 'shadow-yellow-500/50',
		text: 'text-yellow-400',
		solid: 'bg-yellow-500',
	},
	A: {
		bg: 'from-purple-600 via-pink-500 to-purple-600',
		border: 'border-purple-400',
		glow: 'shadow-purple-500/50',
		text: 'text-purple-400',
		solid: 'bg-purple-500',
	},
	B: {
		bg: 'from-blue-600 via-cyan-500 to-blue-600',
		border: 'border-blue-400',
		glow: 'shadow-blue-500/50',
		text: 'text-blue-400',
		solid: 'bg-blue-500',
	},
	C: {
		bg: 'from-green-600 via-emerald-500 to-green-600',
		border: 'border-green-400',
		glow: 'shadow-green-500/50',
		text: 'text-green-400',
		solid: 'bg-green-500',
	},
	D: {
		bg: 'from-gray-600 via-slate-500 to-gray-600',
		border: 'border-gray-400',
		glow: 'shadow-gray-500/50',
		text: 'text-gray-400',
		solid: 'bg-gray-500',
	},
	F: {
		bg: 'from-red-900 via-red-700 to-red-900',
		border: 'border-red-600',
		glow: 'shadow-red-500/50',
		text: 'text-red-500',
		solid: 'bg-red-600',
	},
};

export const getTierColors = (tier) => {
	return tierColors[tier] || tierColors.F;
};
