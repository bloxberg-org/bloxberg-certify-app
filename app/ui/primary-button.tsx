import {MouseEventHandler} from "react";

export default function PrimaryButton({title, onClick}: {title: string, onClick: MouseEventHandler<HTMLButtonElement> | undefined}) {
    return (
        <button type="button" className="text-bloxberg-white w-40 bg-bloxberg-red px-6 py-2 border-2 border-solid border-bloxberg-red transition-all duration-300 ease-out hover:ease-in hover:bg-transparent hover:text-bloxberg-blue-200 hover:border-bloxberg-blue-200"
        onClick={onClick}>{title}</button>
    )
}