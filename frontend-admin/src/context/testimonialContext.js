import { createContext, useReducer } from "react";


export const TestimonialsContext = createContext()
export const testimonialsReducer = (state,action) =>{
    switch(action.type){
        case 'SET_TESTIMONIAL':
            return{
                testimonials:action.payload
            }
        case 'CREATE_TESTIMONIAL':
            return{
                testimonials:[action.payload,...state.testimonials]
            }   
        case 'UPDATE_TESTIMONIAL':
                    return {
                      testimonials: [action.payload, ...state.testimonials]
            }       
        case 'DELETE_TESTIMONIAL':
            return{
                testimonials:state.testimonials.filter((t)=>t._id !== action.payload._id)
            }        

        default:
            return state
    }
} 
export const TestimonialContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(testimonialsReducer,{
        testimonials:null
    })

    return (
        <TestimonialsContext.Provider value={{...state,dispatch}}>
            { children}
        </TestimonialsContext.Provider>
    )
}