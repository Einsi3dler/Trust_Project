import PageHeader from "../header/header";
import './homepage.css';

export default function HomePage () {

	return (
		<div>
		<PageHeader></PageHeader>
		<main>
			<section className="home">
				<h3>Welcome to Trust</h3>
				<h5>Home of secure businesses and transactions</h5>
				<p>Dealing without trust, don't gamble. Let Trust be your middleman</p>
			</section>
		</main>
		</div>
	)
}
