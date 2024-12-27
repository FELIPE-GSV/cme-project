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
import { editMaterialInBd } from "@/services/materialService";
import { Category, Material } from "@/types/models";
import { EditOutlined } from "@ant-design/icons";
import { Button as ButtonAnt } from "antd"
import Input from "antd/es/input/Input"
import { ChangeEvent, useState } from "react"

interface Props {
    categories: Category[]
    listMaterials: () => void
    onMessage: () => void
    materialToEdit: Material
}

export function FormEditMaterial({ categories, listMaterials, onMessage, materialToEdit }: Props) {

    const [material, setMaterial] = useState({
        name: materialToEdit.name,
        type: materialToEdit.type,
        expiry_date: materialToEdit.expiry_date,
        category: materialToEdit.category.id,
        campo: materialToEdit.campo,
        serial: materialToEdit.serial
    });
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement> & HTMLSelectElement) => {
        const { id, value } = e.target;
        setMaterial(prevMaterial => ({
            ...prevMaterial,
            [id]: value
        }));
    };
    

    const editMaterial = async () => {
        if (typeof window !== undefined) {
            const token = localStorage.getItem(`token`)
            const response = await editMaterialInBd(token, material)
            if(response) {
                listMaterials()
                onMessage()
                setIsOpen(false)
            }
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
                    <DialogTitle className="text-[#084D45] text-[24px]">Edição de Materiais</DialogTitle>
                    <DialogDescription>
                        Preencha as informações para edição de um material
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
                    <Select value={material.category.toString()} onValueChange={(value) => setMaterial({ ...material, category: parseInt(value) })}>
                        <SelectTrigger className="col-span-3 h-[31px]">
                            <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel >Categorias</SelectLabel>
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

                <DialogFooter>
                    <Button type="submit" className="bg-[#0d8f80]" onClick={editMaterial}>Editar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}