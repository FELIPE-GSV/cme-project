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
    id: string;
    serial: string;
    name: string;
    type: string;
    expiry_date: string;
    category: number;
    campo: string;
}
