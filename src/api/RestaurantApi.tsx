import { RestaurantSearchResponse } from "@/types"
import { useQuery } from "react-query"


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// criamos nossa Api para se comunicar com o backend
export const useSearchRestaurants = (city?: string) => { // Recebemos como parâmetro uma "city" e vamos passa-la para o back end na url


    const createSearchRequest = async (): Promise<RestaurantSearchResponse> => { // ESSA FUNÇÃO RETORNA UMA PROMISSE DO TIPO : Promise<RestaurantSearchResponse> que criamos em types
        
        const response = await fetch(`${API_BASE_URL}/api/restaurant/search/${city}`)
        /*
            aqui nos fazemos uma request para url do nosso backend, e precisamos passar como parametro uma "city" (cidade)
        */

        if (!response.ok) { // se a resposta não foi (200) ok, então lançamos um erro
            throw new Error("Failed to get restaurant")
        }

        return response.json() // se a resposta do backend for ok, então ele  nos retornou algo, então transformamos em json e retornamos essa resposta.
    }

    const { data: results, isLoading } = useQuery(["searchRestaurants"], createSearchRequest, { enabled: !!city })
    /* 
    aqui usamos o hook do React para fazer uma consulta, e então desestruturamos dessa consulta
    os dados, e tambem isLoading Essa propriedade indica se os dados da consulta estão atualmente
    sendo carregados. Se estiver true, significa que os dados ainda não foram totalmente carregados
    e o aplicativo pode exibir uma indicação de carregamento para o usuário.


    { enabled: !!city }: Esta é uma opção de configuração fornecida ao hook useQuery. Aqui, enabled é definido
    como um valor booleano. Ele controla se a consulta deve ser realizada ou não. Se enabled for true, a consulta
    será realizada normalmente. Se for false, a consulta não será realizada.

    !!city: Isso é uma técnica comum em JavaScript para converter um valor em um booleano. Se city estiver definido
    (ou seja, se tiver um valor), !!city será true. Se city for null, undefined ou uma string vazia, !!city será false.
    */

    return {
        results,
        isLoading
    } // então retornamos dessa função, os resultados da Query e chamada da API pro backend
    // também o isLoading
}