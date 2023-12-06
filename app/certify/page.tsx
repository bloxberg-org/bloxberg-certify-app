'use client'

import Heading1 from "@/app/ui/heading-1";
import React from "react";
import certifyIcon from "@/public/images/icons_thin/4.svg";
import Image from "next/image";
import Progression from "@/app/certify/progression";

export default function Certify() {
    return (
        <div>
            <div className="flex justify-between">
                <div>
                    <Heading1 title="Certify"></Heading1>
                    <p className="text-2xl font-medium text-bloxberg-grey mb-20">Certify your Research Data on the blockchain.</p>
                </div>
                <Image src={certifyIcon} alt="certify logo" style={{
                    width: "207px"
                }}></Image>
            </div>
            <Progression/>
        </div>
    )
}

