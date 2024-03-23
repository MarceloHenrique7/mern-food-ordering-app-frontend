import { OrderStatus } from "@/types";

type OrderStatusInfo = {
    // criamos esse tipo apenas para garantir que nosso value vai ser um status valido
    label: string;
    value: OrderStatus; // definimos essa propiedade que vai ser do tipo "OrderStatus"
    progressValue: number;
}


export const ORDER_STATUS: OrderStatusInfo[] = [ // dizemos que ORDER_STATUS e um array desse tipo "OrderStatusInfo"

    // label: é oque o usuário vai ver
    // value: é o status desse pedido
    // progressValue: é a porcentagem da nossa barra de progresso, que ficará visivel na página de order (pedido)

    { label: "Placed", value: "placed", progressValue: 0 },
    { label: "Awaiting Restaurant Confirmation", value: "paid", progressValue: 25 },
    { label: "In Progress", value: "inProgress", progressValue: 50 },
    { label: "Out For Delivery", value: "outForDelivery", progressValue: 75 },
    { label: "Delivered", value: "delivered", progressValue: 100 },
    
]