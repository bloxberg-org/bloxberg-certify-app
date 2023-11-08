import TextInput from "@/app/ui/text-input";

export default function StepInfo({disabledInput}:{disabledInput:boolean}) {
    return (
        <div>
            <p className="mb-4 text-bloxberg-white font-light text-base leading-7">Every field is optional, it is only to enhance the generated certificate at the end of the process. If
                you do not wish to provide any information, simply click verify.</p>
            <TextInput containerCss="mb-4" labelText="Author or group name" hintText="Enter your group or author(s) research was conducted with" disabledInput={disabledInput}></TextInput>
            <TextInput containerCss="mb-4" labelText="Bloxberg address" hintText="Enter your bloxberg address that you would like the certification to be minted to." disabledInput={disabledInput}></TextInput>
            <TextInput containerCss="mb-4" labelText="Title or brief description of research" hintText="Enter a brief description of what the data entails" disabledInput={disabledInput}></TextInput>
            <TextInput containerCss="mb-4" labelText="Email address" hintText="If you wish an email address to be associated with the data" disabledInput={disabledInput}></TextInput>
        </div>
    )
}