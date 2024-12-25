"use client"
import { useAside } from '@/contexts/contextAside/contextAside';
import {MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined, SmileOutlined, TagOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { CircleUserRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ExitIcon } from '@radix-ui/react-icons';
import Logo from "../../assets/LogoHome-removebg-preview.png"


import { usePathname, useRouter } from "next/navigation"

interface ArrayTitleHeaders {
    to: string
    title: string
    icon: React.ReactNode
}

export default function HeaderSideBar(){

    const pathname = usePathname()
    const router = useRouter()

    const itemsHeader: ArrayTitleHeaders[] = [
        {
            title: "Produtos",
            to: "/pages/products",
            icon: <TagOutlined className={`text-[#004281}] w-[22px] h-[22px]`} />
        },
        {
            title: "Equipamentos",
            to: "/pages/equipaments",
            icon: <SettingOutlined className={`text-[#004281] w-[22px] h-[22px]`} />
        },
        {
            title: "Usuários",
            to: "/pages/users",
            icon: <SmileOutlined className={`text-[#004281] w-[22px] h-[22px]`} />
        },
    ]

    const { isAsideVisible, toggleAside } = useAside();

    return(
        <header className={`flex items-center w-full h-[80px] bg-[#002147] gap-3 ${pathname === "/pages/login" ? "hidden" : ""} relative`}>
            <section className={`${isAsideVisible && ("hidden")} w-[15%] h-[80px] bg-[#002147] flex items-center justify-around`}>
                <Image
                    width={120}
                    height={60}
                    src={Logo.src}
                    alt="Logo"
                />
                <MenuUnfoldOutlined
                    size={25}
                    className="text-white cursor-pointer"
                    onClick={() => toggleAside()}
                />
            </section>
            <div className='ml-auto mr-5 h-full flex items-center w-[15%]'>
                <CircleUserRound size={40} color='white' className='ml-auto mr-5' />
                <label className='text-white font-semibold'>Teste</label>
            </div>
            <aside className={`absolute top-0 w-[15%] min-h-screen z-[150] border-r border-[#757575] flex flex-col items-start justify-start 
                ${isAsideVisible ? "translate-x-0" : "-translate-x-full"} 
                transition-transform duration-300 ease-in-out bg-white`}>

                <header className="w-full h-[80px] bg-[#002147] flex items-center justify-around">
                    <Image
                        width={120}
                        height={35}
                        src={Logo.src}
                        alt="Logo"
                    />
                    <MenuFoldOutlined
                        size={25}
                        className="text-white cursor-pointer"
                        onClick={() => toggleAside()}
                    />
                </header>

                <nav className="w-full h-[100vh] flex flex-col items-start py-4">
                    <Link href={"/pages/products"} className={`w-full h-[56px] font-bold text-[16px] hover:border-l-[5px] hover:border-[#004281] flex items-center gap-3 p-3 hover:border-opacity-100 hover:bg-[#b6dcff77] 
                    ${pathname === "/pages/products" && "bg-[#b6dcff77]"} 
                    ${pathname === "/pages/products/register" && "bg-[#b6dcff77]"} 
                    transition-all duration-300 ease-in-out`}
                    >
                        <TagOutlined className={`text-[#004281] w-[22px] h-[22px]`} /> Produtos
                    </Link>
                    <Link href={"/pages/equipaments"} className={`w-full h-[56px] font-bold text-[16px] hover:border-l-[5px] hover:border-[#004281] flex items-center gap-3 p-3 hover:border-opacity-100 hover:bg-[#b6dcff77] 
                    ${pathname === "/pages/equipaments" && "bg-[#b6dcff77]"} 
                    ${pathname === "/pages/equipaments/register" && "bg-[#b6dcff77]"} 
                    transition-all duration-300 ease-in-out`}>
                        <SettingOutlined className={`text-[#004281] w-[22px] h-[22px]`} /> Equipamentos
                    </Link>
                    <Link href={"/pages/users"} className={`w-full h-[56px] font-bold text-[16px] hover:border-l-[5px] hover:border-[#004281] flex items-center gap-3 p-3 hover:border-opacity-100 hover:bg-[#b6dcff77] 
                    ${pathname === "/pages/users" && "bg-[#b6dcff77]"} 
                    ${pathname === "/pages/users/register" && "bg-[#b6dcff77]"} 
                    transition-all duration-300 ease-in-out`}>
                        <SmileOutlined className={`text-[#004281] w-[22px] h-[22px]`} /> Usuários
                    </Link>
                    <Button
                        iconPosition='end'
                        variant='solid'
                        icon={<ExitIcon />}
                        className='mt-auto w-full items-center text-[#D75C5D] font-bold border-none'
                        // onClick={logoutFunction}
                    >
                        Sair
                    </Button>
                </nav>
            </aside>
        </header>
    )
}