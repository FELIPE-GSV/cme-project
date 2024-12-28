import { BASE_URL } from "@/api/api"

export async function createUserInBd(token: string | null, data: { username: string, email: string, password: string, is_admin: boolean }) {
    try {
        const username = data.username
        const email = data.email
        const password = data.password
        const is_admin = data.is_admin
        const response = await fetch(`${BASE_URL}/create_superuser/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ username, email, password, is_admin }),
        })

        return response

        if (response.ok) {
            const dataResponse = await response.json()
            return await dataResponse
        } else {
            return response.status
        }

    } catch (error) {
        return error
    }
}

export async function deleteUserByID(token: string | null, id: number | undefined) {
    try {
        const response = await fetch(`${BASE_URL}/deleteUser/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        if(response.ok){
            return response.status
        }        
    } catch (error) {
        return error
    }
    
}

export async function editUserById(token: string | null, data: {id: number | undefined , username: string , email: string | undefined}) {

    try {
        const username = data.username
        const email = data.email

        const response = await fetch(`${BASE_URL}/editUser/${data.id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ username, email }),
        })

        return response

        if(response.ok){
            const data = await response.json()
            return data
        }

    } catch (error) {
       return error 
    }
    
}