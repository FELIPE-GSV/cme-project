"use client"

import { BASE_URL } from "@/api/api"
import { useAside } from "@/contexts/contextAside/contextAside"
import convertCategory from "@/functions/functions"
import { Material } from "@/types/models"
import { DeleteOutlined, EditOutlined, SearchOutlined } from "@ant-design/icons"
import { Button, Input } from "antd"
import Table, { ColumnsType } from "antd/es/table"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Materials() {

    const { isAsideVisible } = useAside()
    const router = useRouter()
    const [materials, setMaterials] = useState<Material[]>([])
    const [search, setSearch] = useState("")

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

    useEffect(() => {
        listMaterials()
    }, [router])

    const columns: ColumnsType<Material> = [
        {
            title: "Nome",
            dataIndex: "name",
            key: "name",
            width: "20%",
            render: (text, record) =>
                <div>
                    <strong>{record.name}</strong>
                </div>
        },
        {
            title: "Serial",
            dataIndex: "serial",
            key: "serial",
            width: "20%",
            render: (text, record) =>
                <div>
                    <strong>{record.serial.slice(-6)}</strong>
                </div>
        },
        {
            title: "Categoria",
            dataIndex: "category",
            key: "category",
            width: "20%",
            render: (text, record) =>
                <div>
                    <strong>{convertCategory(record.category)}</strong>
                </div>
        },
        {
            title: "Tipo de Material",
            dataIndex: "type",
            key: "type",
            width: "20%",
            render: (text, record) =>
                <div>
                    <strong>{record.type}</strong>
                </div>
        },
        {
            title: "Ações",
            key: "actions",
            width: "20%",
            render: (_, record) => (
                <div style={{ display: "flex", gap: 8 }}>
                    <Button
                        type="primary"
                        iconPosition='start'
                        icon={<EditOutlined />}
                        className='rounded-[2px] bg-[#004281]'
                    >
                        Editar
                    </Button>
                    <Button
                        type='primary'
                        iconPosition='start'
                        icon={<DeleteOutlined />}
                        className='rounded-[2px] bg-[#D75C5D]'
                    // onClick={() => deleteItem(record)}
                    >
                        Excluir
                    </Button>
                </div>
            ),
        },


    ]

    const filtredMaterials = materials.filter((material) => material.serial.slice(-6).toLocaleUpperCase().includes(search.toLocaleUpperCase()))

    return (
        <main
            className={`
            ${isAsideVisible ? "ml-[15%]" : "ml-0"}
            p-7 flex flex-col items-start gap-6
        `}
        >
            <h1 className="text-[32px] text-[#084D45] font-bold">Materiais</h1>
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
                <Button
                    iconPosition='start'
                    type='primary'
                    className='bg-[#084D45] text-white h-[39px] text-[16px] font-semibold rounded-[2px]'
                    icon={<Plus color='white' />}
                >
                    Cadastrar Material
                </Button>
            </section>
            <Table
                dataSource={filtredMaterials}
                columns={columns}
                rowKey={(record) => record.serial}
                pagination={{ pageSize: 5 }}
                style={{ width: "100%" }}
            />
        </main>
    )
}