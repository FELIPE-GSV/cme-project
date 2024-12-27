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
import { Switch } from "@/components/ui/switch"
import { useRef, useState } from "react"
import { createUserInBd } from "@/services/userService"

interface Props {
    findUsers: () => void
    onMessage: () => void
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
        if(typeof window !== undefined){
            const token = localStorage.getItem('token')
            const response = await createUserInBd(token, userObject)
            if(response){
                findUsers()
                onMessage()
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
                            onChange={(e)=> setUserObject({...userObject, password: e.target.value})}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            Administrador
                        </Label>
                        <Switch
                            onCheckedChange={(e) => setUserObject({...userObject, is_admin: e})}
                            color="green"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" className="bg-[#0d8f80]" onClick={createUser}>Cadastrar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
