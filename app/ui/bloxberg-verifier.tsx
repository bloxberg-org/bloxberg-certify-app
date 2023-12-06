'use client'

import React, {useEffect} from "react";
import webcomponents from "@webcomponents/webcomponentsjs/webcomponents-loader.js";
import blockcertsVerifier from "@bloxberg-org/blockcerts-verifier/dist/main.js";
import Script from "next/script";

export default function BloxbergVerifier(){
    useEffect(()=> {
        (async (e) => {
            const test = (await import(webcomponents)).default
            const test2 = (await import(blockcertsVerifier)).default
        })()

    })

    return (
        <>
            {/*<Script type="text/javascript" src={webcomponents} />*/}
            {/*<Script type="text/javascript" src={blockcertsVerifier} />*/}
            <blockcerts-verifier></blockcerts-verifier>
        </>

    );
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'blockcerts-verifier': { }
        }
    }
}