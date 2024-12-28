"use client"
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
import { Plus } from "lucide-react"
import { Button as ButtonAnt } from "antd"
import { useState } from "react"
import { createUserInBd } from "@/services/userService"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NotificationType } from "@/app/layout"

interface Props {
    findUsers: () => void
    onMessage: (message: string, type: NotificationType, description: string) => void
}

export function FormCreateUser({ findUsers, onMessage }: Props) {


    const [userObject, setUserObject] = useState({
        "username": "",
        "password": "",
        "is_admin": false,
        "email": ""
    })

    const [isOpen, setIsOpen] = useState(false);

    const createUser = async () => {
        if(
            userObject.password === "" ||
            userObject.username === "" 
        ){
            onMessage("Dados inválidos", "warning", "Nome de usuário e senha são obrigatórios.")
            return
        }

        if (typeof window !== undefined) {
            const token = localStorage.getItem('token')

            console.log(userObject)
            const response = await createUserInBd(token, userObject)
            if(response.status === 400){
                const data = await response.json()
                if(data.username){
                    onMessage("Nome inválido", "warning", "Nome de usuário fornecido já é existente.")
                    return
                }
            } else if (response.status === 500) {
                onMessage("Erro interno!", "error", "Erro no processo da api!")
                setIsOpen(false)
            } else if(response.ok) {
                findUsers()
                onMessage("Usuário registrado", "success", "O usuário foi cadastrado com sucesso.")
                setIsOpen(false);
            }
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <ButtonAnt
                    iconPosition='start'
                    type='primary'
                    className='bg-[#084D45] text-white h-[39px] text-[16px] font-semibold rounded-[2px]'
                    icon={<Plus color='white' />}
                >
                    Cadastrar Usuário
                </ButtonAnt>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-[#084D45] text-[24px]">Cadastro de usuários</DialogTitle>
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
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            Password
                        </Label>
                        <Input
                            id="password"
                            className="col-span-3"
                            value={userObject.password}
                            onChange={(e) => setUserObject({ ...userObject, password: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="is_admin" className="text-right">
                            Perfil
                        </Label>
                        <Select
                            onValueChange={(value) =>
                                setUserObject({ ...userObject, is_admin: value === "admin" ? true : false })
                            }
                        >
                            <SelectTrigger className="col-span-3 h-[31px]">
                                <SelectValue placeholder="Selecione um perfil" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Condições</SelectLabel>
                                    <SelectItem value="admin">Administrador</SelectItem>
                                    <SelectItem value="enfermeiro">Enfermeiro</SelectItem>
                                    <SelectItem value="tecnico">Técnico</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>



                    {/* <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            Administrador
                        </Label>
                        <Switch
                            onCheckedChange={(e) => setUserObject({...userObject, is_admin: e})}
                            color="green"
                        />
                    </div> */}
                </div>
                <DialogFooter>
                    <Button type="submit" className="bg-[#0d8f80]" onClick={createUser}>Cadastrar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
