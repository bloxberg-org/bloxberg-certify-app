import Link from "next/link";
import Image from "next/image";
import bloxbergLogo from "@/assets/images/bloxberg_logo_header.webp";

export default function Heading1({title}: {title: string}) {
    return (
        <div className="mb-12 relative">
            <i className="bx bxs-square text-bloxberg-red rotate-45 absolute -left-10 font-light text-2xl top-[7px]"></i>
            <h1 className="text-5xl uppercase text-bloxberg-blue-100 relative font-normal">{title}</h1>
        </div>
    )
}