'use client'

import Heading1 from "@/app/ui/heading-1";
import StepHash from "@/app/certify/step-hash";
import React from "react";
import StepItem from "@/app/certify/step-item";
import StepInfo from "@/app/certify/step-info";
import {step} from "next/dist/experimental/testmode/playwright/step";
import certifyIconWhite from "@/public/images/icons_thin/4_white.svg";
import Image from "next/image";

export default function Certify() {
    const [stepIndex, setStepIndex] = React.useState(0);
    const [isCertifying, setIsCertifying] = React.useState(false);

    const nextStep = () => {
        let nexStepIndex = stepIndex + 1;
        setStepIndex(nexStepIndex);
        scrollToStep(nexStepIndex);
    };

    const lastStep = () => {
        let lastStepIndex = stepIndex - 1;
        setStepIndex(lastStepIndex);
        scrollToStep(lastStepIndex);
    };

    const scrollToStep = (stepIndex: number) => {
        document.getElementById(steps[stepIndex%steps.length].id)?.scrollIntoView({ behavior: "smooth" });
    }

    const certifyData = async  () => {
        setIsCertifying(true)
        await new Promise(r => setTimeout(r, 2000));
        setIsCertifying(false)
        nextStep();
        // certify data
    };

    const downloadCertificate = () => {
        // download certificate
        ;
    };

    let steps: StepItemData[] = [
        {
            id: "step-hash",
            primaryAction: nextStep,
            primaryActionTitle: "next",
            stepTitle: "Hash",
            stepContent: <StepHash disabledInput={stepIndex !== 0}></StepHash>
        },
        {
            id: "step-info",
            primaryAction: certifyData,
            secondaryAction: lastStep,
            primaryActionTitle: "certify",
            isLoadingPrimaryActionTitle: "certifying...",
            stepTitle: "Info",
            stepContent: <StepInfo disabledInput={stepIndex !== 1 || isCertifying}></StepInfo>
        },
        {
            id: "step-download",
            primaryAction: downloadCertificate,
            primaryActionTitle: "download",
            stepTitle: "Download",
            stepContent: undefined
        }
    ]

    return (
        <div>
            <div className="flex justify-between">
                <div>
                    <Heading1 title="Certify"></Heading1>
                    <p className="text-2xl font-medium text-bloxberg-grey mb-20">Certify your Research Data on the blockchain.</p>
                </div>
                <Image src={certifyIconWhite} alt="certify logo" style={{
                    width: "207px"
                }}></Image>
            </div>
            <ol className="w-full max-w-2xl">
                {steps.map((step, index) => (
                    <StepItem key={step.id} id={step.id} stepTitle={step.stepTitle} currentIndex={stepIndex} stepItemIndex={index} maxStepIndex={steps.length-1} primaryActionTitle={step.primaryActionTitle}
                              primaryAction={step.primaryAction} secondaryAction={step.secondaryAction} stepContent={step.stepContent}
                              disabledInput={stepIndex !== index} isLoading={isCertifying} isLoadingPrimaryActionTitle={step.id === "step-info" ? "certifying..." : undefined}></StepItem>
                ))}
            </ol>
        </div>
    )
}

interface StepItemData{
    id: string,
    stepTitle: string,
    primaryActionTitle: string,
    isLoadingPrimaryActionTitle?: string
    primaryAction:  React.MouseEventHandler<HTMLButtonElement> | undefined,
    secondaryAction?: React.MouseEventHandler<HTMLButtonElement> | undefined,
    stepContent: React.JSX.Element | undefined
}