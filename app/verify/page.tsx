'use client'

import Heading1 from "@/app/ui/heading-1";
import React from "react";
import FileUpload from "@/app/ui/file-upload";
import PrimaryButton from "@/app/ui/primary-button";
import Image from "next/image";
import verifyIcon from "@/public/images/icons_thin/2.svg";
import dynamic from "next/dynamic";


const DynamicBloxbergVerifier = dynamic(() => import('../ui/bloxberg-verifier'), {
    ssr: false,
    loading: () => <div className={'text-white'}>Loading bloxberg verifier...</div>,
})

export default function Verify() {
    // @ts-ignore
    return (
        <div>
            <div className="flex justify-between">
                <div>
                    <Heading1 title="Verify"></Heading1>
                    <p className="text-2xl font-medium text-bloxberg-grey mb-20">Look up your data on the blockchain.</p>
                </div>
                <Image src={verifyIcon} alt="verify logo" style={{
                    width: "207px"
                }}></Image>
            </div>

            <div className="w-full max-w-2xl">
                <h2 className="text-3xl uppercase text-bloxberg-grey relative font-normal pb-10"><i className={`bx bxs-square rotate-45 absolute -left-10 font-light text-2xl text-bloxberg-red`}></i>Verification</h2>
                <div className="pb-4">
                    <DynamicBloxbergVerifier></DynamicBloxbergVerifier>
                </div>
            </div>

        </div>
    )
}