import "./transaction.css";
import UserHeader from "../header/usersHeader";

export default function StartedTransaction() {
	const role = JSON.parse(localStorage.getItem("role"));
	console.log(role)
  return (
    <div>
      <UserHeader />
      <div className="started">
        <p className="text-center ">Congratulations on starting a new transaction</p>
		<p className="text-center text-break">{ role === "selling" ? "Have your buyer confirm transaction and proceed to send payment to escrow" : "Have your seller confirm transaction and you proceed to send payment to escrow" }
		</p>
      </div>
    </div>
  );
}
