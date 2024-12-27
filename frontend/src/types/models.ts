export interface User{
    username: string,
    email?: string,
    id?: number
    is_admin: boolean
}

export interface UserList{
    username: string,
    email?: string,
    id?: number
    is_staff: boolean,
    is_superuser: boolean
}

export interface Material {
    id?: number;
    serial: string;
    name: string;
    type: string;
    expiry_date: string;
    category: Category;
    campo: string;
}

export interface Category {
    id: number,
    name: string,
    identifier: string
}

export interface Condition {
    name: string;
    identifier: string;
}

export interface ReceivingMaterial {
    id?: number;
    material: Material;
    entry_date: string;
    need_washing: boolean;
    need_sterilization: boolean;
    quantity: number;
    condition: Condition;
    need_discard: boolean;
    identifier: string;
}

export interface Tratament {
  id?: number;
  material: Material;
  washing: boolean;
  sterilization: boolean;
  distribution: boolean;
  identifier: string;
  finish_at: string;
}


