"use client"
import { useAside } from '@/contexts/contextAside/contextAside';
import { MenuFoldOutlined, MenuUnfoldOutlined,SmileOutlined, MedicineBoxOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { CircleUserRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ExitIcon } from '@radix-ui/react-icons';
import Logo from "../../assets/LogoHome-removebg-preview.png"


import { usePathname, useRouter } from "next/navigation"



export default function HeaderSideBar() {

    const pathname = usePathname()

    const { isAsideVisible, toggleAside, user } = useAside();



    const logoutFunction = () => {
        if (window !== undefined) {
            localStorage.clear()
            window.location.reload()
        }
    }

    return (
        <header className={`flex items-center w-full h-[80px] bg-[#084D45] gap-3 ${pathname === "/pages/login" ? "hidden" : ""} relative`}>
            <section className={`${isAsideVisible && ("hidden")} w-[15%] h-[80px] bg-[#084D45] flex items-center justify-around`}>
                <Image
                    width={180}
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
                <label className='text-white text-[24px] font-semibold ml-auto mr-5'>{user.username}</label>
                <CircleUserRound size={40} color='white' />
            </div>
            <aside className={`absolute top-0 w-[15%] min-h-screen z-[2] border-r border-[#757575] flex flex-col items-start justify-start 
                ${isAsideVisible ? "translate-x-0" : "-translate-x-full"} 
                transition-transform duration-300 ease-in-out bg-white`}>

                <header className="w-full h-[80px] bg-[#084D45] flex items-center justify-around">
                    <Image
                        width={180}
                        height={136}
                        src={Logo.src}
                        alt="Logo"
                    />
                    <MenuFoldOutlined
                        size={25}
                        className="text-white cursor-pointer"
                        onClick={() => toggleAside()}
                    />
                </header>

                <nav className="w-full h-[85vh] flex flex-col items-start gap-1 py-4 relative">
                    <Link href={"/pages/users"} className={`w-full h-[56px] font-bold text-[16px] hover:border-l-[5px] hover:border-[#084D45] flex items-center gap-3 p-3 hover:border-opacity-100 hover:bg-[#b6dcff77] 
                    ${pathname === "/pages/users" && "bg-[#b6dcff77]"} 
                    ${pathname === "/pages/users/register" && "bg-[#b6dcff77]"} 
                    ${user.is_admin === false && "hidden"}
                    transition-all duration-300 ease-in-out`}>
                        <SmileOutlined className={`text-[#084D45] w-[22px] h-[22px]`} /> Usuários
                    </Link>

                    <Link href={"/pages/materials"} className={`w-full h-[56px] font-bold text-[16px] hover:border-l-[5px] hover:border-[#084D45] flex items-center gap-3 p-3 hover:border-opacity-100 hover:bg-[#b6dcff77] 
                    ${pathname === "/pages/materials" && "bg-[#b6dcff77]"} 
                    ${pathname === "/pages/materials/register" && "bg-[#b6dcff77]"} 
                    transition-all duration-300 ease-in-out`}>
                        <MedicineBoxOutlined className={`text-[#084D45] w-[22px] h-[22px]`} /> Materiais
                    </Link>



                    <Button
                        iconPosition='end'
                        variant='solid'
                        icon={<ExitIcon />}
                        className={`absolute bottom-0 w-full items-center text-[#D75C5D] font-bold border-none`}
                        onClick={logoutFunction}
                    >
                        Sair
                    </Button>
                </nav>
            </aside>
        </header>
    )
}