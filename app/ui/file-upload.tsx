import {ChangeEvent, Dispatch, DragEvent, SetStateAction, useRef, useState} from "react";
import { twMerge } from 'tailwind-merge'

export default function FileUpload({disabledInput, onSelectedFileListChanged}:{disabledInput?:boolean,
    onSelectedFileListChanged: (fileList: FileList) => void}) {
    const [selectedFileList, setSelectedFileList] = useState<FileList | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const inputFile = useRef<HTMLInputElement | null>(null);

    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        onReceiveFiles(event.target.files)
    };

    const onReceiveFiles = (fileList: FileList | null) => {
        if(fileList && fileList.length > 0){
            setSelectedFileList(fileList)
            onSelectedFileListChanged(fileList)
        }
    }

    const onSelectFilesClick = () => {
        inputFile.current?.click();
    };

    const handleDrag = function(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = function(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        onReceiveFiles(e.dataTransfer.files)
    };

    const getSelectedFilesHtml = (selectedFileList:FileList | null) => {
        if(selectedFileList){
            return Array.from(selectedFileList)?.map((file, index) => (
                <div key={index} className="font-normal text-base text-bloxberg-grey">
                    <i className='bx bx-file relative top-0.5 mr-1'></i>{file.name}
                </div>
            ))
        } else {
            return <div className="font-normal text-base text-bloxberg-grey">No files selected yet.</div>
        }
    };

    return (
        <div className={twMerge(`relative min-w-[400px] w-full min-h-200 h-fit bg-transparent px-7 py-5 cursor-pointer bloxberg-file-upload ${disabledInput ? "pointer-events-none" : ""}`, `${dragActive ? "bg-bloxberg-blue-200" : ""}`)} onClick={onSelectFilesClick}
             onDragEnter={handleDrag}>
            <input type="file" className="hidden" ref={inputFile} onChange={onFileChange} multiple/>
            <div className="text-center text-bloxberg-blue-100 font-medium text-xl mb-4"><i className='bx bx-upload relative top-0.5'></i> <u>Choose file</u> or drag and drop files here</div>
            {getSelectedFilesHtml(selectedFileList)}
            { dragActive && <div className={"absolute w-full h-full top-0 bottom-0 left-0 right-0"} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
        </div>
    )
}