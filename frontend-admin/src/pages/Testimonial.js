import {useEffect} from 'react'
import { Link } from 'react-router-dom'

import { useTestimonialsContext } from '../hooks/useTestimonialsContext'
import { useAuthContext } from '../hooks/useAuthContext'


//comp
import TestimonialDetails from '../components/testimonialDetails'



const Testimonials = () => {


 
    const {testimonials,dispatch} = useTestimonialsContext()
 
    const {user} = useAuthContext();


    useEffect(() =>{
        const fetchTestimonials = async ()=> {
            const response = await fetch('/api/testimonials',{
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
           
            if(response.ok)
            {
                
                dispatch({type:'SET_TESTIMONIAL',payload:json})
              
            }
        }
        if(user)
        {
            fetchTestimonials()
        
        }
       
    },[dispatch,user])


    return (
       
            <div className='skills'>
                <Link className='buttonClass' to="/testimonials/create">Create</Link>


                {testimonials && Array.isArray(testimonials) ? (
                testimonials.map((testimonial) => (
                    <TestimonialDetails key={testimonial._id}  testimonial={testimonial}/>
                ))
                ) : (
                <p>No testimonials available.</p>
                )}
                            
                {/* {testimonials && testimonials.map((testimonial) => (
                    <TestimonialDetails key={testimonial._id}  testimonial={testimonial}/>
                ))} */}
            </div>    
        
    )
}

export default Testimonials