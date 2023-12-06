import React, {ChangeEvent} from "react";

export default function TextInput({containerCss, onChangeHandler, labelText, labelRequired=false, hintText, disabledInput=false}:{containerCss?: string, onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void, labelText?: string, labelRequired?: boolean, hintText?: string, disabledInput?:boolean}) {
    return (
        <div className={`inline-block w-full ${containerCss}`}>
            {labelText ? <label className="inline-block mb-2 text-bloxberg-white font-light text-base">{labelText} {labelRequired ? <span className="text-bloxberg-red">*</span>: null}</label> : null}
            <input disabled={disabledInput} onChange={onChangeHandler} className="py-2 px-3 text-bloxberg-blue-800 bg-bloxberg-blue-200 border border-bloxberg-blue-200 border-solid h-10 font-normal text-base w-full focus:border-bloxberg-red focus:shadow-[0_0_0_0.2rem_theme(colors.bloxberg-red/0.25)] focus-visible:outline-none"></input>
            {hintText ? <span className="text-bloxberg-grey font-light text-xs mt-1">{hintText}</span> : null}
        </div>
    )
}