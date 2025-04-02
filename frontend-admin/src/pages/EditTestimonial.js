import {useEffect,useState} from 'react'


import { useTestimonialsContext } from '../hooks/useTestimonialsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate,useParams} from 'react-router-dom'


const EditTestimonial = () => {

    //const history = useHistory();

    const {dispatch} = useTestimonialsContext()
    const {user} = useAuthContext();
    const navigate = useNavigate(); 
    const [testimony,setTestimony] = useState('')
    const [companyName,setCompanyName] = useState('')
    const [error,setError] = useState(null)
    const {id} = useParams();

    const [emptyFields,setEmptyFields] = useState([])


    
    //const [skills,setSkills] = useState(null)

    useEffect(() =>{
        
        const fetchTestimonials = async ()=> {
            const response = await fetch('/api/testimonials/'+id,{
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
           

            if(response.ok)
            {
                console.log(json.testimony)
                //setTestimony()
                setTestimony(json.testimony);
                setCompanyName(json.companyName);
                console.log(json.testimony)
                dispatch({type:'SET_TESTIMONIAL',payload:json})
            }
        }
        if(user)
        {
            fetchTestimonials()
        }
       
    },[dispatch,user,id])

    const handleSave = async (e) =>{
        e.preventDefault()

        if(!user)
        {
            setError('You must be logged in');
            return;
        }
    

        const testimonial = {testimony,companyName}
        const response = await fetch('/api/testimonials/'+id,{
            method:'PATCH',
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
            console.log('Testimony Updated',json)
          //  dispatch({type:'UPDATE_TESTIMONIAL',payload:json})

            //history.push('/testimonials');
            navigate('/testimonials'); 
        }

    } 



    return (
        <div className="home">
            <div className='skills'>
            <form className="create" onSubmit={handleSave}>
            <div className='animate-ping w-16 h-16 m-8 rounded-full bg-sky-600'></div>
            <h3>Edit Testimonial</h3>
            <label>Testimonial</label>
             <textarea onChange={(e)=>setTestimony(e.target.value)} value={testimony} 
                className={emptyFields.includes('testimony') ? 'error':''} 
            />
            <label>Company</label>
            <input type="text" onChange={(e)=>setCompanyName(e.target.value)} value={companyName}
            className={emptyFields.includes('company') ? 'error':''}
            /> 
            <button>Update Testimony</button>
            {error && <div className="error">{error}</div>}
        </form>
            </div> 
        </div>
    )
}

export default EditTestimonial