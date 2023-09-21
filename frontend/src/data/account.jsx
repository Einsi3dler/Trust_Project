// ----------------------------------------------------------------------

const user = JSON.parse(localStorage.getItem("loggedUser"));
 const account = {
	id: user.id,
  displayName: user ? user.first_name + " " +  user.last_name : 'Jaydon Frankie',
  email: 'demo@minimals.cc',
  photoURL: '/assets/images/avatars/avatar_default.jpg',
};

export default account;
