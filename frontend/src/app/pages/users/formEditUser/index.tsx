import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button as ButtonAnt } from "antd"
import { useState } from "react"
import { EditOutlined } from "@ant-design/icons"
import { editUserById } from "@/services/userService"
import { UserList } from "@/types/models"

interface Props {
    findUsers: () => void
    onMessage: () => void
    user: UserList
}

export function FormEditUser({ findUsers, onMessage, user }: Props) {

    const [userObject, setUserObject] = useState({
        "username": user.username,
        "email": user.email,
        "id": user.id
    })

    const editUser = async () => {
        if(typeof window !== undefined){
            const token = localStorage.getItem('token')
            const response = await editUserById(token, userObject)
            if(response){
                onMessage()
                findUsers()
            }
        }
    }




    return (
        <Dialog>
            <DialogTrigger asChild>
                <ButtonAnt
                    type="primary"
                    iconPosition='start'
                    icon={<EditOutlined />}
                    className='rounded-[2px] bg-[#004281]'
                >
                    Editar
                </ButtonAnt>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-[#084D45] text-[24px]">Edição de usuário</DialogTitle>
                    <DialogDescription>
                        Preencha as informações para registro de um usuário
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4  py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            id="username"
                            className="col-span-3"
                            value={userObject.username}
                            onChange={(e) => setUserObject({ ...userObject, username: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="email"
                            className="col-span-3"
                            value={userObject.email}
                            onChange={(e) => setUserObject({ ...userObject, email: e.target.value })}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" className="bg-[#0d8f80]" onClick={editUser}>Editar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
