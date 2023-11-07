import {ChangeEventHandler} from "react";

export default function RadioButton({ label, value, onChange } : {label: string, value:  boolean | undefined, onChange:  ChangeEventHandler<HTMLInputElement> | undefined}) {
    return (
        <label className="text-bloxberg-grey font-light">
            <input type="radio" checked={value} onChange={onChange} className="mr-3"/>
            {label}
        </label>
    )
}