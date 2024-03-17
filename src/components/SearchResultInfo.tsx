import { Link } from "react-router-dom";


type Props = {
    total: number;
    city: string;
}

// esse e o componente que aparece as informações dos resultados
// exemplo de como aparece:
// 16 Restaurants found in london 
const SearchResultInfo = ({ total, city }: Props) => {
  return (
    <div className="text-x1 font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row"> {/* flex para telas menores, para telas grandes "lg:" alinhamos os items ao centro e o flex vai ser row */}
        <span>
            {total} Restaurants found in {city}
            <Link to="/" className="ml-1 text-sm font-semibold underline cursor-pointer text-blue-500">Change Location</Link>
        </span>
        insert sort dropdown here
    </div>
  )
}

export default SearchResultInfo