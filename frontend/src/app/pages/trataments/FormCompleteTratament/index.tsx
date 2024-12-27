import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { putTratament } from "@/services/tratamentsService"
import { Tratament } from "@/types/models"
import { CheckCircleOutlined } from "@ant-design/icons"
import { Button as ButtonAnt } from "antd"
import { CircleEllipsis } from "lucide-react"
import { useState } from "react"

interface Props {
    tratament: Tratament,
    listTrataments: () => void
    onMessage: () => void
}

export default function FormCompleteTratament({ listTrataments, onMessage, tratament }: Props) {

    const [data] = useState({
        material: tratament.material.serial,
        washing: false,
        sterilization: false,
        distribution: false,
        finish_at: tratament.finish_at
    });

    const updateTratament = async () => {
        if (typeof window !== undefined) {
            const token = localStorage.getItem('token')
            const response = await putTratament(tratament.id, token, data)
            if (response) {
                listTrataments()
                onMessage()
            }
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <ButtonAnt
                    type="primary"
                    iconPosition='start'
                    disabled={!tratament.washing && !tratament.sterilization}
                    icon={!tratament.washing && !tratament.sterilization ? <CheckCircleOutlined /> : <CircleEllipsis size={18} />}
                    className={`rounded-[2px] ${!tratament.washing && !tratament.sterilization ? "bg-[#1daa10]" : "bg-[#004281]"}`}
                >
                </ButtonAnt>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-[#084D45] text-[24px]">Conclusão de tratamento</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col justify-evenly items-start gap-3">
                    <h1 className="text-[20px]">As operações que serão concluídas são:</h1>
                    <ul>
                        {tratament.washing && (<Label> - Lavagem</Label>)}
                        {tratament.sterilization && (<Label> - Esterilização</Label>)}
                    </ul>
                    <h1 className="text-[16px]">Deseja concluir?</h1>
                </div>
                <DialogFooter>
                    <Button type="submit" className="bg-[#0d8f80]" onClick={updateTratament}>Concluir</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}