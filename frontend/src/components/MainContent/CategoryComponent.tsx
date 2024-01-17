

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
        <option value="Search in progress">Za ljubimcem se traga</option>
        <option value="Happily found">Sretno pronađen</option>
        <option value="Not found, search discontinued">Nije pronađen, potraga nije više u tijeku</option>
        <option value="Found under unhappy circumstances">Nesretno pronađen</option>
        {/* Add more species as needed */}
    </select>
        <button onClick={handleChanged}>done</button>
    </div>
</div>
        </>
)
}