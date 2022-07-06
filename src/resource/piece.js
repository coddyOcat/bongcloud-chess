export const customPieces = (type) => {
	function importAll(r) {
		return r.keys().reduce((obj, item) => {
			if (item.includes(type)) {
				return {
					...obj,
					[item.substring(type.length + 3, type.length + 5)]: r(item),
				};
			}
			return { ...obj };
		}, {});
	}
	const images = importAll(
		require.context("./piece", true, /.+\/.+\.svg$/)
	);
	return {
		P: images["wP"],
		R: images["wR"],
		N: images["wN"],
		B: images["wB"],
		Q: images["wQ"],
		K: images["wK"],
		p: images["bP"],
		r: images["bR"],
		n: images["bN"],
		b: images["bB"],
		q: images["bQ"],
		k: images["bK"],
	};
};
