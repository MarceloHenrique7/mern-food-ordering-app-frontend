import { Restaurant } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Dot } from "lucide-react"

type Props = { // definimos esse tipo que vai conter um restaurant que vai ser do tipo Restaurant criado em types
    restaurant: Restaurant
}

const RestaurantInfo = ({ restaurant }: Props) => { 
    // desestruturamos esse restaurant do nosso type

  return (
    <Card className="border-sla"> {/* usaremos o componente card do shadCn */}
        <CardHeader> 
            <CardTitle className="text-3x1 font-bold tracking-tight">
                {restaurant.restaurantName}
            </CardTitle>
            <CardDescription> {/* adicionamos a descrição do card */}
                {restaurant.city}, {restaurant.country}
            </CardDescription>
        </CardHeader>
        {/* adicionamos cabeçalho do card e também um title , (tracking-tight) controla o espaçamento entre as letras*/}
        <CardContent className="flex"> {/* adicionamos o conteudo do card */} 
                {restaurant.cuisines.map((item, index) => (
                    <span className="flex">
                        <span>{item}</span>
                        {index < restaurant.cuisines.length - 1 && <Dot/>}
                        {/*
                            <span>{item}</span>
                            {index < restaurant.cuisines.length - 1 && <Dot />}
                            
                            Nessas 2 linhas primeiro mostramos o nome da cuisine (item)
                            depois pegamos o index o item atual que estamos percorrendo no array de cuisines
                            verificamos se o index atual e menor do que no tamanho total da nossa lista de cuisines
                            se for menor nos adicionamos um ponto • que vem do componente <Dot /> da biblioteca lucide-react,
                            Por exemplo:
                                Pasta • salad • Tacos • SeaFood • Noodles

                            basicamente isso aqui
                        */}
                    </span>
                ))}
        </CardContent>

    </Card>
  )
}


export default RestaurantInfo