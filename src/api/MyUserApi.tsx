import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useGetMyUser = () => {
    const { getAccessTokenSilently } = useAuth0(); // obtendo uma função de Auth0 que vai buscar o token do usuário

    const getMyUserRequest = async (): Promise<User> => { // falamos que essa função de get ira retornar uma promessa do tipo User que criamos no arquivo /src/types.ts
        const accessToken = await getAccessTokenSilently(); // aqui acionamos a função de buscar pelo token
        
        const response = await fetch(`${API_BASE_URL}/api/my/user`, { // fazendo uma requisição de GET para o backend
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`, // passamos pro header o token de autorização
                'Content-Type': 'application/json'
            },
        });

        if(!response.ok) { // se a resposta não for ok lançamos um error
            throw new Error("Failed to fetch user")
        }

        return response.json(); // se der certo retornamos a response transformada em json
    };

    const { data: currentUser, isLoading, error } = useQuery("fetchCurrentUser", getMyUserRequest) // useQuery e um hook ele aceita uma chave de consulta nesse caso passamos ("fetchCurrentUser") que e uma função que retorna os dados da consulta, nossa função passado como segundo parâmetro nos retorna um objeto que tem os dados da consulta (data: currentUser) indicamos que currentUser vai conter o (data), (currentUser) que retornamos do back-end, tambem um indicador de carregamento (isLoading), e por ultimo o error caso venha um erro dessa query, usamos o useQuery porque normalmente armazena em cache os resultados das consultas, o que significa que se uma consulta idêntica for feita novamente, ela pode retornar imediatamente os dados em cache, evitando uma nova chamada à API. Isso é útil para melhorar o desempenho e reduzir a carga no servidor.

    if(error) { // se der algum error retornamos um toast notification de volta
        toast.error(error.toString())
    }

    return { currentUser, isLoading } // aqui retornamos esses dados o usuario finalmente para ser usado no front end
}

type CreateUserRequest = { // criamos um tipo para a nossa request
    auth0Id: string;
    email: string;
}


export const useCreateMyUser = () => { // função de criar user, para fazer a requisição para API 

    const { getAccessTokenSilently } = useAuth0(); // obtendo uma função de Auth0 que vai buscar o token do usuário

    const createUser = useMutation(async (user: CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently(); // aqui acionamos a função de buscar pelo token
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {// response armazena a resposta dessa requisição || tecnicamente faz chamada pro backend
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`, // passando o token para Authorization que vai ser inserido no header
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        });

        if(!response.ok) { // status da resposta foi ok? se não lançamos um erro
            throw new Error("Failed to create user")
        }
    })

    return createUser
}

type UpdateMyUserRequest = { // criamos um tipo para a nossa request de update
    name: string;
    addressLine1: string;
    city: string;
    country: string;
}

export const useUpdateMyUser = () => { // função de atualizar user, para fazer a requisição para API
    const { getAccessTokenSilently } = useAuth0(); // obtendo uma função de Auth0 que vai buscar o token do usuário
    
    const updateMyUserRequest = async (formData: UpdateMyUserRequest) => { // dizemos que o formData tem que ser do tipo UpdateMyUserRequest
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        if (!response) {
            throw new Error("Failed to update user")
        }
        return response.json()
    };

    const { mutateAsync: updateUser, isLoading, isSuccess, error, reset } = useMutation(updateMyUserRequest) // mutateAsync: updateUser atribuimos a propiedade mutateAsync ao nome updateUser, updateUser é uma função que você pode chamar para iniciar a atualização do usuário, updateUser encapsula a lógica de fazer a solicitação para a API de atualização do usuário usando os detalhes fornecidos em useMutation(updateMyUserRequest).

    if (isSuccess) {
        toast.success("User profile updated!") // se deu sucesso vamos exibir uma mensagem de sucesso com toast na tela
    }
    if (error) {
        toast.error(error.toString()) // se deu sucesso vamos exibir uma mensagem de sucesso com toast na tela
        reset(); // reset conseguimos limpar os erros 
    }
    return { updateUser, isLoading }   
}