'use client'

import RadioButton from "@/app/ui/radio-button";
import React from "react";

export default function StepHash() {
    const [hashTpe, setHashType] = React.useState('file');

    const handleFileChange = () => {
        setHashType('file');
    };

    const handleStringChange = () => {
        setHashType('string');
    };

    return (
        <div>
            <h3 className="font-medium text-bloxberg-grey text-2xl pb-2">How would you like to generate the hash?</h3>
            <div className="flex justify-evenly pb-2">
                <RadioButton
                    label="Generate from file(s)"
                    value={hashTpe === 'file'}
                    onChange={handleFileChange}
                />
                <RadioButton
                    label="Manual entry"
                    value={hashTpe === 'string'}
                    onChange={handleStringChange}
                />
            </div>

            {hashTpe === 'string' ? (
                <input className="py-2 px-3 text-bloxberg-blue-800 bg-bloxberg-blue-200 border border-bloxberg-blue-200 border-solid h-10 font-normal text-base w-full focus:border-bloxberg-red focus:shadow-[0_0_0_0.2rem_theme(colors.bloxberg-red/0.25)] focus-visible:outline-0"></input>
            ) : (
                <input className="py-2 px-3 text-bloxberg-blue-800 bg-bloxberg-blue-200 border border-bloxberg-blue-200 border-solid h-10 font-normal text-base w-full focus:border-bloxberg-red focus:shadow-[0_0_0_0.2rem_theme(colors.bloxberg-red/0.25)] focus-visible:outline-0"></input>
            )}
        </div>
    )
}