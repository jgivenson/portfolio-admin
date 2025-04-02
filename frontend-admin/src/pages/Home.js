
import {useEffect} from 'react'

import { useSkillsContext } from '../hooks/useSkillsContext'
import { useAuthContext } from '../hooks/useAuthContext'


//comp
import SkillDetails from '../components/skillDetails'
import SkillForm from '../components/skillsForm'


const Home = () => {


    const {skills,dispatch} = useSkillsContext()
    const {user} = useAuthContext();

    //const [skills,setSkills] = useState(null)


    useEffect(() =>{
        const fetchSkills = async ()=> {
            const response = await fetch('/api/skills',{
                headers:{
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok)
            {
                dispatch({type:'SET_SKILLS',payload:json})
            }
        }
        if(user)
        {
            fetchSkills()
        }
       
    },[dispatch,user])
    return (
        <div className="home"> 
            <div className='skills'>
                {skills && skills.map((skill) => (
                    <SkillDetails key={skill._id}  skill={skill}/>
                ))}
            </div>
            <SkillForm/>
        </div>
       
    )
}

export default Home