'use client'

import Heading1 from "@/app/ui/heading-1";
import React from "react";
import FileUpload from "@/app/ui/file-upload";
import PrimaryButton from "@/app/ui/primary-button";
import RadioSelection from "@/app/ui/radio-selection";
import TextInput from "@/app/ui/text-input";
import Image from "next/image";
import verifyIconWhite from "@/public/images/icons_thin/2_white.svg";

export default function Verify() {
    const [isVerifying, setIsVerifying] = React.useState(false);
    const [selectedVerificationType, setSelectedVerificationType] = React.useState(0);
    const onSelectedVerificationType = (selectedVerificationType: number) => {
        setSelectedVerificationType(selectedVerificationType)
    };
    const handleVerifyClick = async () => {
        setIsVerifying(true)
        await new Promise(r => setTimeout(r, 2000));
        setIsVerifying(false)
    };

    return (
        <div>
            <div className="flex justify-between">
                <div>
                    <Heading1 title="Verify"></Heading1>
                    <p className="text-2xl font-medium text-bloxberg-grey mb-20">Look up your data on the blockchain.</p>
                </div>
                <Image src={verifyIconWhite} alt="verify logo" style={{
                    width: "207px"
                }}></Image>
            </div>

            <div className="w-full max-w-2xl">
                <h2 className="text-3xl uppercase text-bloxberg-grey relative font-normal pb-10"><i className={`bx bxs-square rotate-45 absolute -left-10 font-light text-2xl text-bloxberg-red`}></i>Verification</h2>
                <h3 className="font-medium text-bloxberg-grey text-2xl pb-4">How would you like to verify your data?</h3>

                <div className="pb-4">
                    <RadioSelection disabledInput={isVerifying} labels={["URL", "File"]} selectedIndex={selectedVerificationType} onSelected={onSelectedVerificationType}></RadioSelection>
                </div>

                <div className="pb-4">
                    {selectedVerificationType === 0 ? (
                        <TextInput onChangeHandler={(e)=> {}} labelText="Certificate URL"  disabledInput={isVerifying}></TextInput>
                    ) : (
                        <FileUpload onSelectedFileListChanged={(e)=> {}} disabledInput={isVerifying}></FileUpload>
                    )}
                </div>

                <PrimaryButton title={isVerifying ? "verifying..." : "verify"} onClick={handleVerifyClick} isLoading={isVerifying}></PrimaryButton>
            </div>
        </div>
    )
}