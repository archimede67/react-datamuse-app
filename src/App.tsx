import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";
import { lerpColor } from "./utils";
import useSynonymsQuery from "./hooks/useSynonymsQuery";
import GithubIcon from "./GithubIcon";

function App() {
	const [search, setSearch] = useState<string>("");
	const { isLoading, error, synonyms, maxScore, fetchSynonyms } = useSynonymsQuery();

	const handleSearchButton = () => {
		fetchSynonyms(search);
	};

	const handleSearchFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleSynonymClick = (synonym: string) => {
		setSearch(synonym);
		fetchSynonyms(synonym);
	};

	return (
		<div className="App">
			<h1>SynFinder</h1>
			<form className="search-container" onSubmit={handleSearchFormSubmit}>
				<div className="search-item">
					<label htmlFor="search">Search</label>
					<input
						placeholder="Type your search here..."
						id="search"
						type="text"
						value={search}
						onChange={handleInputChange}
					/>
				</div>
				<button onClick={handleSearchButton}>Find synonyms</button>
			</form>
			<div className="search-results">
				{isLoading ? <div className="loading">Loading...</div> : null}
				{error ? <div className="error">Error: {error}</div> : null}
				{synonyms && synonyms.length ? (
					<ul className="results">
						{synonyms.map((result, index) => {
							return (
								<li key={index} className="result" onClick={() => handleSynonymClick(result.word)}>
									<p
										style={{
											color: lerpColor("#ff0000", "#00ff00", result.score / maxScore),
										}}>
										{result.word}
									</p>
								</li>
							);
						})}
					</ul>
				) : null}
				{synonyms?.length === 0 ? <div className="error">No results</div> : null}
			</div>
			<footer className="credits">
				<small>
					Data provided by{" "}
					<a href="https://www.datamuse.com/api/" target="_blank">
						Datamuse API
					</a>
				</small>
				•<GithubIcon url="https://github.com/archimede67/react-datamuse-app" />
			</footer>
		</div>
	);
}

export default App;
