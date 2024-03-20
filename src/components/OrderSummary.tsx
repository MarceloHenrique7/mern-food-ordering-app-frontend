import { CartItem } from "@/pages/DetailPage"
import { Restaurant } from "@/types"
import { CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import { Trash } from "lucide-react"




type Props = { // definimos o tipo das propiedades
    restaurant: Restaurant, // teremos nesse tipo uma propiedade restaurant que e do tipo Restaurant 
    cartItems: CartItem[], // teremos nesse tipo uma propiedade cartItems que e uma lista de items do tipo CartItem 
    removeFromCart: (cartItem: CartItem) => void; // temos uma função que remove o "cartItem" do array "cartItems"
}


const OrderSummary = ({ restaurant, cartItems, removeFromCart }: Props) => {
  // esse componente e aonde aparecerá os item adicionados ao carrinho
    
    const getTotalCost = () => {
        const totalInPence = cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0)
        /*
            Aqui em reduce passamos como primeiro argumento um acumulador "total",

            depois pegamos o item atual do array que estamos percorrendo "cartItem"

            após isso atribuimos ao acumulador o preço do item * a quantidade do item

            o "0" representa o valor inicial do acumulador "total"
        */
        const totalWithDelivery = totalInPence + restaurant.deliveryPrice
        // aqui fazemos o total do pedido + a entrega

        return (totalWithDelivery / 100).toFixed(2)
        // aqui denovo apenas convertemos para moeda normal e retornamos esse valor

    }
    
   return (
    <>
    {/* 
        Porque não estamos englobando isso tudo aqui dentro do <Card></Card>?
        Porque em DetailPage já temos um  <Card></Card>, então apenas colocamos
        esse conponente dentro do <Card></Card> em DetailPage.
    */}
        <CardHeader> {/* indicamos que teremos um cabeçalho aqui, que vem do nosso componente de Card */}
            <CardTitle className="text-2x1 font-bold tracking-tight flex justify-between"> {/* indicamos que teremos um title aqui, que vem do nosso componente de Card */}
                <span>Your Order</span>
                <span>${getTotalCost()}</span>
            </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5"> {/* indicamos que teremos um conteudo do card aqui, que vem do nosso componente de Card */}
            {cartItems.map((item) => (
                <div className="flex justify-between">
                    <span>
                        <Badge variant="outline" className="mr-2"> {/* esse componente badge vem do shadcn e apenas para colocar a quantidade de item, variant="outline" - é um estilo diferente para esse componente, mr-2 - margin right de 2 unidades */}
                            {item.quantity}
                        </Badge>
                        {item.name} {/* nome do item */}
                    </span>
                    <span className="flex items-center gap-1">
                        <Trash className="cursor-pointer" color="red" size={20} onClick={() => removeFromCart(item)}/>
                        {/* aqui Trash e um icone de uma lixeira, serve para indicar que o usuário pode clicar aqui e remover o item do carrinho (cartItems) */}
                        ${((item.price * item.quantity) / 100).toFixed(2)}
                        {/* 
                            Aqui pegamos o preço do item e multiplicamos pela quantidade que o usuario selecionou
                            porque o usuário pode escolher muitos do mesmo item

                            depois dividimos por 100 para converter para moeda normal
                            porque o preço vem: 250 que convertendo, dividindo por 100
                            fica 2,50, então arredondamos para duas casas decimais ficando
                            2.50
                        */}
                    </span>
                </div>
            ))}
            <Separator /> {/* usamos um separador aqui */}
            <div className="flex justify-between">
                <span>
                    Delivery
                </span>
                <span>
                    ${(restaurant.deliveryPrice / 100).toFixed(2)}
                </span>
            </div>
            <Separator /> {/* usamos um separador aqui */}
        </CardContent>
    </>
  )
}


export default OrderSummary
