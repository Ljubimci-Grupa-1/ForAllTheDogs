

import {LostPet} from "./MainContent.tsx";
import "./CategoryComponent.css"

interface CategoryComponentProps{
    pet:LostPet;
    handleCategoryClose:()=>void;
    handleChangeCategory:(category:string)=>void;
    handleChanged:()=>void;
}
export const CategoryComponent = ({pet, handleCategoryClose, handleChangeCategory, handleChanged}:CategoryComponentProps)=>{
    return(
        <>
<div className="categoryComponent">
    <div className="categoryComponent-content">
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
        <button onClick={handleChanged}>done</button>
    </div>
</div>
        </>
)
}