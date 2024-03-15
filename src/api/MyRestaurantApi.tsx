import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react"
import { uptime } from "process";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";



const API_BASE_URL = import.meta.env.VITE_API_BASE_URL


export const useGetMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0(); // obtendo uma função de Auth0 que vai buscar o token do usuário

    const getMyRestaurantRequest = async () => {
        const accessToken = await getAccessTokenSilently() // ultilizamos a função para pegar o token no header para a gente

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`, // passamos pro header o token de autorização
                'Content-Type': 'application/json'
            },
        })

        if (!response.ok) { // se a resposta não for ok lançamos um error
            throw new Error("Failed to get restaurant")
        }

        return response.json() // se der certo retornamos a resposta como json que veio do backend
    };

    const { data: restaurant, isLoading } = useQuery("fetchMyRestaurant", getMyRestaurantRequest) 
    
    return { restaurant, isLoading } // retornamos essas propiedades dessa função

    /*
    basicamente renomeamos o data: para restaurant, porque faz mas sentido para aplicação

    useQuery e um hook ele aceita uma chave de consulta nesse caso
    passamos ("fetchMyRestaurant") que e uma função que retorna os
    dados da consulta, nossa função passado como segundo parâmetro
    nos retorna um objeto que tem os dados da consulta (data: restaurant)
    indicamos que restaurant vai conter o (data), (restaurant) que retornamos
    do back-end, tambem um indicador de carregamento (isLoading), 
    e por ultimo o error caso venha um erro dessa query, usamos o
    useQuery porque normalmente armazena em cache os resultados das
    consultas, o que significa que se uma consulta idêntica for feita
    novamente, ela pode retornar imediatamente os dados em cache,
    evitando uma nova chamada à API. Isso é útil para melhorar o
    desempenho e reduzir a carga no servidor. , tambem um indicador de
    carregamento (isLoading), e por ultimo o error caso venha um erro
    dessa query, usamos o useQuery porque normalmente armazena em cache
    os resultados das consultas, o que significa que se uma consulta
    idêntica for feita novamente, ela pode retornar imediatamente os
    dados em cache, evitando uma nova chamada à API. Isso é útil para
    melhorar o desempenho e reduzir a carga no servidor.
    */
}

// função que faz a requisição pro backend salvar os dados no banco
export const useCreateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0(); // obtendo uma função de Auth0 que vai buscar o token do usuário

    const createMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => { // essa função retorna uma promessa do tipo RestaurantType
        const accessToken = await getAccessTokenSilently(); // ultilizamos a função para pegar o token no header para a gente

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, { // fazendo uma requisição de POST para o backend
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`, // passamos pro header o token de autorização
            }, // não informamos o content-type: application/json porque estamos enviando no body um tipo FormData
            body: restaurantFormData,
        })

        if(!response.ok) { // se a resposta não for ok lançamos um error
            throw new Error("Failed to create restaurant")
        }

        return response.json(); // se der certo retornamos a resposta como json que veio do backend
    };

    const {
    mutate: createRestaurant, // mutate:createRestaurant atribuimos a propiedade mutate ao nome createRestaurant, createRestaurant é uma função que você pode chamar para iniciar a criação do restaurante, createRestaurant encapsula a lógica de fazer a solicitação para a API de criação do restaurante usando os detalhes fornecidos em useMutation(createMyRestaurantRequest).
    isLoading, // temos acesso a essa propiedade de saber se a requisição esta em processo
    isSuccess, // essa propiedade fala se deu sucesso ou não
    error // essa propiedade fala se deu error
    } = useMutation(createMyRestaurantRequest); // desestruturamos essas propiedades do useMutation

    if(isSuccess) {
        toast.success("Restaurant created!") // passamos para o toast para ele ele exibir uma mensagem ao usuario que a criação deu certo
    }

    if (error) {
        toast.error("Unable to update restaurant");
    }

    return { createRestaurant, isLoading } // retornamos a função que ativa a nossa função de criar o restaurante, e isLoading para verificar se o processo de criação está em carregamento
};


// função que faz a requisição pro backend atualizar os dados no banco
export const useUpdateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0(); // obtendo uma função de Auth0 que vai buscar o token do usuário


    const updateRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently(); // ultilizamos a função para pegar o token no header para a gente

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, { // fazendo uma requisição de POST para o backend
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`, // passamos pro header o token de autorização
            }, // não informamos o content-type: application/json porque estamos enviando no body um tipo FormData
            body: restaurantFormData,
        })

        if(!response.ok) { // se a resposta não for ok lançamos um error
            throw new Error("Failed to update restaurant")
        }

        return response.json(); // se der certo retornamos a resposta como json que veio do backend
    };

    const {
        mutate: updateRestaurant, // mutate:updateRestaurant atribuimos a propiedade mutate ao nome updateRestaurant, updateRestaurant é uma função que você pode chamar para iniciar a criação do restaurante, updateRestaurant encapsula a lógica de fazer a solicitação para a API de criação do restaurante usando os detalhes fornecidos em useMutation(updateRestaurantRequest).
        isLoading, // temos acesso a essa propiedade de saber se a requisição esta em processo
        isSuccess, // essa propiedade fala se deu sucesso ou não
        error // essa propiedade fala se deu error
        } = useMutation(updateRestaurantRequest); // desestruturamos essas propiedades do useMutation

    if(isSuccess) {
        toast.success("Restaurant created!") // passamos para o toast para ele ele exibir uma mensagem ao usuario que a criação deu certo
    }

    if (error) {
        toast.error("Unable to update restaurant");
    }

    return { updateRestaurant, isLoading } // retornamos a função que ativa a nossa função de criar o restaurante, e isLoading para verificar se o processo de criação está em carregamento

}
