import { BASE_URL } from "@/api/api"

export async function getConditions(token: string | null) {
    try {
        const response = await fetch(`${BASE_URL}/conditions/list/`, {
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