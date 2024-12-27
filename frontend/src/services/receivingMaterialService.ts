import { BASE_URL } from "@/api/api"

export async function getReceivingMaterialsById(token: string | null, serial: string) {
    try {
        const response = await fetch(`${BASE_URL}/receiving_materials/list/${serial}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })

        if (response.ok) {
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function getReceivingMaterials(token: string | null) {
    try {
        const response = await fetch(`${BASE_URL}/receiving_materials/list/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })

        if (response.ok) {
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function postReceivingMaterials(token: string | null, data: {
    material: string;
    entry_date: string;
    need_washing: boolean;
    need_sterilization: boolean;
    quantity: number;
    condition: string;
    need_discard: boolean;
}) {

    const material = data.material
    const entry_date = data.entry_date
    const need_washing = data.need_washing
    const need_sterilization = data.need_sterilization
    const quantity = data.quantity
    const condition = data.condition
    const need_discard = data.need_discard

    try {
        const response = await fetch(`${BASE_URL}/receiving_materials/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                material,
                entry_date,
                need_washing,
                need_sterilization,
                quantity,
                condition,
                need_discard
            }),
        })

        if (response.ok) {
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.log(error)
        return error
    }

}

export async function putReceivingMaterials(token: string | null, id: number | undefined, data: {
    material: string;
    entry_date: string;
    need_washing: boolean;
    need_sterilization: boolean;
    quantity: number;
    condition: string;
    need_discard: boolean;
}) {
    const material = data.material
    const entry_date = data.entry_date
    const need_washing = data.need_washing
    const need_sterilization = data.need_sterilization
    const quantity = data.quantity
    const condition = data.condition
    const need_discard = data.need_discard

    try {
        const response = await fetch(`${BASE_URL}/receiving_materials/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                material,
                entry_date,
                need_washing,
                need_sterilization,
                quantity,
                condition,
                need_discard
            }),
        })

        if (response.ok) {
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.log(error)
        return error
    }
}


export async function deleteReceivingMaterial(token: string | null, id: number | undefined) {
    try {
        const response = await fetch(`${BASE_URL}/receiving_materials/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })

        if (response.ok) {
            const data = await response.json()
            return data
        }

    } catch (error) {
        console.log(error)
        return error
    }
}