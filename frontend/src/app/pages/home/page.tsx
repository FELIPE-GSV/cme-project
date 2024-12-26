"use client"

import { useAside } from "@/contexts/contextAside/contextAside"
import Image from "next/image"
import LogoHome from "@/assets/LogoHome-removebg-preview.png"

export default function Home() {

    const { isAsideVisible, user } = useAside()

    return (
        <main
            className={`
                ${isAsideVisible ? "ml-[15%]" : "ml-0"}
                flex items-center justify-center min-h-[90vh]   
            `}
        >
            <div className="flex flex-col items-center justify-evenly h-auto w-[80%] rounded-[5px] shadow-lg shadow-[#0000002a] p-7">
                <Image
                    src={LogoHome.src}
                    width={300}
                    height={100}
                    alt="LogoHome"
                    className="h-[300px]"
                />
                <h1 className="text-[32px] text-[#084D45] font-bold">Bem vindo ao CMETrack, {user.username} !</h1>
                <h2 className="text-[24px]">Central de Material e Esterilização</h2>
            </div>
        </main>
    )
}