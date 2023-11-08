'use client'

import {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {StaticImport} from "next/dist/shared/lib/get-img-props";

export default function ChooseCard({title, description, url, imgSrc, imgSrcHover, imagAlt}: {title: string, description: string, url: string, imgSrc: string | StaticImport, imgSrcHover: string | StaticImport, imagAlt: string}) {
    const [isHovering, setIsHovered] = useState(false);
    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);

    return (
        <Link href={url}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}>
            {isHovering ? (
                <Image
                    src={imgSrc}
                    alt={imagAlt}
                    className="mx-auto my-0"
                    style={{
                        height: '290px',
                        width: 'fit-content',
                    }}>
                </Image>
            ) : (
                <Image
                    src={imgSrcHover}
                    alt={imagAlt}
                    className="mx-auto my-0"
                    style={{
                        height: '290px',
                        width: 'fit-content',
                    }}>
                </Image>
            )}
            <div className="text-2xl font-medium text-bloxberg-grey relative -top-8 text-center">
                {title}
            </div>
            <p className="font-light text-bloxberg-grey text-center relative -top-5">{description}</p>
        </Link>
    )
}