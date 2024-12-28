"use client"

import { NotificationType } from "@/app/layout";
import { useAside } from "@/contexts/contextAside/contextAside";
import { deleteReceivingMaterial, getReceivingMaterials } from "@/services/receivingMaterialService";
import { Condition, Material, ReceivingMaterial } from "@/types/models";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, notification } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormCreateReceivingMaterial from "./formCreateReceivingMaterial";
import { BASE_URL } from "@/api/api";
import { getConditions } from "@/services/conditionService";
import FormEditReceivingMaterial from "./formEditReceivingMaterial";

export default function ReceivingMaterials() {

    const router = useRouter()

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType, message: string, description: string) => {
        api[type]({
            message: message,
            description: description,
        });
    };

    const { isAsideVisible } = useAside()

    const [receiving, setReceiving] = useState<ReceivingMaterial[]>([])
    const [materials, setMaterials] = useState<Material[]>([])
    const [conditions, setConditions] = useState<Condition[]>([])
    const [search, setSearch] = useState("")

    const listReceivingMaterials = async () => {
        if (typeof window !== undefined) {
            const token = localStorage.getItem('token')
            const response = await getReceivingMaterials(token)
            if (response) {
                setReceiving(response)
            }
        }
    }
    const listMaterials = async () => {
        if (typeof window !== undefined) {
            const token = localStorage.getItem('token')
            try {
                const response = await fetch(`${BASE_URL}/materials/list/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })

                if (response.ok) {
                    const data = await response.json()
                    setMaterials(data)
                }

            } catch (error) {
                console.log(error)
            }
        }
    }

    const listConditions = async () => {
        if (typeof window !== undefined) {
            const token = localStorage.getItem("token")
            const response = await getConditions(token)
            if (response) {
                setConditions(response)
            }
        }
    }

    const deleteItem = async (receivinToDelete: ReceivingMaterial) => {
        if (typeof window !== undefined) {
            const token = localStorage.getItem("token")
            const response = await deleteReceivingMaterial(token, receivinToDelete.id)
            if (response) {
                listReceivingMaterials()
                openNotificationWithIcon("success", "Solicitação editada.", "Informações alteradas com sucesso!")
            }
        }
    }

    useEffect(() => {
        listMaterials()
        listReceivingMaterials()
        listConditions()
    }, [router])

    const columns: ColumnsType<ReceivingMaterial> = [
        {
            title: "Serial",
            dataIndex: "material",
            key: "serial",
            render: (_, record) => (
                <strong>{record.material.serial}</strong>
            )

        },
        {
            title: "Data do recebimento",
            dataIndex: "entry_date",
            key: "serial",
            render: (_, record) => (
                <strong>{record.entry_date}</strong>
            )
        },
        {
            title: "Condição",
            dataIndex: "condition",
            key: "condition",
            render: (_, record) => (
                <strong>{record.condition.name}</strong>
            )
        },
        {
            title: "Quantidade",
            dataIndex: "quantity",
            key: "quantity",
            render: (_, record) => (
                <strong>{record.quantity}</strong>
            )
        },
        {
            title: "Necesita de lavagem?",
            dataIndex: "need_washing",
            key: "need_washing",
            render: (_, record) => (
                <strong>{record.need_washing ? "sim" : "nao"}</strong>
            )
        },
        {
            title: "Necesita de Esterilização?",
            dataIndex: "need_sterilization",
            key: "need_sterilization",
            render: (_, record) => (
                <strong>{record.need_sterilization ? "sim" : "nao"}</strong>
            )
        },
        {
            title: "Necesita de Descarte?",
            dataIndex: "need_discard",
            key: "need_discard",
            render: (_, record) => (
                <strong>{record.need_discard ? "sim" : "nao"}</strong>
            )
        },
        {
            title: "Ações",
            key: "actions",
            render: (_, record) => (
                <div style={{ display: "flex", gap: 8 }}>
                    <FormEditReceivingMaterial
                        conditions={conditions}
                        listReceivingMaterials={listReceivingMaterials}
                        materials={materials}
                        receiving={record}
                        onMessage={(message: string, type: NotificationType, description: string) => openNotificationWithIcon(type, message,description)}

                    />
                    <Button
                        type='primary'
                        iconPosition='start'
                        icon={<DeleteOutlined />}
                        className='rounded-[2px] bg-[#D75C5D]'
                        onClick={() => deleteItem(record)}
                    >
                    </Button>
                </div>
            ),
        },


    ]

    const filteredReceivingMaterials = receiving.filter((receiving) => receiving.material.serial.toLocaleUpperCase().includes(search.toLocaleUpperCase()))

    return (
        <>
            {contextHolder}
            <main
                className={`
                    ${isAsideVisible ? "ml-[15%]" : "ml-0"}
                    p-7 flex flex-col items-start gap-6
                `}
            >

                <h1 className="text-[32px] text-[#084D45] font-bold">Recebimento de Materiais</h1>
                <section className=' w-full flex items-center justify-between gap-4'>
                    <Input
                        className="w-[30%] mt-2 border-[#15A393]"
                        suffix={<SearchOutlined
                            style={{
                                fontSize: 16,
                                color: '#084D45',
                            }}
                        />}
                        placeholder="Pesquisar materiais (pelo serial)"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <FormCreateReceivingMaterial
                        materials={materials}
                        conditions={conditions}
                        listReceivingMaterials={listReceivingMaterials}
                        onMessage={(message: string, type: NotificationType, description: string) => openNotificationWithIcon(type, message, description)}
                    />

                </section>
                <Table
                    dataSource={filteredReceivingMaterials}
                    columns={columns}
                    rowKey={(record) => record.material.serial}
                    pagination={{ pageSize: 6 }}
                    style={{ width: "100%" }}
                />
            </main>
        </>
    )
}