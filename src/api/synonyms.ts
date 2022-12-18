export type Synonym = {
	word: string;
	score: number;
};

export const fetchSynonyms = async (word: string) => {
	// if (isSearching) return;
	// setData(null);
	// setIsSearching(true);
	try {
		const res = await fetch(`https://api.datamuse.com/words?rel_syn=${encodeURIComponent(word)}`);
		const json = (await res.json()) as Synonym[];
		const ms = json.map((r) => r.score).reduce((acc, v) => (v > acc ? v : acc), 0);
		return { error: undefined, results: json, maxScore: ms };
		// setMaxScore(ms);
		// setData({ error: undefined, results: json });
	} catch (e) {
		return { error: (e as Error).message };
		// setData({ error: (e as Error).message });
	}
	// setIsSearching(false);
};
