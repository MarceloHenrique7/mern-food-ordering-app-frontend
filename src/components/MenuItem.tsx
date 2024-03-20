import { MenuItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
    menuItem: MenuItem; // temos aqui um item que e do tipo MenuItem
    addToCart: () => void; // esse tipo tem uma função que adiciona o item no carrinho (cartItems)
}

const Menuitem = ({ menuItem, addToCart }: Props) => {
  return (
    <Card className="cursor-pointer" onClick={addToCart}>  {/* usaremos o componente card do shadCn */}
        <CardHeader>
            <CardTitle>
                {menuItem.name}
            </CardTitle>
            {/* adicionamos cabeçalho do card e também um title*/}
            <CardContent className="font-bold"> {/* adicionamos o conteudo do card */} 
                ${(menuItem.price / 100).toFixed(2)}
                {/* 
                    pegamos o price (preço) do item e covertemos para moeda, porque ele vem como centavos
                    ex:
                        250 para > 2,50
                */}
            </CardContent>
        </CardHeader>
    </Card>
  )
}


export default Menuitem;
