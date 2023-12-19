'use client'

import React, {useEffect} from "react";
// import webcomponents from "@webcomponents/webcomponentsjs/webcomponents-loader.js";
// import blockcertsVerifier from "@bloxberg-org/blockcerts-verifier/dist/main.js";
import Script from "next/script";
// import WebComponents from "@webcomponents/webcomponentsjs";

export default function BloxbergVerifier(){
    useEffect(()=> {
        (async (e) => {
            // new WebComponents()
            const test = (await import("@webcomponents/webcomponentsjs")).default
            // @ts-ignore
            const test2 = (await import("@bloxberg-org/blockcerts-verifier/dist/main.js"))
        })()

    })

    return (
        <>
            {/*<Script type="text/javascript" src={webcomponents} />*/}
            <Script type="text/javascript" src={"main.js"} />
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