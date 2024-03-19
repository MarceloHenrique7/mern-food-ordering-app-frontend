import { useSearchRestaurants } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropDown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
    searchQuery: string; // searchQuery será oque o usuário digitara na searchBar
    page: number; // page será a página atual que o usuário está navegando
    selectedCuisines: string[] // selectedCuisines será um array que armazena as Cuisines slecionadas no Filtro
    sortOption: string; // será uma opção de ordenação do nosso filtro e tem que ser string
} 

const SearchPage = () => {
    const { city } = useParams(); // usamos esse hook do react para obter os parâmetros nesse caso obtemos "city"
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
        page: 1,
        selectedCuisines: [], // definimos aqui como padrão o "selectedCuisines" como array vazio
        sortOption: "bestMatch" // definimos como padrão para essa propiedade de opção de ordenação como "bestMatch"
        /*  
            searchState serve para gerenciarmos o estado atual da página.

            Criamos um objeto usando useState, e definimos um objeto com um valor padrão para propiedade searchQuery
            Também definimos page: 1 que por padrão a pagina sempre será a 1, na primeira pesquisa que o usuário fizer
        */
    })

    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    // definimos essa variavel como false inicialmente, usando useState<boolean> dizendo que essa variavel vai ser um booleano

    const { results, isLoading } = useSearchRestaurants(searchState, city); // passamos para a nossa função de buscar por restaurante a "city", e pegamos "results" o resultado dessa query (Consulta)
    
    const setSortOption = (sortOption: string) => {
        // função para atualizar nossa sortOption
        setSearchState((prevState) => ({
            ...prevState, //pregamos tudo que já exisitia nesse "searchState" e adicionamos
            sortOption, // atualizamos nossa sortOption dentro do searchState
            page: 1
            /*
            passamos o page: 1 também porque isso vai alterar o estado da nossa pesquisa (search),
            então baseado em uma nova pesquisa queremos começar da página 1 novamente.
            */
        }))
    }


    const setSelectedCuisines = (selectedCuisines: string[]) => {
        setSearchState((prevState) => ({
            ...prevState,
            selectedCuisines,
            page: 1

        /* 
            ...prevState). Isso copia todas as propriedades do estado anterior para o novo objeto de estado
            queremos ter certeza de que o restante dos nossos valores, como as culinárias e a ordem de
            classificação, não serão substituídos sempre que atualizarmos o estado
            
            setamos o nosso array "selectedCuisines" que recebemos de <CuisinesFilter />, no estado do nosso search

            passamos o page: 1 também porque isso vai alterar o estado da nossa pesquisa (search),
            então baseado em uma nova pesquisa queremos começar da página 1 novamente.
        */
        }))
    }

    const setPage = (page: number) => {
        // essa função serve para adicionar a página atual que estamos
        // em nosso objeto searchState que diz qual estado que se encontra na página
        setSearchState((prevState)=> ({
            ...prevState,
            page
        }))
    }

    const setSearchQuery = (searchFormData: SearchForm) => { // essa função e para definir a pesquisa do usuario
        setSearchState((prevState) => ({ // alteramos o nosso objeto (searchState) usando sua função (setSearchQuery) do useState
            ...prevState, 
            /* 
            ...prevState). Isso copia todas as propriedades do estado anterior para o novo objeto de estado
            queremos ter certeza de que o restante dos nossos valores, como as culinárias e a ordem de
            classificação, não serão substituídos sempre que atualizarmos o estado
            */
            searchQuery: searchFormData.searchQuery, // aqui alteramos a propiedade searchQuery do nosso objeto "searchState" para oque recebemos do parâmetro "searchFormData"
            page: 1 // quando setarmos no nosso objeto "searchState" definimos a page como 1
        }));
    };

    const resetSearch = () => {
        // essa função reseta (apaga) o conteudo que estava no searchBar 
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: "", // aqui dizemos que esse campo está vazio
            page: 1, // quando usarmos a função para resetar os campo também resetamos a página para 1
        }))
    }

    if(isLoading) { // se a nossa consulta o estado de carregamento isLoading for true nos mostramos essa msg indicando que os resultados estão carregando
        <span>
            Loading...
        </span>
    }

    if (!results?.data || !city) { // se não tivermos nada em data ou se a "city" nao for passada retornamos isso
        return <span>No Results found</span>
    }



    return (
        <div className="grid grid-col-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisines-list">
                <CuisineFilter selectedCuisines={searchState.selectedCuisines} onChange={setSelectedCuisines} isExpanded={isExpanded} onExpandedClick={()=> setIsExpanded((prevIsExpanded) => !prevIsExpanded)} />
                {/*
                    passamos para selectedCuisines = nosso array atual de "searchState.selectedCuisines"

                    passamos para onChange uma função "setSelectedCuisines" que altera o estado da nossa searchState (estado da pesquisa)
                    nessa função pegamos todos estados anteriores e adicionamos oque veio desse onChange, no caso as (cuisines)

                    isExpanded={isExpanded} passamos para isExpanded o estado atual dessa variavel

                    onExpandedClick={()=> setIsExpanded((prevIsExpanded) => !prevIsExpanded)}

                    aqui estamos passando para a função onExpandedClick, uma função "setIsExpanded" que altera o estado da nossa variavel "isExpanded",
                    no caso nos nessa função "setIsExpanded" temos acesso a variavel que ela está alterando o estado
                    então pegamos essa variavel "prevIsExpanded" e passamos o estado oposto dela, ou seja
                    se essa variavel estava definida como false, agora passamos ela como true para nosso "onExpandedClick"
                */}
            </div>

            <div id="main-content" className="flex flex-col gap-5"> {/* adicionamos esse componente de informação */}
                <SearchBar searchQuery={searchState.searchQuery} onSubmit={setSearchQuery} placeHolder="Search by cuisine or Restaurant Name" onReset={resetSearch}/>
                {/* 
                Adicionamos nossa searchBar (barra de pesquisa) passamos o onSubmit, placeHolder e o onReset
                
                passamos searchQuery para que quando o usuario alterar a pesquisa, e quando essa pesquisa for enviada
                esse componente irá renderizar novamente e no campo de pesquisa essa pesquisa que ele digitou vai sumir,
                então estamos mandando "searchState.searchQuery" a pesquisa que ele fez para nosso componente, assim nos
                vamos persistir essa pesquisa no campo ao usuario ter digitado e pesquisado.

                */}
                <div className="flex justify-between flex-col gap-3 lg:flex-row"> 
                    {/* 
                    inserimos esses dois componente em uma div poruqe queremos que eles
                    fique na mesma linha.

                    a classe flex-col e para quando a tela for menor
                    lg:flex-row indica que para telas grandes teremos esses dois item em linha 
                    */}
                    <SearchResultInfo total={results?.pagination.total} city={city}/> 
                    <SortOptionDropDown sortOption={searchState.sortOption} onChange={(value) => (setSortOption(value))}/> 
                    {/* 
                    passamos para nosso componente de Dropdown a opção de ordenação
                    e a função que alterar e atualizar a sortOption no nosso "searchState",
                    quando onChange é chamado temos acesso ao valor que está vindo do nosso
                    componente "SortOptionDropDown" então pegamos esse valor e passamos para
                      função que atualiza o searchState 
                    */}
                </div>
                {results.data.map((restaurant) => ( // fazemos um map por todos restaurantes em data
                    <SearchResultCard  restaurant={restaurant} /> // passamos para nosso componente de card que renderiza o restaurante na pagina, os restaurantes.
                ))}
                <PaginationSelector page={results.pagination.page} pages={results.pagination.pages} onPageChange={setPage}/>
                {/* 
                passamos para nosso seletor de paginação
                
                page = que indicia a página tual
                pages = que indicia quantas páginas são necessarias para mostrar todos restaurants
                onPageChange = mandamos uma função que vai lidar com a paginação
                */}
            </div>
        </div>
    )
}


export default SearchPage;