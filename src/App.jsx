import { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Roadmap } from "./components/roadmap";
import { Bottom } from "./components/bottom";
import { Team } from "./components/Team";
import { Faq } from "./components/faq";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
	speed: 1000,
	speedAsDuration: true,
});

const App = () => {
	const [landingPageData, setLandingPageData] = useState({});
	useEffect(() => {
		setLandingPageData(JsonData);
	}, []);

	return (
		<div>
			<Navigation />
			<Header data={landingPageData.Header} />
			<Features data={landingPageData.Features} />
			<About data={landingPageData.About} />
			{/* <Gallery data={landingPageData.Gallery} /> */}
			<Roadmap data={landingPageData.Testimonials} />
			<Team data={landingPageData.Team} />
			{/* <Contact data={landingPageData.Contact} /> */}
			{/* <Services data={landingPageData.Services} /> */}
			<Faq data={landingPageData.Faq} />
			<Bottom data={landingPageData.parnership} />
		</div>
	);
};

export default App;
