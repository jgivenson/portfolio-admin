import { useState } from "react"
import { useSkillsContext } from '../hooks/useSkillsContext'
import { useAuthContext } from "../hooks/useAuthContext"

const SkillForm = ()=>{

    const {dispatch} = useSkillsContext()
    const {user} = useAuthContext();

    const [title,setTitle] = useState('')
    const [type,setType] = useState('')
    const [description,setDescription] = useState('')
    const [numberOfYears,setNumberOfYears] = useState('')
    const [emptyFields,setEmptyFields] = useState([])


    const [error,setError] = useState(null)

    const handleSubmit = async (e) =>{
        e.preventDefault()

        if(!user)
        {
            setError('You must be logged in');
            return;
        }
    

        const skill = {title,type,description,numberOfYears}
        const response = await fetch('/api/skills',{
            method:'POST',
            body:JSON.stringify(skill),
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

            setTitle('')
            setType('')
            setDescription('')
            setNumberOfYears('')
            setError(null)
            setEmptyFields([])
            console.log('New skill added',json)
            dispatch({type:'CREATE_SKILL',payload:json})
        }


    }


    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add New Skill</h3>
            <label>Skill Title</label>
            <input type="text" onChange={(e)=>setTitle(e.target.value)} value={title} 
            className={emptyFields.includes('title') ? 'error':''}
            />
            <label>Skill Type</label>
            <input type="text" onChange={(e)=>setType(e.target.value)} value={type}
            className={emptyFields.includes('type') ? 'error':''}
            /> 
            <label>Skill Description</label>
            <input type="text" onChange={(e)=>setDescription(e.target.value)} value={description}
            className={emptyFields.includes('description') ? 'error':''}
            />
            <label>Skill Number Of Years</label>
            <input type="number" onChange={(e)=>setNumberOfYears(e.target.value)} value={numberOfYears}
            className={emptyFields.includes('numberOfYears') ? 'error':''}/>   
            <button>Add Skill</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}


export default SkillForm