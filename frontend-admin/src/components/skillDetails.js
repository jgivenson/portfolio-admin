import {useSkillsContext} from '../hooks/useSkillsContext'
import { useAuthContext } from '../hooks/useAuthContext'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const SkillDetails = ({skill}) =>
{
    const {dispatch} = useSkillsContext()
    const { user } = useAuthContext();

    const handleClick = async ()=>{
        if(!user)
        {
            return;
        }

        const response = await fetch('/api/skills/'+skill._id,{
            method:'DELETE',
            headers:{
                'Authorization': `Bearer ${user.token}`,
            }
        })

        const json = await response.json()
        if(response.ok)
        {
            dispatch({type:"DELETE_SKILL",payload:json})
        }
        

    }
    return (
        <div className="skill-details">
            <h4>{skill.title}</h4>
            <p><strong>Number Year(s): </strong>{skill.numberOfYears}</p>
            <p><strong>Skill Detail: </strong>{skill.description}</p>
            <p>{formatDistanceToNow(new Date(skill.createdAt),{addSuffix:true})}</p>
            <span className="material-icons" onClick={handleClick}>delete</span>
        </div>
    )
}

export default SkillDetails