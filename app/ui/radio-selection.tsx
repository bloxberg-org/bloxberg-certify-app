import React from "react";

export default function RadioSelection({ labels, selectedIndex, onSelected, disabledInput } :
{labels: string[], selectedIndex:  number, onSelected:  (selectedIndex:number)=>void, disabledInput:boolean}) {
    let activeLabelCss = `text-bloxberg-white bg-bloxberg-red px-6 py-2 border-2 border-solid border-bloxberg-red ${disabledInput ? "pointer-events-none" : "cursor-pointer"}`
    let inactiveLabelCss = `text-bloxberg-red bg-transparent px-6 py-2 border-2 border-solid border-bloxberg-red ${disabledInput ? "pointer-events-none" : "cursor-pointer"}`

    const handleRadioClick = (index: number) => {
        onSelected(index);
    };

    return (
        <div>
            {labels.map((label, index) => (
                <span key={index}>
                    <input type="radio" disabled={disabledInput} onChange={(_)=>{}} checked={index === selectedIndex} className="absolute hidden"/>
                    <label className={`${index === selectedIndex ? activeLabelCss : inactiveLabelCss} inline-block`}
                           onClick={(_) => {handleRadioClick(index)}}>{label}</label>
                </span>
            ))}
        </div>
    )
}