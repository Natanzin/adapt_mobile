interface Response {
    token: string
    user: {
        usuario: string
        senha: string
        codEmpresa: string
    }
}

export function SignIn(): Promise<Response> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                token: 'açskdfjbvfbipasdfjvisdjviopjsadnfvpijasdbnvipujn',
                user: {
                    usuario: 'Natan',
                    senha: '123456',
                    codEmpresa: '200'
                }
            })
        }, 1000)
    })
}