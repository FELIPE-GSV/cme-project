import { BASE_URL } from "@/api/api"

export async function deleteTratament(token:string | null, id: number | undefined) {
    try {
        const response = await fetch(`${BASE_URL}/trataments/${id}/delete/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        if(response.ok){
            return true
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function putTratament(id: number | undefined,token:string | null, data: {
    material: string;
    washing: boolean;
    sterilization: boolean;
    distribution: boolean;
    finish_at: string;
}) {
    const material = data.material
    const washing = data.washing
    const sterilization = data.sterilization
    const distribution = data.distribution
    const finish_at = data.finish_at
    try {
        const response = await fetch(`${BASE_URL}/trataments/${id}/update/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                material,
                washing,
                sterilization,
                distribution,
                finish_at,
            }),
        })
        if (response.ok) {
            const data = response.json()
            console.log(data)
            return data
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function postTratament(token: string | null, data: {
    material: string;
    washing: boolean;
    sterilization: boolean;
    distribution: boolean;
    finish_at: string;
}) {

    const material = data.material
    const washing = data.washing
    const sterilization = data.sterilization
    const distribution = data.distribution
    const finish_at = data.finish_at
    try {
        const response = await fetch(`${BASE_URL}/trataments/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                material,
                washing,
                sterilization,
                distribution,
                finish_at,
            }),
        })

        return response
        if (response.ok) {
            const data = response.json()
            return data
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function getTrataments(token: string | null) {
    try {
        const response = await fetch(`${BASE_URL}/trataments/list/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        if (response.ok) {
            const data = response.json()
            return data
        }
    } catch (error) {
        console.log(error)
        return error
    }
}