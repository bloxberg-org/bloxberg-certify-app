import TextInput from "@/app/ui/text-input";
import {ChangeEvent, useContext} from "react";
import {CertifyData} from "@/app/certify/progression";

export default function StepInfo({disabledInput}:{disabledInput:boolean}) {
    const {metaData, setMetaData } = useContext(CertifyData);

    const onAuthorChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setMetaData({
            authorName: event.target.value,
            email: metaData.email,
            publicKey: metaData.publicKey,
            researchTitle: metaData.researchTitle
        })
    };
    const onPublicKeyChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setMetaData({
            authorName: metaData.authorName,
            email: metaData.email,
            publicKey: event.target.value,
            researchTitle: metaData.researchTitle
        })
    };
    const onResearchTitleChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setMetaData({
            authorName: metaData.authorName,
            email: metaData.email,
            publicKey: metaData.publicKey,
            researchTitle: event.target.value
        })
    };
    const onEmailChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setMetaData({
            authorName: metaData.authorName,
            email: event.target.value,
            publicKey: metaData.publicKey,
            researchTitle: metaData.researchTitle
        })
    };

    return (
        <div>
            <p className="mb-4 text-bloxberg-white font-light text-base leading-7">Every field is optional, it is only to enhance the generated certificate at the end of the process. If
                you do not wish to provide any information, simply click verify.</p>
            <TextInput containerCss="mb-4" onChangeHandler={onAuthorChanged} labelText="Author or group name" hintText="Enter your group or author(s) research was conducted with" disabledInput={disabledInput}></TextInput>
            <TextInput containerCss="mb-4" onChangeHandler={onPublicKeyChanged} labelText="bloxberg address" hintText="Enter your bloxberg address that you would like the certification to be minted to." disabledInput={disabledInput}></TextInput>
            <TextInput containerCss="mb-4" onChangeHandler={onResearchTitleChanged} labelText="Title or brief description of research" hintText="Enter a brief description of what the data entails" disabledInput={disabledInput}></TextInput>
            <TextInput containerCss="mb-4" onChangeHandler={onEmailChanged} labelText="Email address" hintText="If you wish an email address to be associated with the data" disabledInput={disabledInput}></TextInput>
        </div>
    )
}