import Image from 'next/image'
import Link from 'next/link'
import ChooseCard from "@/app/ui/choose-card";
import certifyIconRed from "@/public/images/icons_thin/4.svg";
import certifyIconWhite from "@/public/images/icons_thin/4_white.svg";
import verifyIconRed from "@/public/images/icons_thin/2.svg";
import verifyIconWhite from "@/public/images/icons_thin/2_white.svg";
import Heading1 from "@/app/ui/heading-1";

export default function Home() {
  return (
    <div>
        <Heading1 title="bloxberg certify and verify app"></Heading1>
        <div className="flex justify-center">
            <div className="flex mx-4 flex-col max-w-sm">
                <ChooseCard
                    title="Certify"
                    description="This protects your intellectual property and safeguards against potential future scooping by generating a unique identifier from your data that is then stored on the chain. A certificate is then created to provide proof that this information belongs to you or your organization."
                    url="/certify"
                    imagAlt="certify icon"
                    imgSrc={certifyIconRed}
                    imgSrcHover={certifyIconWhite}
                ></ChooseCard>
            </div>
            <div className="flex mx-4 flex-col max-w-sm">
                <ChooseCard
                    title="Verify"
                    description="Have you already certified some data on our blockchain? Utilize this tool to look up your previously published data hash."
                    url="/verify"
                    imagAlt="verify icon"
                    imgSrc={verifyIconRed}
                    imgSrcHover={verifyIconWhite}
                ></ChooseCard>
            </div>
        </div>
    </div>
  )
}
