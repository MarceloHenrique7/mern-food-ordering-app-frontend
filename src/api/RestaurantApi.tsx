import { SearchState } from "@/pages/SearchPage"
import { Restaurant, RestaurantSearchResponse } from "@/types"
import { useQuery } from "react-query"


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// usamos essa função para fazer a request para obter os dados de um unico restaurante
export const useGetRestaurant = (restaurantId?: string) => {
    /* 
        Aqui recebemos um id do tipo string como parâmetro dessa função
    */

    const getRestaurantByIdRequest = async (): Promise<Restaurant> => { // função que faz a resquest e nos retorna uma promessa de um Restaurant
        
        const response = await fetch(`${API_BASE_URL}/api/restaurant/${restaurantId}`);
        // passamos para fetch nossa rota base"/api/restaurant" e o endpoint que configuramos para essa rota no backend, depois vem o id
        
        if (!response.ok) { // se a resposta não foi (200) ok, então lançamos um erro
            throw new Error("Failed to get restaurant")
        }

        return response.json() // se der certo transformamos os dados do restaurant para o formato json
        
    };

    
    const {data: restaurant, isLoading} = useQuery("fetchRestaurant", getRestaurantByIdRequest, {
        enabled: !!restaurantId,
    })
    // passamos para o useQuery um nome e a nossa função que faz de fato a request
    // então pegamos o data (dados), apenas renomeamos esse data para restaurant, da nossa requisição através do hook useQuery do react
    // também pegamos o isLoading para indicar o estado de carregamento da request
   /*
    {
        enabled: !!restaurantId,
    }

    aqui falamos para o useQuery do react, para ele fazer a query (consulta) se tivermos um id
   */
    return { restaurant, isLoading } // retornamos o restaurant, e o isLoading

}


// criamos nossa Api para se comunicar com o backend
export const useSearchRestaurants = (searchState: SearchState, city?: string) => { // Recebemos como parâmetro uma "city" e vamos passa-la para o back end na url


    const createSearchRequest = async (): Promise<RestaurantSearchResponse> => { // ESSA FUNÇÃO RETORNA UMA PROMISSE DO TIPO : Promise<RestaurantSearchResponse> que criamos em types
        const params = new URLSearchParams();
        /*
            const params = new URLSearchParams();
            essa linha cria um novo objeto URLSearchParams.
            Este objeto é usado para manipular parâmetros de consulta em uma URL.
        */
        params.set("searchQuery", searchState.searchQuery);
        /* 
            aqui setamos no params uma chave com um valor
            pegamos do searchState o searchQuery que é oque o usuario digitou

            supondo que searchState.searchQuery = london
            então ficaria "searchQuery=london"
        */
        params.set("page", searchState.page.toString())
        /*
            Setamos outro params com chave e valor
            pegamos de searchState a propiedade page passamos ela tambem como string
        */
        params.set("selectedCuisines", searchState.selectedCuisines.join(','))
        /*
            Setamos outro params com chave e valor
            pegamos de searchState a propiedade selectedCuisines que é um array de strings
            usamos join para juntar essas string desse array e passar como parâmetro,

            selectedCuisines = ['arroz', 'feijão', 'batata']
            com join = 'arroz, feijão, batata'
        */

        params.set("sortOption", searchState.sortOption);

        /*
            Setamos esse params que referência o nosso filter de ordenação
            passamos a opção que o usuario escolheu como ordenação,
            para os params
        */



        const response = await fetch(`${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`)
        /*
            Aqui nos fazemos uma request para url do nosso backend, e precisamos passar como parametro uma "city" (cidade)
            que recebemos na chamada dessa função.

            também precisamos passar a query para essa URL então apos ${city} passamos ? para indicar uma query
            logo após passamos nossa query que criamos em params e passamos ela como string
        */

        if (!response.ok) { // se a resposta não foi (200) ok, então lançamos um erro
            throw new Error("Failed to get restaurant")
        }

        return response.json() // se a resposta do backend for ok, então ele  nos retornou algo, então transformamos em json e retornamos essa resposta.
    }

    const { data: results, isLoading } = useQuery(["searchRestaurants", searchState], createSearchRequest, { enabled: !!city })
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
    // também o isLoading que nos forneçe a informação se essa request está em andamento
}