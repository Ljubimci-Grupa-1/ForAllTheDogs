

import {LostPet} from "./MainContent.tsx";

interface CategoryComponentProps{
    pet:LostPet;
    handleCategoryClose:()=>void;
    handleChangeCategory:(category:string)=>void;
}
export const CategoryComponent = ({pet, handleCategoryClose, handleChangeCategory}:CategoryComponentProps)=>{
    return(
        <>
<div>
    <button onClick={handleCategoryClose}>x</button>
    <select
        defaultValue={pet.activityName}
        onChange={(e) =>handleChangeCategory(e.target.value)}
    >
        <option value="Za ljubimcem se traga">Za ljubimcem se traga</option>
        <option value="Sretno pronađen">Sretno pronađen</option>
        <option value="Nije pronađen, potraga nije više u tijeku">Nije pronađen, potraga nije više u tijeku</option>
        <option value="Nesretno pronađen">Nesretno pronađen</option>
        {/* Add more species as needed */}
    </select>
</div>
        </>
)
}