'use client'

import Heading1 from "@/app/ui/heading-1";
import StepHash from "@/app/certify/step-hash";
import PrimaryButton from "@/app/ui/primary-button";
import React from "react";
import SecondaryButton from "@/app/ui/secondary-button";
import StepItem from "@/app/certify/step-item";

export default function Certify() {
    const [stepIndex, setStepIndex] = React.useState(0);

    const nextStep = () => {
        setStepIndex(stepIndex + 1);
    };

    const lastStep = () => {
        setStepIndex(stepIndex - 1);
    };

    const certifyData = () => {
        nextStep();
        // certify data
    };

    const downloadCertificate = () => {
        // download certificate
        ;
    };

    return (
        <div>
            <Heading1 title="Certify"></Heading1>
            <p className="text-2xl font-medium text-bloxberg-grey mb-20">Certify your Research Data on the blockchain.</p>
            <ol>
                <StepItem stepTitle={"Hash"} currentIndex={stepIndex} stepItemIndex={0} maxStepIndex={2} primaryActionTitle={"next"}
                          primaryAction={nextStep} secondaryAction={lastStep} stepContent={<StepHash></StepHash>}></StepItem>
                <StepItem stepTitle={"Info"} currentIndex={stepIndex} stepItemIndex={1} maxStepIndex={2} primaryActionTitle={"certify"}
                          primaryAction={certifyData} secondaryAction={lastStep} stepContent={<StepHash></StepHash>}></StepItem>
                <StepItem stepTitle={"Download"} currentIndex={stepIndex} stepItemIndex={2} maxStepIndex={2} primaryActionTitle={"download"}
                          primaryAction={downloadCertificate} secondaryAction={undefined} stepContent={undefined}></StepItem>
            </ol>
        </div>
    )
}