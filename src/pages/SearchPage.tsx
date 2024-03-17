import { useSearchRestaurants } from "@/api/RestaurantApi";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useParams } from "react-router-dom";



const SearchPage = () => {

    const { city } = useParams(); // usamos esse hook do react para obter os parâmetros nesse caso obtemos "city"
    const { results, isLoading } = useSearchRestaurants(city); // passamos para a nossa função de buscar por restaurante a "city", e pegamos "results" o resultado dessa query (Consulta)
    
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
                insert cuisines here 
            </div>

            <div id="main-content" className="flex flex-col gap-5"> {/* adicionamos esse componente de informação */}
                <SearchResultInfo total={results?.pagination.total} city={city}/> 
                {results.data.map((restaurant) => ( // fazemos um map por todos restaurantes em data
                    <SearchResultCard  restaurant={restaurant} /> // passamos para nosso componente de card que renderiza o restaurante na pagina, os restaurantes.
                ))}
            </div>
        </div>
    )
}


export default SearchPage;