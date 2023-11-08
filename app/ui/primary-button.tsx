import {MouseEventHandler} from "react";

export default function PrimaryButton({additionalCss, title, onClick, isLoading=false, disabledInput=false}: {additionalCss?: string, title: string, onClick: MouseEventHandler<HTMLButtonElement> | undefined,
    isLoading?: boolean, disabledInput?:boolean}) {
    let hoverCss = "transition-all duration-300 ease-out hover:ease-in hover:bg-transparent hover:text-bloxberg-blue-200 hover:border-bloxberg-blue-200"

    return (
        <button type="button" disabled={disabledInput || isLoading} className={`text-bloxberg-white w-fit min-w-[160px] bg-bloxberg-red
        px-6 py-2 border-2 border-solid border-bloxberg-red ${(disabledInput || isLoading) ? "" : hoverCss} ${additionalCss}`}
        onClick={onClick}>{isLoading ? <i className="bx bxs-square animate-spin relative top-0.5 mr-1.5"></i> : null}{title}</button>
    )
}