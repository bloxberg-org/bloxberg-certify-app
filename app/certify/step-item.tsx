import StepHash from "@/app/certify/step-hash";
import SecondaryButton from "@/app/ui/secondary-button";
import PrimaryButton from "@/app/ui/primary-button";
import React, {MouseEventHandler} from "react";
import Image from "next/image";

export default function StepItem({id, stepTitle, currentIndex, stepItemIndex, maxStepIndex, primaryActionTitle, primaryAction,
                                     secondaryAction, stepContent, disabledInput, isLoading, isLoadingPrimaryActionTitle="loading",
                                     errors} :
{id: string, stepTitle: string, currentIndex: number, stepItemIndex: number, maxStepIndex: number, primaryActionTitle: string,
    primaryAction: MouseEventHandler<HTMLButtonElement> | undefined, secondaryAction: MouseEventHandler<HTMLButtonElement> | undefined,
    stepContent:  React.JSX.Element | undefined, disabledInput?:boolean, isLoading?: boolean, isLoadingPrimaryActionTitle?: string,
    errors: Map<string, string[]>}) {
    return (
        <li className={`relative pb-16 w-full ${stepItemIndex > currentIndex ? "opacity-20" : ""}`} id={id}>
            {stepItemIndex !== maxStepIndex ?
                <div className={`w-0.5 h-[calc(100%-43px)] mt-0.5 absolute top-9 -left-7 ml-[-1px] ${stepItemIndex < currentIndex ? "bg-bloxberg-red" : "bg-bloxberg-grey"} ${stepItemIndex === currentIndex ? "opacity-20" : ""}`}></div>
             : null}
            <div className="flex items-start relative">
                <i className={`bx bxs-square rotate-45 absolute -left-10 font-light text-2xl ${stepItemIndex <= currentIndex  ? "text-bloxberg-red" : "text-bloxberg-grey"}`}></i>
                <i className={`bx bx-check absolute left-[-38px] font-light text-[20px] top-[6px] text-bloxberg-white ${maxStepIndex === currentIndex && stepItemIndex === currentIndex ? "" : "hidden"}`}></i>
                <div className={`flex flex-col w-full`}>
                    <h2 className="text-3xl uppercase text-bloxberg-grey relative font-normal pb-16">{stepTitle}</h2>
                    {stepContent !== undefined ?
                        <div className="pb-4">
                            {stepContent}
                        </div>
                     : null}
                    {errors.size !== 0 ?
                        (
                            <div className={"py-2 text-bloxberg-red font-bold text-center"}>
                                {Array.from( errors.values() ).map((errors, mainIndex) => (
                                    errors.map((errorText, index)=>(
                                        <span key={`${mainIndex}${index}`}>
                                    <i className={`bx bxs-error font-light top-[1px] relative pr-1`}></i>
                                            {errorText}
                                  </span>
                                    ))
                                ))}
                            </div>
                        ): (
                            <></>
                        )}
                    <div className={`flex justify-between ${currentIndex !== stepItemIndex ? "hidden" : ""}`}>
                        {currentIndex !== 0 && currentIndex !== maxStepIndex ? (
                            <SecondaryButton title="back" onClick={secondaryAction} disabledInput={isLoading}></SecondaryButton>
                        ) : <div></div>}
                        <PrimaryButton title={isLoading ? isLoadingPrimaryActionTitle : primaryActionTitle} onClick={primaryAction} isLoading={isLoading}></PrimaryButton>
                    </div>
                </div>
            </div>
        </li>
    )
}