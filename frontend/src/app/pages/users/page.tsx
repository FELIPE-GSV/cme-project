"use client"

import { useAside } from "@/contexts/contextAside/contextAside"
import Input from "antd/es/input";
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { BASE_URL } from "@/api/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, UserList } from "@/types/models";
import Table, { ColumnsType } from "antd/es/table";
import { Button, notification } from "antd";
import { NotificationType } from "@/app/layout";
import { Plus } from "lucide-react";
import { FormCreateUser } from "./formCreateUser";
import { deleteUserByID } from "@/services/userService";
import { FormEditUser } from "./formEditUser";

export default function Users() {

    const { isAsideVisible, user } = useAside()
    const router = useRouter()
    const [users, setUsers] = useState<UserList[]>([])
    const [search, setSearch] = useState("")

    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType, message: string, description: string) => {
        api[type]({
            message: message,
            description: description,
        });
    };



    const listUsers = async () => {
        if (typeof window !== undefined) {
            const token = localStorage.getItem('token')
            try {
                const response = await fetch(`${BASE_URL}/list_users/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })

                if (response.ok) {
                    const data = await response.json()
                    setUsers(data)

                }
            } catch (error) {
                console.log(error)
            }

        }
    }

    const deleteItem = async (userToDelete: UserList) => {
        console.log(user.id)
        console.log(userToDelete.id)
        if (user.id === userToDelete.id) {
            openNotificationWithIcon("warning", "Ação incorreta.", "Não é possível deletar a si mesmo!")
            return
        }

        if(typeof window !== undefined){
            const token = localStorage.getItem('token')
            const response = await deleteUserByID(token, userToDelete.id)
            if(response){
                openNotificationWithIcon("success", "Usuário deletado.", "O usuário foi deletado com sucesso!")
                listUsers()
                return
            }
        }
    }

    useEffect(() => {
        listUsers()
    }, [router])


    const columns: ColumnsType<UserList> = [
        {
            title: "Nome",
            dataIndex: "username",
            key: "name",
            width: '25%',
            render: (text, record) =>
                <div>
                    <strong>{record.username}</strong>
                </div>
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: '25%',
            render: (text, record) =>
                <div>
                    <strong>{record.email ? record.email : "Não informado"}</strong>
                </div>
        },
        {
            title: "Admin status",
            dataIndex: "is_superuser",
            key: "is_superuser",
            width: '25%',
            render: (text, record) =>
                <div>
                    <strong>{record.is_superuser ? "Sim" : "Não"}</strong>
                </div>
        },
        {
            title: "Ações",
            key: "actions",
            width: '25%', 

            render: (_, record) => (
                <div style={{ display: "flex", gap: 8 }}>
                    <FormEditUser 
                        findUsers={listUsers}
                        user={record}
                        onMessage={() =>  openNotificationWithIcon("success", "Usuário editado.", "Informações alteradas com sucesso!")}

                    />
                    <Button
                        type='primary'
                        iconPosition='start'
                        icon={<DeleteOutlined />}
                        className='rounded-[2px] bg-[#D75C5D]'
                        onClick={() => deleteItem(record)}
                    >
                        Excluir
                    </Button>
                </div>
            ),
        },


    ]

    const filteredUsers = users.filter((user) => user.username.toLocaleUpperCase().includes(search.toLocaleUpperCase()))




    return (
        <>
            {contextHolder}
            <main
                className={`
            ${isAsideVisible ? "ml-[15%]" : "ml-0"}
            p-7 flex flex-col items-start gap-6
        `}
            >
                <h1 className="text-[32px] text-[#084D45] font-bold">Usuários</h1>
                <section className=' w-full flex items-center justify-between gap-4'>

                    <Input
                        className="w-[30%] mt-2 border-[#15A393]"
                        suffix={<SearchOutlined
                            style={{
                                fontSize: 16,
                                color: '#084D45',
                            }}
                        />}
                        placeholder="Pesquisar usuários (pelo nome)"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <FormCreateUser findUsers={listUsers}/>
                </section>
                <Table
                    dataSource={filteredUsers}
                    columns={columns}
                    rowKey={(record) => record.username}
                    pagination={{ pageSize: 5 }}
                    style={{ width: "100%" }}
                />
            </main>
        </>

    )
}