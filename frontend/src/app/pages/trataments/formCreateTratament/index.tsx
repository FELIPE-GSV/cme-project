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
import { Plus } from "lucide-react"
import { Button as ButtonAnt } from "antd"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ChangeEvent, useState } from "react"
import { ReceivingMaterial } from "@/types/models"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getReceivingMaterialsById } from "@/services/receivingMaterialService"
import { postTratament } from "@/services/tratamentsService"


interface Props {
    receivings: ReceivingMaterial[]
    onMessage: () => void
    listTrataments: () => void
}

export default function FormCreateTratament({ receivings, listTrataments, onMessage }: Props) {

    const [data, setData] = useState({
        material: "",
        washing: false,
        sterilization: false,
        distribution: false,
        finish_at: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = e.target;
        setData((prevState) => ({
            ...prevState, [id]: type === 'checkbox' ? checked : value
        }));
    };

    const [isOpen, setIsOpen] = useState(false)

    const createTratament = async () => {
        if (typeof window !== undefined) {
            const token = localStorage.getItem('token')
            const response = await getReceivingMaterialsById(token, data.material)
            if (response) {

                const dataToRequest = {
                    material: data.material,
                    sterilization: response.need_sterilization,
                    distribution: false,
                    finish_at: data.finish_at,
                    washing: response.need_washing
                }

                console.log(dataToRequest)
                await postTratament(token, dataToRequest)
                listTrataments()
                onMessage()
                setIsOpen(false)

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
                    Iniciar novo tratamento
                </ButtonAnt>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-[#084D45] text-[24px]">Inicialização de tratamento</DialogTitle>
                    <DialogDescription>
                        Preencha as informações para registro de um tratamento
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="material" className="text-right">
                        Material
                    </Label>
                    <Select value={data.material} onValueChange={(value) => setData({ ...data, material: value })}>
                        <SelectTrigger className="col-span-3 h-[31px]">
                            <SelectValue placeholder="Selecione um material" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Materiais</SelectLabel>
                                {receivings.filter((item) => item.need_discard === false).map((receiving, index) =>
                                    <SelectItem
                                        key={index}
                                        value={receiving.material.serial}
                                        onClick={() => console.log(receiving)}
                                    >
                                        {receiving.material.name} | {receiving.material.serial}
                                    </SelectItem>
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="finish_at" className="text-right">
                        Finaliza em
                    </Label>
                    <Input
                        id="finish_at"
                        type="date"
                        className="col-span-3"
                        value={data.finish_at}
                        onChange={handleChange}
                    />
                </div>
                <DialogFooter>
                    <Button type="submit" className="bg-[#0d8f80]" onClick={createTratament}>Iniciar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}