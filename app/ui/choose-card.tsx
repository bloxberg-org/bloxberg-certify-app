'use client'

import {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {StaticImport} from "next/dist/shared/lib/get-img-props";

export default function ChooseCard({title, url, imgSrc, imgSrcHover, imagAlt}: {title: string, url: string, imgSrc: string | StaticImport, imgSrcHover: string | StaticImport, imagAlt: string}) {
    const [isHovering, setIsHovered] = useState(false);
    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);

    return (
        <div className="flex mx-4 flex-col">
            <Link href={url}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}>
                {isHovering ? (
                    <Image
                        src={imgSrc}
                        alt={imagAlt}
                        className={""}
                        style={{
                            height: '290px',
                            width: 'auto'
                        }}>
                    </Image>
                ) : (
                    <Image
                        src={imgSrcHover}
                        alt={imagAlt}
                        className={""}
                        style={{
                            height: '290px',
                            width: 'auto'
                        }}>
                    </Image>
                )}
                <div className="text-2xl font-medium text-bloxberg-grey relative -top-8 text-center">
                    {title}
                </div>
            </Link>
        </div>
    )
}