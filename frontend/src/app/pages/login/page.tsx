"use client"

import Image from "next/image"
import ImageHome from "../../../assets/imageFundoLogin.png"
import LogoHome from "../../../assets/logoCMETRACK-removebg-preview.png"
import { Button, Input, notification } from "antd"
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined } from '@ant-design/icons'
import { BASE_URL } from "@/app/api/api"
import { useState } from "react"
import { NotificationType } from "@/app/layout"
import { useRouter } from "next/navigation"

export default function Login() {
    const router = useRouter()

    const [loginObject, setLoginObject] = useState({
        username: "",
        password: ""
    })

    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType, message: string, description: string) => {
        api[type]({
            message: message,
            description: description,
        });
    };


    const loginMethod = async () => {

        if (loginObject.username === "" || loginObject.password === "") {
            openNotificationWithIcon("warning", "Campos vazios.", "Certifique-se de que preencheu todoso os campos!")
            return
        }

        const username = loginObject.username
        const password = loginObject.password

        try {
            const response = await fetch(`${BASE_URL}/login/`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })
            if (response.ok) {
                const data = await response.json()
                if (typeof window !== 'undefined') {
                    const now = new Date().getTime();
                    localStorage.setItem('token', data.access);
                    localStorage.setItem('tokenTimestamp', now.toString());
                    openNotificationWithIcon("success", "Login realizado com sucesso!.", "Carregando página seguinte...")
                    router.push("/pages/home")
                   
                }
            } else if (response.status === 404 || response.status === 401) {
                openNotificationWithIcon("warning", "Dados incorretos.", "Certifique-se de que colocou os dados corretos!")
                const data = await response.json()
                console.log("erro 404", data)
                return
            } else if (response.status === 500) {
                openNotificationWithIcon("error", "Erro de conexão.", "Algo ocorreu com a api!")
                const data = await response.json()
                console.log("erro 404", data)
                return
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {contextHolder}
            <main className="w-full h-screen flex items-center justify-center">
                <section className="w-[50%] h-screen relative flex items-start bg-red-500">
                    {/* Seção da imagem */}
                    <Image
                        src={ImageHome.src}
                        width={ImageHome.width}
                        height={1080}
                        alt="ImageHome"
                        className="object-fill h-full w-full"

                    />
                    <div className="absolute w-full h-full bg-[#15A393] opacity-50 top-0 left-0">

                    </div>
                </section>
                {/* Seção da Formulário */}
                <section className="w-[50%] h-screen flex items-center justify-center">
                    <div className="flex flex-col items-center h-[90%] w-[80%] rounded-[5px] shadow-lg shadow-[#0000002a]">
                        <Image
                            src={LogoHome.src}
                            width={320}
                            height={150}
                            alt="LogoHome"
                            className="h-[300px]"
                        />
                        <form className="w-[60%] flex flex-col items-center justify-evenly gap-[25px]">
                            <h2 className="text-[#15A393] text-[32px] font-bold">Log in</h2>
                            <Input
                                type="text"
                                className="h-[35px] border-[#15A393] text-[#15A393] text-[18px] placeholder-[#15A393] placeholder-opacity-40"
                                placeholder="Username"
                                prefix={<></>}
                                suffix={<UserOutlined />}
                                value={loginObject.username}
                                onChange={(e) => setLoginObject({ ...loginObject, username: e.target.value })}
                            />
                            <Input.Password
                                type="text"
                                className="h-[35px] border-[#15A393] text-[#15A393] text-[18px] placeholder-[#15A393] placeholder-opacity-40"
                                placeholder="Password"
                                prefix={<></>}
                                iconRender={(visible) => (visible ? <EyeTwoTone style={{ color: '#15A393' }} /> : <EyeInvisibleOutlined style={{ color: '#15A393' }} />)}
                                value={loginObject.password}
                                onChange={(e) => setLoginObject({ ...loginObject, password: e.target.value })}
                            />
                            <Button type="primary" className="w-full bg-[#15A393] font-bold text-[18px]" onClick={loginMethod}>
                                Log in
                            </Button>
                        </form>
                    </div>
                </section>
            </main>
        </>
    )
}