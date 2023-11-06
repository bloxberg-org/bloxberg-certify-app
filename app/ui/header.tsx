import Image from 'next/image'
import Link from 'next/link'
import bloxbergLogo from '@/assets/images/bloxberg_logo_header.webp'

export default function Header() {
    return (
        <nav className="h-[118px] bg-bloxberg-blue-950 px-4 py-6 flex justify-center items-center">
            <div className="flex max-w-screen-xl w-full justify-between justify-center items-center">
                <Link href={`/`}>
                    <Image
                        src={bloxbergLogo}
                        alt="bloxberg logo"
                        className={"m-5"}
                        style={{
                            height: '47px',
                            width: 'auto'
                        }}
                    />
                </Link>
                <ul className="flex items-center">
                    <li className="px-6 py-5 uppercase text-bloxberg-grey text-lg hover:text-bloxberg-red hover:cursor-pointer">
                        <Link href={`/verify`}>Verify</Link>
                    </li>
                    <li className="px-6 py-5 uppercase text-bloxberg-grey text-lg hover:text-bloxberg-red hover:cursor-pointer">
                        <Link href={`/certify`}>Certify</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
