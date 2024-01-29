import React, {ChangeEvent, useContext} from "react";
import RadioSelection from "@/app/ui/radio-selection";
import TextInput from "@/app/ui/text-input";
import FileUpload from "@/app/ui/file-upload";
import {CertifyData} from "@/app/certify/progression";
import sha256 from 'crypto-js/sha256';

export default function StepHash({disabledInput, setErrors}:{disabledInput:boolean, setErrors: React.Dispatch<React.SetStateAction<Map<string, string[]>>>}) {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const {setCrid, selectedHashFiles, setSelectedHashFiles,
        textInputValueHash, setTextInputValueHash  } = useContext(CertifyData);
    const onSelected = (selectedIndex: number) => {
        setCrid([])
        setSelectedIndex(selectedIndex)
    };

    const onSelectedFileListChanged = (selectedFileList: FileList) => {
        let errors = new Map()
        let newCrid: string[] = []
        Array.from(selectedFileList)?.forEach((file: File, _) => {
            try {
                let reader = new window.FileReader()
                reader.readAsArrayBuffer(file)
                reader.onloadend = () => {
                    try {
                        let fileAsString = reader.result?.toString()
                        if(fileAsString) {
                            let hash = sha256(fileAsString).toString()
                            newCrid.push(hash)
                        } else {
                            throw new Error('the string conversation of the file is undefined');
                        }
                    } catch (err) {
                        setCrid([])
                        errors.set("file", ["There was an error when creating the hashsum for file " + file.name])
                        setErrors(errors)
                        console.log(err)
                        return
                    }
                }
            } catch (err) {
                setCrid([])
                errors.set("file", ["There was an error when reading the file " + file.name])
                console.log(err)
                return
            }
        })
        setErrors(errors)
        setCrid(newCrid)
        setSelectedHashFiles(selectedFileList)
    }

    const textInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.value.length === 0){
            setCrid([])
        } else {
            setCrid([event.target.value])
        }
        setTextInputValueHash(event.target.value)
    };

    return (
        <div>
            <h3 className="font-medium text-bloxberg-grey text-2xl pb-4">How would you like to generate the hash?</h3>
            <div className="pb-4">
                <RadioSelection disabledInput={disabledInput} labels={["Generate from file(s)", "Manual entry"]} selectedIndex={selectedIndex} onSelected={onSelected}></RadioSelection>
            </div>

            {selectedIndex === 0 ? (
                <FileUpload inputFileList={selectedHashFiles} disabledInput={disabledInput} onSelectedFileListChanged={onSelectedFileListChanged}
                textUnderlined={"Choose file"} minorText={"or drag and drop files here"}></FileUpload>
            ) : (
                <TextInput value={textInputValueHash} labelText="Enter hash manually" onChangeHandler={textInputChangeHandler} labelRequired hintText="If you prefer generating your own hash for your data, enter it here." disabledInput={disabledInput}></TextInput>
            )}
        </div>
    )
}