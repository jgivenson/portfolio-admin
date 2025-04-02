import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

//pages and componets below
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Testimonials from './pages/Testimonial'
import CreateTestimonial  from './pages/CreateTestimonial'
import EditTestimonial from './pages/EditTestimonial'
//import ShowTestimonial from './pages/ShowTestimonial'
//import DeleteTestimonial from './pages/DeleteTestimonial'

import Navbar from './components/Navbar';


function App() {
  const {user} = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={user ? <Home/> : <Navigate to="/login" />}
            />
            <Route 
              path="/testimonials"
              element={user ? <Testimonials/> : <Navigate to="/" /> }
            />
            <Route 
              path="/testimonials/create" 
              element={user ? <CreateTestimonial/> : <Navigate to="/" /> }
              />
              <Route path='/testimonials/edit/:id'  element={user ? <EditTestimonial/> : <Navigate to="/" /> } />
            {/* <Route 
              path="/testimonials/create"
              element={user ? <CreateTestimonial/> : <Navigate to="/" /> }
            />
            <Route 
              path="/testimonials/edit/:id"
              element={user ? <EditTestimonial/> : <Navigate to="/" /> }
            />
            <Route 
              path="/testimonials/details/:id"
              element={user ? <ShowTestimonial/> : <Navigate to="/" /> }
            />
            <Route 
              path="/testimonials/delete/:id"
              element={user ? <DeleteTestimonial/> : <Navigate to="/" /> }
            />             */}
            <Route 
              path="/login"
              element={!user ? <Login/> : <Navigate to="/" /> }
            />
            <Route 
              path="/signup"
              element={!user ? <Signup/> : <Navigate to="/" /> }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
