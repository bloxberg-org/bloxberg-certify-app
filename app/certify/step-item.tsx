import StepHash from "@/app/certify/step-hash";
import SecondaryButton from "@/app/ui/secondary-button";
import PrimaryButton from "@/app/ui/primary-button";
import React, {MouseEventHandler} from "react";
import Image from "next/image";

export default function StepItem({stepTitle, currentIndex, stepItemIndex, maxStepIndex, primaryActionTitle, primaryAction, secondaryAction, stepContent} :
{stepTitle: string, currentIndex: number, stepItemIndex: number, maxStepIndex: number, primaryActionTitle: string, primaryAction: MouseEventHandler<HTMLButtonElement> | undefined, secondaryAction: MouseEventHandler<HTMLButtonElement> | undefined, stepContent:  React.JSX.Element | undefined}) {
    return (
        <li className={`relative pb-16 ${stepItemIndex > currentIndex ? "opacity-20" : ""}`}>
            {stepItemIndex !== maxStepIndex ? (
                <div className={`w-0.5 h-[calc(100%-43px)] mt-0.5 absolute top-9 -left-7 ml-[-1px] ${stepItemIndex < currentIndex ? "bg-bloxberg-red" : "bg-bloxberg-grey"} ${stepItemIndex === currentIndex ? "opacity-20" : ""}`}></div>
            ) : (
                <div></div>
            )}
            <div className="flex items-start relative">
                <i className={`bx bxs-square rotate-45 absolute -left-10 font-light text-2xl ${stepItemIndex <= currentIndex  ? "text-bloxberg-red" : "text-bloxberg-grey"}`}></i>
                <div className={`flex flex-col`}>
                    <h2 className="text-3xl uppercase text-bloxberg-grey relative font-normal pb-16">{stepTitle}</h2>
                    {stepContent !== undefined ? (
                        <div className="pb-4">
                            {stepContent}
                        </div>
                    ) : (
                        <div></div>
                    )}

                    <div className={`flex justify-between ${currentIndex !== stepItemIndex ? "hidden" : ""}`}>
                        {currentIndex !== 0 && currentIndex !== maxStepIndex ? (
                            <SecondaryButton title="back" onClick={secondaryAction}></SecondaryButton>
                        ) : (
                            <div></div>
                        )}
                        <PrimaryButton title={primaryActionTitle} onClick={primaryAction}></PrimaryButton>
                    </div>
                </div>
            </div>
        </li>
    )
}