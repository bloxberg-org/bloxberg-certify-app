'use client'

import React, {useEffect} from "react";

export default function BloxbergVerifier(){
    useEffect(()=> {
        (async (e) => {
            // @ts-ignore
            await import("@bloxberg-org/blockcerts-verifier/dist/main.js")
        })()

    })

    return (
        <div className={'bg-white'}>
            <blockcerts-verifier></blockcerts-verifier>
        </div>
    );
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'blockcerts-verifier': { }
        }
    }
}