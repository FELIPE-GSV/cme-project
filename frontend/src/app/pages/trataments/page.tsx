"use client"

// import { NotificationType } from "@/app/layout";
import { useAside } from "@/contexts/contextAside/contextAside";
import { Tratament } from "@/types/models";
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function Trataments() {

    const { isAsideVisible } = useAside()
    // const [api, contextHolder] = notification.useNotification();
    const [trataments] = useState<Tratament[]>([])
    // const openNotificationWithIcon = (type: NotificationType, message: string, description: string) => {
    //     api[type]({
    //         message: message,
    //         description: description,
    //     });
    // };
    const [search, setSearch] = useState("")


    const columns: ColumnsType<Tratament> = [
        {
            title: "Serial",
            dataIndex: "material",
            key: "serial",
            render: (_, record) =>
                <strong>{record.material.serial}</strong>

        },
        {
            title: "Lavagem",
            dataIndex: "washing",
            key: "washing",
            render: (_, record) =>
                <strong>{record.washing ? "sim": "não"}</strong>

        },
        {
            title: "Esterilização",
            dataIndex: "sterilization",
            key: "sterilization",
            render: (_, record) =>
                <strong>{record.sterilization ? "sim": "não"}</strong>

        },
        {
            title: "Distribuição",
            dataIndex: "distribution",
            key: "distribution",
            render: (_, record) =>
                <strong>{record.distribution ? "sim": "não"}</strong>

        },

        {
            title: "Ações",
            key: "actions",
            render: () => (
                <div style={{ display: "flex", gap: 8 }}>
                    <Button
                        type="primary"
                        iconPosition='start'
                        icon={<EditOutlined />}
                        className='rounded-[2px] bg-[#004281]'
                    >
                    </Button>
                    <Button
                        type='primary'
                        iconPosition='start'
                        icon={<DeleteOutlined />}
                        className='rounded-[2px] bg-[#D75C5D]'
                    // onClick={() => deleteItem(record)}
                    >
                    </Button>
                </div>
            ),
        },


    ]

    return (
        // <>
        //     {contextHolder}
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

                    <Button
                        iconPosition='start'
                        type='primary'
                        className='bg-[#084D45] text-white h-[39px] text-[16px] font-semibold rounded-[2px]'
                        icon={<Plus color='white' />}
                    >
                        Iniciar novo tratamento
                    </Button>

                </section>

                <Table
                    dataSource={trataments}
                    columns={columns}
                    rowKey={(record) => record.material.serial}
                    pagination={{ pageSize: 6 }}
                    style={{ width: "100%" }}
                />
            </main>
        // </>
    )
}