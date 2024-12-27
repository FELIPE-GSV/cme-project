"use client"

// import { NotificationType } from "@/app/layout";
import { useAside } from "@/contexts/contextAside/contextAside";
import { getTrataments } from "@/services/tratamentsService";
import { ReceivingMaterial, Tratament } from "@/types/models";
import {  SearchOutlined } from "@ant-design/icons";
import { Input, notification } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormCreateTratament from "./formCreateTratament";
import { getReceivingMaterials } from "@/services/receivingMaterialService";
import { NotificationType } from "@/app/layout";
import FormCompleteTratament from "./FormCompleteTratament";

export default function Trataments() {
    const router = useRouter()
    const { isAsideVisible } = useAside()
    const [trataments, setTrataments] = useState<Tratament[]>([])
    const [receiving, setReceiving] = useState<ReceivingMaterial[]>([])

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType, message: string, description: string) => {
        api[type]({
            message: message,
            description: description,
        });
    };
    const [search, setSearch] = useState("")

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

    const listReceivingMaterials = async () => {
        if (typeof window !== undefined) {
            const token = localStorage.getItem('token')
            const response = await getReceivingMaterials(token)

            if (response) {
                setReceiving(response)
            }
        }
    }

    useEffect(() => {
        listTrataments()
        listReceivingMaterials()
    }, [router])



    const columns: ColumnsType<Tratament> = [
        {
            title: "Serial",
            dataIndex: "identifier",
            key: "identifier",
            render: (_, record) =>
                <strong>{record.material.serial}</strong>

        },
        {
            title: "Termina em",
            dataIndex: "finish_at",
            key: "finish_at",
            render: (_, record) =>
                <strong>{record.finish_at}</strong>
        },
        {
            title: "Lavagem",
            dataIndex: "washing",
            key: "washing",
            render: (_, record) =>
                <div>
                    {record.washing ?
                        <label className="p-1 bg-red-300 rounded-sm border-[2px] border-red-500 font-bold text-red-600">
                            NECESSITA
                        </label>
                        :
                        <label className="p-1 bg-green-300 rounded-sm border-[2px] border-green-500 font-bold text-green-600">
                            OK
                        </label>
                    }
                </div>

        },
        {
            title: "Esterilização",
            dataIndex: "sterilization",
            key: "sterilization",
            render: (_, record) =>
                <div>
                    {
                        record.sterilization ? <label className="p-1 bg-red-300 rounded-sm border-[2px] border-red-500 font-bold text-red-600">
                            NECESSITA
                        </label> : <label className="p-1 bg-green-300 rounded-sm border-[2px] border-green-500 font-bold text-green-600">
                            OK
                        </label>
                    }
                </div>

        },
        // {
        //     title: "Distribuição",
        //     dataIndex: "distribution",
        //     key: "distribution",
        //     render: (_, record) =>
        //         <div>
        //             {
        //                 !record.distribution ? <label className="p-1 bg-yellow-300 rounded-sm border-[2px] border-yellow-500 font-bold text-yellow-600">
        //                     Pentente
        //                 </label> : <label className="p-1 bg-green-300 rounded-sm border-[2px] border-green-500 font-bold text-green-600">
        //                     PRONTO
        //                 </label>
        //             }
        //         </div>

        // },
        {
            title: "Ações",
            key: "actions",
            render: (_, record) => (
                <div style={{ display: "flex", gap: 8 }}>
                    <FormCompleteTratament
                        tratament={record}
                        listTrataments={listTrataments}
                        onMessage={() => openNotificationWithIcon("success", "Tratamento concluído.", "Novos materiais podem ser distribuidos!")}
                    />
                    {/* <Button
                        type='primary'
                        iconPosition='start'
                        icon={<DeleteOutlined />}
                        className='rounded-[2px] bg-[#D75C5D]'
                        onClick={() => deleteItem(record)}
                    >
                    </Button> */}
                </div>
            ),
        },
    ]

    const filteredTrataments = trataments.filter((item)=> item.material.serial.toLocaleLowerCase().includes(search.toLocaleLowerCase()))

    return (
        <>
            {contextHolder}
            <main
                className={`
                    ${isAsideVisible ? "ml-[15%]" : "ml-0"}
                    p-7 flex flex-col items-start gap-6
                `}
            >
                <h1 className="text-[32px] text-[#084D45] font-bold">Tratamentos</h1>
                <section className=' w-full flex items-center justify-between gap-4'>
                    <Input
                        className="w-[30%] mt-2 border-[#15A393]"
                        suffix={<SearchOutlined
                            style={{
                                fontSize: 16,
                                color: '#084D45',
                            }}
                        />}
                        placeholder="Pesquisar tratamentos (pelo serial do material)"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <FormCreateTratament
                        receivings={receiving}
                        listTrataments={listTrataments}
                        onMessage={() => openNotificationWithIcon("success", "Tratamento criado.", "Informações salvas com sucesso!")}
                    />

                </section>

                <Table
                    dataSource={filteredTrataments}
                    columns={columns}
                    rowKey={(record) => record.material.serial}
                    pagination={{ pageSize: 6 }}
                    style={{ width: "100%" }}
                />
            </main>
        </>
    )
}