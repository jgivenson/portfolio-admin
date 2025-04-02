import { useState } from "react"
import { useTestimonialsContext } from '../hooks/useTestimonialsContext'
import { useAuthContext } from "../hooks/useAuthContext"
//import { useNavigate } from 'react-router-dom';

const EditTestimonialForm = ()=>{

    const {dispatch} = useTestimonialsContext()

    const {user} = useAuthContext();
   // const navigate = useNavigate(); 

    const [testimony,setTestimony] = useState('')
    const [companyName,setCompanyName] = useState('')
    const [emptyFields,setEmptyFields] = useState([])


    const [error,setError] = useState(null)

    const handleSave = async (e) =>{
        e.preventDefault()

        console.log("updating the testimonial")
        return;

        if(!user)
        {
            setError('You must be logged in');
            return;
        }
    

        const testimonial = {testimony,setCompanyName}
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
                setEmptyFields(json.emptyFields)
                dispatch({type:"DELETE_TESTIMONIAL",payload:json})
            }
            
    }

    return (
        <form className="create" onSubmit={handleSave}>
            <div className='animate-ping w-16 h-16 m-8 rounded-full bg-sky-600'></div>
            <h3>Edit Testimonial</h3>
            <label>Testimonial</label>
             <textarea onChange={(e)=>setTestimony(e.target.value)} value={testimony} 
                className={emptyFields.includes('testimony') ? 'error':''} 
            />
            <label>Company</label>
            <input type="text" onChange={(e)=>setCompany(e.target.value)} value={CompanyName}
            className={emptyFields.includes('company') ? 'error':''}
            /> 
            <button>Update Testimony</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}


export default EditTestimonialForm