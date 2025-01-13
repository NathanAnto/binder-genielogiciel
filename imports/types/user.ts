export interface User {
    id: number
    name: string
    email:string
    password: string
    is_admin: boolean    
}

export const default_user: User = {
    id: -1,
    name: '',
    email: '',
    password: '',
    is_admin: false,
}