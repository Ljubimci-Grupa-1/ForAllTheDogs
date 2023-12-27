import {adUser} from "./AddNewModal.tsx";

interface UserDetailsProps{
    user:adUser
}

 const userDetails=({user}:UserDetailsProps)=>{
    return(
        <>
        <div>
            <h4>Kontakt podaci o korisniku:</h4>
            <p>{user.name}</p>
        <p> {user.email} </p>
            <p>{user.telephoneNumber}</p>
        </div>
        </>
    );
};

export default userDetails;