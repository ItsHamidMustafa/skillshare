import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext';
import '../landing-page.css';
// import UserTray from './UserTray'

export const Navbar = () => {
    const { user, loading } = useAuthContext();
    // const location = useLocation();

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        // <nav>
        //     <div className='nav-left font-size-large'>
        //         <span>Hello {user ? user.firstName : 'Traveller'} 👋</span>
        //     </div>
        //     <div className='nav-right'>
        //         {user ? (
        //             <>
        //                 <span className="material-symbols-outlined col-white font-size-large">
        //                     notifications
        //                 </span>
        //                 <UserTray />
        //             </>
        //         ) : (
        //             <Link className='nav-right-link' to={location.pathname === '/signup' ? '/login' : '/signup'}>
        //                 {location.pathname === '/signup' ? 'Login' : 'Signup'}
        //                 <span className="material-symbols-outlined">
        //                     account_circle
        //                 </span>
        //             </Link>
        //         )}
        //     </div>
        // </nav>
        <nav class="navbar">
            <div class="navbar-items">
                <h2 class="logo">Skillshare <span class="dot">.</span> me</h2>
                <ul>
                    <li><Link to="/"></Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                </ul>
                <div class="navbar-buttons">
                    <button class="navbar-button1">Login</button>
                    <button class="navbar-button2">Signup</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;