// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1, color: "aliceblue" }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'transactions',
    path: '/dashboard/transactions',
    icon: icon('ic_cart'),
  },
  {
    title: 'chat',
    path: '/dashboard/chat',
    icon: icon('ic_blog'),
  },
  {
	title: 'buyers',
    path: '/dashboard/buyers',
    icon: icon('ic_user'),
  },
  {
	title: 'sellers',
    path: '/dashboard/sellers',
    icon: icon('ic_user'),
  },
  {
    title: 'logout',
    path: '/logout',
    icon: icon('ic_lock'),
  },

];

export default navConfig;
