

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
        <option value="Search in progress">Search in progress</option>
        <option value="Happily found">Happily found</option>
        <option value="Not found, search discontinued">Not found, search discontinued</option>
        <option value="Found under unhappy circumstances">Found under unhappy circumstances</option>
        {/* Add more species as needed */}
    </select>
        <button onClick={handleChanged}>done</button>
    </div>
</div>
        </>
)
}