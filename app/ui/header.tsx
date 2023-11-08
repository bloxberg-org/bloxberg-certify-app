import Image from 'next/image'
import Link from 'next/link'
import bloxbergLogo from '@/public/images/bloxberg_logo_header.png'

export default function Header() {
    return (
        <nav className="h-[118px] bg-bloxberg-blue-950 px-4 py-6 flex justify-center items-center">
            <div className="flex max-w-screen-lg w-full justify-between items-center">
                <Link href={`/`}>
                    <Image
                        src={bloxbergLogo}
                        alt="bloxberg logo"
                        className={"mt-5 mb-5 mr-5"}
                        style={{
                            height: '47px',
                            width: 'fit-content',
                        }}
                    />
                </Link>
                <ul className="flex items-center">
                    <Link href={`/verify`}>
                        <li className="px-6 py-5 uppercase text-bloxberg-grey text-lg hover:text-bloxberg-red hover:cursor-pointer">
                            Verify
                        </li>
                    </Link>
                    <Link href={`/certify`}>
                        <li className="px-6 py-5 uppercase text-bloxberg-grey text-lg hover:text-bloxberg-red hover:cursor-pointer">
                            Certify
                        </li>
                    </Link>
                </ul>
            </div>
        </nav>
    )
}
