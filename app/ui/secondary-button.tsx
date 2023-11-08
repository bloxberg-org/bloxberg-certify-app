import {MouseEventHandler} from "react";

export default function SecondaryButton({title, onClick, disabledInput=false}: {title: string, onClick: MouseEventHandler<HTMLButtonElement> | undefined,
    disabledInput?:boolean}) {
    return (
        <button type="button" disabled={disabledInput} className="text-bloxberg-red w-40 bg-transparent px-6 py-2"
                onClick={onClick}>{title}</button>
    )
}