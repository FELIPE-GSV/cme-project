import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button"
import { Button as ButtonAnt } from "antd"
import { ChangeEvent, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Condition, Material, ReceivingMaterial } from "@/types/models";
import { putReceivingMaterials } from "@/services/receivingMaterialService";
import { EditOutlined } from "@ant-design/icons";
import { NotificationType } from "@/app/layout";

interface Props {
    materials: Material[]
    conditions: Condition[]
    listReceivingMaterials: () => void
    receiving: ReceivingMaterial
    onMessage: (message: string, type: NotificationType, description: string) => void
}

export default function FormEditReceivingMaterial({ materials, conditions, listReceivingMaterials, receiving, onMessage }: Props) {

    const [receivingMaterial, setReceivingMaterial] = useState({
        material: receiving.material.serial,
        entry_date: receiving.entry_date,
        need_washing: receiving.need_washing,
        need_sterilization: receiving.need_sterilization,
        quantity: receiving.quantity,
        condition: receiving.condition.identifier,
        need_discard: receiving.need_discard
    });

    const [isOpen, setIsOpen] = useState(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value, type, checked } = e.target;
        setReceivingMaterial((prevState) => ({
            ...prevState, [id]: type === 'checkbox' ? checked : value
        }));
    };

    const editReceivingMaterial = async () => {
        if (typeof window !== undefined) {
            const token = localStorage.getItem("token")
            const response = await putReceivingMaterials(token, receiving.id, receivingMaterial)

            if (response.ok) {
                onMessage("Edição realizada!", "success", "A edição foi realizada com sucesso.")
                listReceivingMaterials()
                setIsOpen(false)
            } else if(response.status === 500){
                onMessage("Erro interno!", "error", "Erro no processo da api!")
                setIsOpen(false)
            }

        }
    }


    useEffect(() => {

        console.log(conditions)

        if (receivingMaterial.condition === conditions[2]?.identifier) {
            setReceivingMaterial(prevState => ({
                ...prevState,
                need_discard: true,
                need_sterilization: false,
                need_washing: false
            }));
        } else {
            setReceivingMaterial(prevState => ({
                ...prevState,
                need_discard: false,
                need_sterilization: true,
                need_washing: true
            }));
        }
    }, [receivingMaterial.condition, conditions]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <ButtonAnt
                    type="primary"
                    iconPosition='start'
                    icon={<EditOutlined />}
                    className='rounded-[2px] bg-[#004281]'
                >
                </ButtonAnt>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-[#084D45] text-[24px]">Edição de Solicitação de recebimento</DialogTitle>
                    <DialogDescription>
                        Preencha as informações para a solicitação de uma recepção de material
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="material" className="text-right">
                        Material
                    </Label>
                    <Select value={receiving.material.serial} onValueChange={(value) => setReceivingMaterial({ ...receivingMaterial, material: value })} disabled>
                        <SelectTrigger className="col-span-3 h-[31px]">
                            <SelectValue placeholder="Selecione um material" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Materiais</SelectLabel>
                                {materials.map((material, index) =>
                                    <SelectItem key={index} value={material.serial}>{material.name} | {material.serial}</SelectItem>
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="entry_date" className="text-right">
                        Data de Entrada
                    </Label>
                    <Input
                        id="entry_date"
                        type="date"
                        className="col-span-3"
                        value={receivingMaterial.entry_date}
                        onChange={handleChange}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quantity" className="text-right">
                        Quantidade
                    </Label>
                    <Input
                        id="quantity"
                        type="number"
                        className="col-span-3"
                        value={receivingMaterial.quantity}
                        onChange={handleChange}
                    />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="condition" className="text-right">
                        Condição
                    </Label>
                    <Select value={receivingMaterial.condition} onValueChange={(value) => setReceivingMaterial({ ...receivingMaterial, condition: value })}>
                        <SelectTrigger className="col-span-3 h-[31px]">
                            <SelectValue placeholder="Selecione uma condição" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Condições</SelectLabel>
                                {conditions.map((conditon, index) =>
                                    <SelectItem key={index} value={conditon.identifier}>{conditon.name}</SelectItem>
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {receivingMaterial.condition !== "" && (
                    <>
                        {receivingMaterial.condition !== conditions[2]?.identifier && (
                            <>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="need_washing" className="text-right">
                                        Necessita Lavagem
                                    </Label>
                                    <Switch
                                        checked={receivingMaterial.need_washing}
                                        onCheckedChange={(value) => setReceivingMaterial({ ...receivingMaterial, need_washing: value })}
                                        disabled={receivingMaterial.condition === "00fafcf9-ada8-45b2-820d-130b858dbc05"}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="need_sterilization" className="text-right">
                                        Necessita Esterilização
                                    </Label>
                                    <Switch
                                        checked={receivingMaterial.need_sterilization}
                                        onCheckedChange={(value) => setReceivingMaterial({ ...receivingMaterial, need_sterilization: value })}
                                        disabled={receivingMaterial.condition === "00fafcf9-ada8-45b2-820d-130b858dbc05"}
                                    />
                                </div>
                            </>
                        )}
                        {receivingMaterial.condition === conditions[2]?.identifier && (
                            <>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="need_discard" className="text-right">
                                        Necessita Descarte
                                    </Label>
                                    <Switch
                                        checked={receivingMaterial.need_discard}
                                        onCheckedChange={(value) => setReceivingMaterial({ ...receivingMaterial, need_discard: value })}
                                        disabled={receivingMaterial.condition !== "00fafcf9-ada8-45b2-820d-130b858dbc05"}
                                    />
                                </div>
                            </>
                        )}
                    </>
                )}
                <DialogFooter>
                    <Button type="submit" className="bg-[#0d8f80]" onClick={editReceivingMaterial}>Editar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}