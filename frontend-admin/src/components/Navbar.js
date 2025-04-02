import { Link } from 'react-router-dom'

import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'




const Navbar = () =>{

    const {user} = useAuthContext();
    
    const {logout} = useLogout()

    const handleClick=()=>{
        logout(); 
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1> Personal Porfolio </h1>
                </Link>
                <nav>
                   {user && (
                    <div>
                        <span>{user.email}</span>
                        <Link to="/testimonials">Testimonials</Link>
                        
                        <button onClick={handleClick}>Log Out</button>
                    </div>
                   )} 
                   {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Sign Up</Link>
                            
                        </div>
                   )}

                </nav>
            </div>
        </header>
    )
}

export default Navbar