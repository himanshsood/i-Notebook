import React, { useContext, useEffect } from 'react'
import UserContext from '../context/notes/UserContext'

const About = () => {
    
    const user=useContext(UserContext);

    return (
        <div>
            This is About {user.name}
        </div>
    )
}

export default About