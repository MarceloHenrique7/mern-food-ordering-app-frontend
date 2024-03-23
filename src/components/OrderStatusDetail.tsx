import { Order } from "@/types"
import { Separator } from "./ui/separator"


type Props = {
    // nesse tipo teremos um order que é do tipo Order
    order: Order
}

const OrderStatusDetail = ({order}: Props) => {
  return (
    <div className="space-y-5">
        <div className="flex flex-col">
            <span className="font-bold">Delivering to: {}</span>
            <span>{order.deliveryDetails.name}</span>
            <span>{order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}</span>
            {/*
                Aqui adicionamos o nome que vem da propiedade deliveryDetails
                também o endereço e a cidade
                ex: 
                    Delivery to: "otavio"
                    Rua 999, newYork

            */}
        </div>
        <div className="flex flex-col">
            <span className="font-bold">
                Your Order
            </span>
            <ul>
                {order.cartItems.map((item) => (
                    <li>
                        {item.name} x {item.quantity}
                    </li>
                ))}
            </ul>

            {/*
                Aqui mostramos os items para ser entregues
                fazemos um map pelo array cartItems (carrinho de items)
                pegamos o item (item),

                exibimos o nome x quantidade, ex:
                    Maçã x2
                    laranja x19
            
            */}
        </div>
        <Separator /> {/* usamos o <Separator/> para separar com uma linha os conteudos */}
        <div className="flex flex-col">
            <span className="font-bold">
                Total
            </span>
            <span>
                ${(order.totalAmount / 100).toFixed(2)}
            </span>
            {/*
                Aqui mostamos o total da compra,
                
                ${(order.totalAmount / 100).toFixed(2)}
                essa linha apenas convertemos o valor que vem em centavos de totalAmount
                para valor em moeda
            */}
        </div>
        
    </div>
  )
}


export default OrderStatusDetail


