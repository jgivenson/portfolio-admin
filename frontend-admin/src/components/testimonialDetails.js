import {useTestimonialsContext} from '../hooks/useTestimonialsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { Link } from 'react-router-dom'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const TestimonialDetails = ({testimonial}) =>
    {
        const {dispatch} = useTestimonialsContext()
        const { user } = useAuthContext();
    
        const handleClick = async ()=>{
            if(!user)
            {
                return;
            }
    
            const response = await fetch('/api/testimonials/'+testimonial._id,{
                method:'DELETE',
                headers:{
                    'Authorization': `Bearer ${user.token}`,
                }
            })
    
            const json = await response.json()
            if(response.ok)
            {
                dispatch({type:"DELETE_TESTIMONIAL",payload:json})
            }
            
    
        }
        return (
            <div className="skill-details">
                <p><strong>Testimonial: </strong>{testimonial.testimony}</p>
                <p><strong>Company Name: </strong>{testimonial.companyName}</p>
                <p>{formatDistanceToNow(new Date(testimonial.createdAt),{addSuffix:true})}</p>
                <span className="material-icons" onClick={handleClick}>delete</span>
                <Link to={`/testimonials/edit/${testimonial._id}`}>
                 Edit
                </Link>
            </div>
            
        )
    }
    
    export default TestimonialDetails