import {useRef} from "react";

export default function FileUpload({disabledInput}:{disabledInput?:boolean}) {
    const inputFile = useRef<HTMLInputElement | null>(null);

    const onClick = () => {
        inputFile.current?.click();
    };

    const onFileDrop = () => {
        // drag drop
    };

    return (
        <div className={`min-w-[400px] w-full min-h-200 h-fit bg-transparent px-7 py-5 cursor-pointer bloxberg-file-upload ${disabledInput ? "pointer-events-none" : ""}`} onDrop={onFileDrop} onClick={onClick}>
            <input type="file" className="hidden" ref={inputFile}/>
            <div className="text-center text-bloxberg-blue-100 font-medium text-xl mb-4"><i className='bx bx-upload relative top-0.5'></i> <u>Choose file</u> or drag and drop files here</div>
            <div className="font-normal text-base text-bloxberg-grey"><i className='bx bx-file relative top-0.5 mr-1'></i>test-file1.txt</div>
            <div className="font-normal text-base text-bloxberg-grey"><i className='bx bx-file relative top-0.5 mr-1'></i>test-file2.txt</div>
        </div>
    )
}