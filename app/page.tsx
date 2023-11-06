import Image from 'next/image'
import Link from 'next/link'
import ChooseCard from "@/app/ui/choose-card";
import certifyIconRed from "@/assets/images/icons_thin/4.svg";
import certifyIconWhite from "@/assets/images/icons_thin/4_white.svg";
import verifyIconRed from "@/assets/images/icons_thin/2.svg";
import verifyIconWhite from "@/assets/images/icons_thin/2_white.svg";

export default function Home() {
  return (
    <main className="flex h-full bg-bloxberg-blue-800 items-center justify-center py-24 ">
        <ChooseCard
          title="Certify"
          url="/certify"
          imagAlt="certify icon"
          imgSrc={certifyIconRed}
          imgSrcHover={certifyIconWhite}
        ></ChooseCard>
        <ChooseCard
            title="Verify"
            url="/verify"
            imagAlt="verify icon"
            imgSrc={verifyIconRed}
            imgSrcHover={verifyIconWhite}
        ></ChooseCard>
    </main>
  )
}
