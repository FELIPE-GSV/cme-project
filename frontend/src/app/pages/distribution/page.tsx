"use client"

import { useAside } from "@/contexts/contextAside/contextAside"
import { getTrataments } from "@/services/tratamentsService"
import { Tratament } from "@/types/models"
import Table, { ColumnsType } from "antd/es/table"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import FormDistribution from "./formDistribution"
import { notification } from "antd"
import { NotificationType } from "@/app/layout"


export default function Distribution() {

    const { isAsideVisible } = useAside()
    const router = useRouter()
    const [trataments, setTrataments] = useState<Tratament[]>([])

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType, message: string, description: string) => {
        api[type]({
            message: message,
            description: description,
        });
    };

    const listTrataments = async () => {
        if (typeof window !== undefined) {
            const token = localStorage.getItem("token")
            const response = await getTrataments(token)
            console.log(response)
            if (response) {
                setTrataments(response)
            }
        }
    }

    useEffect(() => {
        listTrataments()
    }, [router])

    const columns: ColumnsType<Tratament> = [
        {
            title: "Serial",
            dataIndex: "identifier",
            key: "identifier",
            width: "33%",
            render: (_, record) =>
                <strong>{record.material.serial}</strong>

        },

        {
            title: "Distribuição",
            dataIndex: "distribution",
            key: "distribution",
            width: "33%",

            render: (_, record) =>
                <div>
                    {
                        !record.distribution ? <label className="p-1 bg-yellow-300 rounded-sm border-[2px] border-yellow-500 font-bold text-yellow-600">
                            Pentente
                        </label> : <label className="p-1 bg-green-300 rounded-sm border-[2px] border-green-500 font-bold text-green-600">
                            Distribuído
                        </label>
                    }
                </div>

        },
        {
            title: "Ações",
            key: "actions",
            width: "33%",

            render: (_, record) => (
                <div style={{ display: "flex", gap: 8 }}>
                    <FormDistribution
                        listTrataments={listTrataments}
                        onMessage={(type: NotificationType, message: string, description: string) => openNotificationWithIcon(type, message, description)}
                        tratament={record}
                    />
                </div>
            ),
        },


    ]

    return (
        <>
            {contextHolder}
            <main
                className={`
            ${isAsideVisible ? "ml-[15%]" : "ml-0"}
            p-7 flex flex-col items-start gap-6
        `}
            >
                <h1 className="text-[32px] text-[#084D45] font-bold">Distribuição</h1>
                <Table
                    dataSource={trataments}
                    columns={columns}
                    rowKey={(record) => record.material.serial}
                    pagination={{ pageSize: 6 }}
                    style={{ width: "100%" }}
                />
            </main>
        </>
    )
}