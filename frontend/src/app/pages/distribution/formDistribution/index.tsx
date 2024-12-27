import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { putTratament } from "@/services/tratamentsService"
import { Tratament } from "@/types/models"
import { DiffOutlined } from "@ant-design/icons"
import { Button as ButtonAnt } from "antd"

interface Props {
    listTrataments: () => void
    onMessage: () => void
    tratament: Tratament
}

export default function FormDistribution({ listTrataments, onMessage, tratament }: Props) {

    const updateTratament = async () => {
        if (typeof window !== undefined) {
            const token = localStorage.getItem('token')

            const data = {
                material: tratament.material.serial,
                washing: tratament.washing,
                sterilization: tratament.sterilization,
                distribution: true,
                finish_at: tratament.finish_at
            }

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
                    icon={<DiffOutlined />}
                    className={`rounded-[2px] bg-[#004281]`}
                    disabled={tratament.distribution}
                >
                    Distribuir
                </ButtonAnt>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-[#084D45] text-[24px]">Distribuição de material</DialogTitle>
                </DialogHeader>
                <Label className="text-[20px]">Digite o setor para distribuição.</Label>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="finish_at" className="text-right">
                        Setor
                    </Label>
                    <Input
                        id="finish_at"
                        type="text"
                        className="col-span-3"
                    />
                </div>
                <DialogFooter>
                    <Button type="submit" className="bg-[#0d8f80]" onClick={updateTratament}>Distribuir</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}