import {MouseEventHandler} from "react";

export default function SecondaryButton({title, onClick}: {title: string, onClick: MouseEventHandler<HTMLButtonElement> | undefined}) {
    return (
        <button type="button" className="text-bloxberg-red w-40 bg-transparent px-6 py-2 transition-all duration-300 ease-out hover:ease-in hover:bg-transparent hover:border-bloxberg-red"
                onClick={onClick}>{title}</button>
    )
}