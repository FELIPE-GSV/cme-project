import { BASE_URL } from "@/api/api";

export async function createMaterialInBd(token: string | null, material: {
    name: string;
    type: string;
    expiry_date: string;
    category: number;
    campo: string;
    serial: string;
}) {
    try {

        const name = material.name
        const campo = material.campo
        const category = material.category
        const expiry_date = material.expiry_date
        const serial = material.serial
        const type = material.type


        const response = await fetch(`${BASE_URL}/materials/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, campo, category, expiry_date, serial, type }),

        })

        if (response.ok) {
            const data = await response.json()
            return data
        }
    } catch (error) {
        return(error)
    }
}


export async function editMaterialInBd(token: string | null, material: {
    name: string;
    type: string;
    expiry_date: string;
    category: number;
    campo: string;
    serial: string;
}) {

    const name = material.name
    const campo = material.campo
    const category = material.category
    const expiry_date = material.expiry_date
    const serial = material.serial
    const type = material.type

    try {
        const response = await fetch(`${BASE_URL}/materials/${serial}/edit/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, campo, category, expiry_date, type }),
        })
        if (response.ok) {
            const data = await response.json()
            return data
        }

    } catch (error) {
        console.error(error)
    }
}


export async function deleteMaterialInBd(token: string | null, id: number | undefined) {
    try {
        const response = await fetch(`${BASE_URL}/materials/${id}/delete/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })

        if(response.ok){
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.error(error)
    }
}

