import { useState } from "react";
import { Synonym, fetchSynonyms } from "../api/synonyms";

export default () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined | null>(null);
	const [synonyms, setSynonyms] = useState<Synonym[] | null | undefined>(null);
	const [maxScore, setMaxScore] = useState(1);

	const handleFetchSynonyms = (word: string) => {
		if (isLoading) return;
		setIsLoading(true);
		setSynonyms(null);
		fetchSynonyms(word).then((res) => {
			const { maxScore, error, results } = res;
			if (maxScore) setMaxScore(maxScore);
			setSynonyms(results);
			setError(error);
			// setData({ error, results });
			setIsLoading(false);
		});
	};

	return { isLoading, error, synonyms, maxScore, fetchSynonyms: handleFetchSynonyms };
};
