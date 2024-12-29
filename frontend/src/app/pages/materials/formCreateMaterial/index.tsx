import { NotificationType } from "@/app/layout";
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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createMaterialInBd } from "@/services/materialService";
import { Category } from "@/types/models";
import { Button as ButtonAnt } from "antd"
import Input from "antd/es/input/Input"
import { Plus } from "lucide-react"
import { ChangeEvent, useState } from "react"

interface Props {
    categories: Category[]
    listMaterials: () => void
    onMessage: (type: NotificationType, message: string, description: string) => void
}

export function FormCreateMaterial({ categories, listMaterials, onMessage }: Props) {

    const [material, setMaterial] = useState({
        name: '',
        type: '',
        expiry_date: '',
        category: 1,
        campo: '',
        serial: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement> & HTMLSelectElement) => {
        const { id, value } = e.target;
        setMaterial(prevMaterial => ({
            ...prevMaterial,
            [id]: value
        }));
    };

    const [isOpen, setIsOpen] = useState(false);

    const createMaterial = async () => {

        if(
            material.name === "" ||
            material.type === "" ||
            material.expiry_date === "" ||
            material.campo === "" ||
            material.serial === "" 
        ){
            onMessage("warning", "Informações inválidas.", "Certifique-se que preencheu !")
            return
        }

        if(typeof window !== undefined){
            const token = localStorage.getItem(`token`)
            const response = await createMaterialInBd(token, material)
            if(response.ok){
                listMaterials()
                onMessage("success", "Material cadastrado.", "Informações registradas com sucesso!")
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
                    Cadastrar Material
                </ButtonAnt>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-[#084D45] text-[24px]">Cadastro de Materiais</DialogTitle>
                    <DialogDescription>
                        Preencha as informações para registro de um material
                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Nome
                    </Label>
                    <Input
                        id="name"
                        className="col-span-3"
                        value={material.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                        Tipo
                    </Label>
                    <Input
                        id="type"
                        className="col-span-3"
                        value={material.type}
                        onChange={handleChange}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="expiry_date" className="text-right">
                        Data de Validade
                    </Label>
                    <Input
                        id="expiry_date"
                        type="date"
                        className="col-span-3"
                        value={material.expiry_date}
                        onChange={handleChange}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                        Categoria
                    </Label>
                    <Select onValueChange={(value) => setMaterial({ ...material, category: parseInt(value) })}>
                        <SelectTrigger className="col-span-3 h-[31px]">
                            <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Categorias</SelectLabel>
                                {categories.map((category, index) =>
                                    <SelectItem key={index} value={category.id.toString()}>{category.name}</SelectItem>
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="campo" className="text-right">
                        Campo
                    </Label>
                    <Input
                        id="campo"
                        className="col-span-3"
                        value={material.campo}
                        onChange={handleChange}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="serial" className="text-right">
                        Serial
                    </Label>
                    <Input
                        id="serial"
                        className="col-span-3"
                        value={material.serial}
                        onChange={handleChange}
                    />
                </div>

                <DialogFooter>
                    <Button type="submit" className="bg-[#0d8f80]" onClick={createMaterial}>Cadastrar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}