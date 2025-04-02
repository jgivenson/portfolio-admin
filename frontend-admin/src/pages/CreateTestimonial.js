import {useEffect} from 'react'

import { useTestimonialsContext } from '../hooks/useTestimonialsContext'
import { useAuthContext } from '../hooks/useAuthContext'


//comp
//import TestimonialDetails from '../components/testimonialDetails'
import TestimonialForm from '../components/testimonialForm'


const CreateTestimonial = () => {


    const {dispatch} = useTestimonialsContext()
    const {user} = useAuthContext();

    console.log(user.token);
    //const [skills,setSkills] = useState(null)

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
        <div className="home">
            <div className='skills'>
                 <TestimonialForm/>
            </div> 
        </div>
    )
}

export default CreateTestimonial