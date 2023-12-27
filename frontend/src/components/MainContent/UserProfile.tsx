import MainContent from "./MainContent.tsx";

import { useParams } from 'react-router-dom';

const UserProfile=()=>{
    const { userEmail } = useParams();
    console.log(userEmail);
    return(
          <MainContent isLoggedIn={true} ></MainContent>
    );
}

export default UserProfile;