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
        <nav className="navbar">
            <div className="navbar-items">
                <Link to="/"><h2 className="logo">Skillshare <span className="dot">.</span> me</h2></Link>
                <ul>
                    <li><Link to="/"></Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                </ul>

                {!user && <div className="navbar-buttons">
                    <Link to="/login" className="navbar-button1">Login</Link>
                    <Link to="/signup" className="navbar-button2">Signup</Link>
                </div>}
            </div>
        </nav>
    )
}

export default Navbar;