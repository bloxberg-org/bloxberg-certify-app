'use client'

import React from "react";
import RadioSelection from "@/app/ui/radio-selection";
import TextInput from "@/app/ui/text-input";
import FileUpload from "@/app/ui/file-upload";

export default function StepHash({disabledInput}:{disabledInput:boolean}) {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const onSelected = (selectedIndex: number) => {
        setSelectedIndex(selectedIndex)
    };

    return (
        <div>
            <h3 className="font-medium text-bloxberg-grey text-2xl pb-4">How would you like to generate the hash?</h3>
            <div className="pb-4">
                <RadioSelection disabledInput={disabledInput} labels={["Generate from file(s)", "Manual entry"]} selectedIndex={selectedIndex} onSelected={onSelected}></RadioSelection>
            </div>

            {selectedIndex === 0 ? (
                <FileUpload disabledInput={disabledInput}></FileUpload>
            ) : (
                <TextInput labelText="Enter hash manually" labelRequired hintText="If you prefer generating your own hash for your data, enter it here." disabledInput={disabledInput}></TextInput>
            )}
        </div>
    )
}