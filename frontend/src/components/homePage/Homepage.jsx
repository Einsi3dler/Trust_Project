import PageHeader from "../header/header";
import './homepage.css';
import { Button } from "react-bootstrap";

export default function HomePage () {

	return (
		<div>
		<PageHeader/>
		<main>
			<section className="home">
				<h3>Welcome to Trust</h3>
				<h5>Home of secure businesses and transactions</h5>
				<p>Dealing without trust, don't gamble. Let Trust be your middleman</p>
			</section>
			<section className="bg-section d-grid d-lg-flex d-md-flex">
				<div className="bg-image">
				</div>
				<div className="get-started">
					<h3>Start buying and selling with Trust Escrow</h3>
					<article>
						Register to buy and sell without worries online, <b>Trust</b> got your back
					</article>
					<form className="d-grid">
						<input type="text" className="pageInput"  placeholder="I'm selling"></input>
						<input type="text" className="pageInput" ></input>
					</form>
          		<Button type="submit" className="btn btn-primary button">
            	Get Started
          		</Button>
			</div>
			</section>
		</main>
		</div>
	)
}
