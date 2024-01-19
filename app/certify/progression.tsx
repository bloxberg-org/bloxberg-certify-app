import React, {useState} from "react";
import StepHash from "@/app/certify/step-hash";
import StepInfo from "@/app/certify/step-info";
import StepItem from "@/app/certify/step-item";
import axios from "axios";
import {environmentVariables} from "@/app/environment";
import FileSaver from "file-saver";
import Web3 from "web3";

export const CertifyData  = React.createContext<CertifyContext>({
    crid: [],
    setCrid: () => {},
    metaData: {
        authorName: '',
        publicKey: '',
        researchTitle: '',
        email: ''
    },
    setMetaData: () => {},
});

export default function Progression() {
    const [stepIndex, setStepIndex] = useState(0);
    const [metaDataErrors, setMetaDataErrors] = useState<Map<string, string[]>>(new Map());
    const [cridErrors, setCridErrors] = useState<Map<string, string[]>>(new Map());
    const [dataUrl, setDataUrl] = useState<string>('');
    const [isCertifying, setIsCertifying] = useState(false);
    const [crid, setCrid] = useState<string[]>([]);
    const [metaData, setMetaData] = useState<CertifyMetaData>({
        authorName: '',
        publicKey: '0x9858eC18a269EE69ebfD7C38eb297996827DDa98',
        researchTitle: '',
        email: ''
    });

    const nextStep = () => {
        let nexStepIndex = stepIndex + 1;
        setStepIndex(nexStepIndex);
        scrollToStep(nexStepIndex);
    };

    const lastStep = () => {
        setMetaDataErrors(new Map())
        let lastStepIndex = stepIndex - 1;
        setStepIndex(lastStepIndex);
        scrollToStep(lastStepIndex);
    };

    const resetProgression = () => {
        let nexStepIndex = 0;
        setStepIndex(nexStepIndex);
        scrollToStep(nexStepIndex);
    };

    const scrollToStep = (stepIndex: number) => {
        document.getElementById(steps[stepIndex%steps.length].id)?.scrollIntoView({ behavior: "smooth" });
    }

    const generateCdir = () => {
        nextStep()
    }

    const validateMetaDataInput = () => {
        return Web3.utils.isAddress(metaData.publicKey)
    }

    const certifyData = async  () => {
        if(!validateMetaDataInput()) {
            setMetaDataErrors(new Map([["public_key", ["Public key is not valid."]]]))
            return
        }
        let errors = new Map()

        let {publicKey} = metaData
        let metaDataWithoutPublicKey = {
            authorName: metaData.authorName,
            researchTitle: metaData.researchTitle,
            email: metaData.email,
        }

        setIsCertifying(true)
        axios
            .post(environmentVariables.api_url + '/createBloxbergCertificate', {
                'publicKey': publicKey,
                'crid': crid,
                'cridType': 'sha2-256',
                'enableIPFS': false,
                'metadataJson':  JSON.stringify(metaDataWithoutPublicKey)
            }, {headers: {
                'api_key': environmentVariables.api_key
            }})
            .then(res => {
                if(res.data.errors !== undefined) {
                    let error = ""
                    res.data.errors.forEach((err: any) => error = error.concat(' ', err))
                    throw new Error(error);
                } else {
                    setDataUrl(res.data)
                    nextStep();
                }
            })
            .catch(err => {
                console.log(`Error sending certificate data: ${err}`)
                errors.set("general", ["Error sending certificate data"])
            })
            .finally(() => {
                setIsCertifying(false)
                setMetaDataErrors(errors)
            })
    };

    const downloadCertificate = () => {
        axios.post(environmentVariables.api_url + '/generatePDF', dataUrl, {responseType: 'arraybuffer', headers: {
                'api_key': environmentVariables.api_key
            }})
            .then(response => {
                var blob = new Blob([response.data], {type: 'application/x-zip-compressed'})
                FileSaver.saveAs(blob, 'BloxbergDataCertificates.zip')
            })
    };

    let steps: StepItemData[] = [
        {
            id: "step-hash",
            primaryAction: generateCdir,
            primaryActionTitle: "next",
            stepTitle: "Hash",
            errors: cridErrors,
            stepContent: <StepHash disabledInput={stepIndex !== 0} setErrors={setCridErrors}></StepHash>
        },
        {
            id: "step-info",
            primaryAction: certifyData,
            secondaryAction: lastStep,
            primaryActionTitle: "certify",
            secondaryActionTitle: "back",
            isLoadingPrimaryActionTitle: "certifying...",
            stepTitle: "Info",
            errors: metaDataErrors,
            stepContent: <StepInfo disabledInput={stepIndex !== 1 || isCertifying}></StepInfo>
        },
        {
            id: "step-download",
            primaryAction: downloadCertificate,
            primaryActionTitle: "download",
            secondaryActionTitle: "reset",
            secondaryAction: resetProgression,
            stepTitle: "Download",
            errors: new Map(),
            stepContent: <div className={`text-bloxberg-white ${stepIndex !== 2 ? 'hidden' : ''}`}>Transaction confirmed! You can download your certificate now.</div>
        }
    ]

    return (
        <CertifyData.Provider value={{
            setCrid: setCrid,
            setMetaData: setMetaData,
            crid: crid,
            metaData: metaData
        }}>
            <ol className="w-full max-w-2xl">
                {steps.map((step, index) => (
                    <StepItem key={step.id} id={step.id} stepTitle={step.stepTitle} currentIndex={stepIndex} stepItemIndex={index} maxStepIndex={steps.length-1} primaryActionTitle={step.primaryActionTitle}
                              primaryAction={step.primaryAction} secondaryAction={step.secondaryAction} stepContent={step.stepContent}
                              disabledInput={stepIndex !== index} isLoading={isCertifying} isLoadingPrimaryActionTitle={step.id === "step-info" ? "certifying..." : undefined}
                    errors={step.errors}></StepItem>
                ))}
            </ol>
        </CertifyData.Provider>
    )
}

export interface StepItemData{
    id: string,
    stepTitle: string,
    primaryActionTitle: string,
    secondaryActionTitle?: string,
    errors: Map<string, string[]>
    isLoadingPrimaryActionTitle?: string
    primaryAction:  React.MouseEventHandler<HTMLButtonElement> | undefined,
    secondaryAction?: React.MouseEventHandler<HTMLButtonElement> | undefined,
    stepContent: React.JSX.Element | undefined
}

export interface CertifyContext{
    crid: string[],
    setCrid: React.Dispatch<React.SetStateAction<string[]>>
    metaData: CertifyMetaData
    setMetaData: React.Dispatch<React.SetStateAction<CertifyMetaData>>
}

export interface CertifyMetaData{
    authorName: string
    publicKey: string
    researchTitle: string
    email: string
}