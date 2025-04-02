import { useState } from "react"
import { useTestimonialsContext } from '../hooks/useTestimonialsContext'
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate } from 'react-router-dom';

const TestimonialForm = ()=>{

    const {dispatch} = useTestimonialsContext()
    const {user} = useAuthContext();
    const navigate = useNavigate(); 

    const [testimony,setTestimony] = useState('')
    const [companyName,setCompanyName] = useState('')
    const [emptyFields,setEmptyFields] = useState([])





    const [error,setError] = useState(null)

    const handleSubmit = async (e) =>{
        e.preventDefault()

        if(!user)
        {
            setError('You must be logged in');
            return;
        }
    

        const testimonial = {testimony,companyName}
        const response = await fetch('/api/testimonials',{
            method:'POST',
            body:JSON.stringify(testimonial),
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${user.token}`

            }
        })
        const json = await response.json()

        if(!response.ok)
        {
            setError(json.error)
            setEmptyFields(json.emptyFields)

        }
        if(response.ok)
        {

            setTestimony('')
            setCompanyName('')
            setError(null)
            setEmptyFields([])
            console.log('New Testimony added',json)
            dispatch({type:'CREATE_TESTIMONIAL',payload:json})
            console.log('New Testimony added',json)
            navigate('/testimonials'); 
        }


    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <div className='animate-ping w-16 h-16 m-8 rounded-full bg-sky-600'></div>
            <h3>Add New Testimonial</h3>
            <label>Testimonial</label>
            {/* <input type="text" onChange={(e)=>setTestimony(e.target.value)} value={testimony} 
            className={emptyFields.includes('testimony') ? 'error':''}
            /> */}
             <textarea onChange={(e)=>setTestimony(e.target.value)} value={testimony} 
                className={emptyFields.includes('testimony') ? 'error':''} 
            />
            <label>Company</label>
            <input type="text" onChange={(e)=>setCompanyName(e.target.value)} value={companyName}
            className={emptyFields.includes('company') ? 'error':''}/> 
            <p className="publish">THIS TESTIMONIAL WILL NOT PUBLISHED IMMIDIATELY</p>

            <button>Add Testimony</button>
            {error && <div className="error">{error}</div>}
        </form> 
    )
}


export default TestimonialForm