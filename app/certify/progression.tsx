import React, {useState} from "react";
import StepHash from "@/app/certify/step-hash";
import StepInfo from "@/app/certify/step-info";
import StepItem from "@/app/certify/step-item";
import {environmentVariables} from "@/app/environment";
import FileSaver from "file-saver";
import Web3 from "web3";
import {Api} from "@/app/lib/api";

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
    selectedHashFiles: null,
    textInputValueHash: "",
    setSelectedHashFiles: () => {},
    setTextInputValueHash: () => {},
});

export default function Progression() {
    const api: Api = new Api(environmentVariables.api_url, environmentVariables.api_key)
    const [stepIndex, setStepIndex] = useState(0);
    const [metaDataErrors, setMetaDataErrors] = useState<Map<string, string[]>>(new Map());
    const [cridErrors, setCridErrors] = useState<Map<string, string[]>>(new Map());
    const [dataUrl, setDataUrl] = useState<string>('');
    const [isCertifying, setIsCertifying] = useState(false);
    const [crid, setCrid] = useState<string[]>([]);
    const [selectedHashFiles, setSelectedHashFiles] = useState<FileList | null>(null);
    const [textInputValueHash, setTextInputValueHash] = useState<string>("");
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
        setMetaData({
            authorName: "",
            email: "",
            publicKey: "0x9858eC18a269EE69ebfD7C38eb297996827DDa98",
            researchTitle: ""
        })
        setSelectedHashFiles(null)
        setTextInputValueHash("")
        setStepIndex(nexStepIndex);
        scrollToStep(nexStepIndex);
    };

    const scrollToStep = (stepIndex: number) => {
        document.getElementById(steps[stepIndex%steps.length].id)?.scrollIntoView({ behavior: "smooth" });
    }

    const generateCdir = () => {
        if(crid.length === 0) {
            setCridErrors(new Map([
                ["hash", ["Hash must be non empty. Either select a file or enter a hash manually."]]
            ]))
        } else {
            setCridErrors(new Map())
            nextStep()
        }
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
        try{
            let certificateResponse = await api.createBloxbergCertificate({
                bloxbergAddress: publicKey,
                crid: crid,
                meta: metaDataWithoutPublicKey
            });

            if(certificateResponse.errors !== undefined) {
                let error = ""
                certificateResponse.errors.forEach((err: any) => error = error.concat(' ', err))
                throw new Error(error);
            } else {
                setDataUrl(certificateResponse)
                nextStep();
            }
        } catch (e) {
            console.log(`Error sending certificate data: ${e}`)
            errors.set("general", ["Error sending certificate data"])
        } finally {
            setIsCertifying(false)
            setMetaDataErrors(errors)
        }
    };

    const downloadCertificate = async () => {
        let download = await api.downloadCertificate(dataUrl);
        var blob = new Blob([download], {type: 'application/x-zip-compressed'})
        FileSaver.saveAs(blob, 'BloxbergDataCertificates.zip')
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
            secondaryActionTitle: "certify more",
            secondaryAction: resetProgression,
            stepTitle: "Download",
            errors: new Map(),
            stepContent: <div className={`text-bloxberg-white ${stepIndex !== 2 ? 'hidden' : ''}`}>Transaction confirmed! You can download your certificate now.</div>
        }
    ]

    return (
        <CertifyData.Provider value={{
            setCrid: setCrid,
            setSelectedHashFiles: setSelectedHashFiles,
            setTextInputValueHash: setTextInputValueHash,
            setMetaData: setMetaData,
            crid: crid,
            selectedHashFiles: selectedHashFiles,
            textInputValueHash: textInputValueHash,
            metaData: metaData
        }}>
            <ol className="w-full max-w-2xl">
                {steps.map((step, index) => (
                    <StepItem key={step.id} id={step.id} stepTitle={step.stepTitle} currentIndex={stepIndex} stepItemIndex={index} maxStepIndex={steps.length-1} primaryActionTitle={step.primaryActionTitle}
                              primaryAction={step.primaryAction} secondaryActionTitle={step.secondaryActionTitle} secondaryAction={step.secondaryAction} stepContent={step.stepContent}
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
    selectedHashFiles: FileList | null,
    textInputValueHash: string,
    setSelectedHashFiles: React.Dispatch<React.SetStateAction<FileList | null>>,
    setTextInputValueHash: React.Dispatch<React.SetStateAction<string>>,
}

export interface CertifyMetaData{
    authorName: string
    publicKey: string
    researchTitle: string
    email: string
}