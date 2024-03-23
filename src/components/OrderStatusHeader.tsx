import { Order } from "@/types"
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";

type Props = {
    order: Order;
}

// esse componente vamos incorpora-lo na página OrderStatusPage
// é o nosso cabeçalho dessa página
const OrderStatusHeader = ({ order }: Props) => { 
    // aqui recebemos um pedido

    const getExpectedDelivery = () => {
        /* 
            Essa função calcula o tempo estimado do delivery (da entrega)
            pegamos o momento que o pedido foi gerado através da propiedade "createdAt" que temos em "order"
            é 
        
        */

       const created = new Date(order.createdAt) // criamos uma nova date a partir da hora que o pedido foi criado
       created.setMinutes(created.getMinutes() + order.restaurant.estimatedDeliveryTime) 
       /* 
            Como created e do tipo Date temos acesso a esse metodo de adicionar minutos na data
            
            "created.getMinutes()" - pegamos os minutos da nossa data created
            é somamos com o tempo de entrega do restaurante
            "+ order.restaurant.estimatedDeliveryTime"
       */

        const hours = created.getHours(); // pegamos da data created apenas as horas
        const minutes = created.getMinutes(); // pegamos da data created apenas os minutos

        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        /*  
            queremos adicionar um zero no minuto se ele for menor que dez, exemplo:
            Hours = 12 a hora pode vim assim
            minutes = 2 e o minuto vem assim
            12:2 então a hora com os minutos ficariam assim
            12:02 adicionamos o zero para ficar ajustado o horario
        */
        return `${hours}:${paddedMinutes}` // retornamos uma string com o horário
    }   

    const getOrderStatusInfo = () => { // usamos essa função para obter o status do pedido
        return ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
        /*
         Aqui ORDER_STATUS é um array de objetos então usamos metodo find para procurar
         nesse "o" objeto, onde sua propiedade value for igual a propiedade status de "orders"

         então esse objeto será retornado

         ou então nós pegamos o primeiro objeto desse array caso não encontre
        */
    }

    return (
        <>
            <h1 className="text-4x1 font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
                {/*
                    text-4x1: Indica tamanho da fonte

                    font-bold: indica o negrito

                    tracking-tighter: indica o espaçamento entre as letras

                    esse h1 terá um display flex-col para telas pequenas: que vai ser os textos em colunas

                    um gap-5: indica um espaçamento entre os items de 5 unidades

                    para telas medias os items ficação em linha e também aplicamos um justify-between que afasta os items

                */}

                <span>
                    Order Status: {getOrderStatusInfo().label} {/* essa função nos retorna um objeto que tem as informação do status do pedido, label e em qual status o pedido está */}
                </span>
                <span>
                    Expected By: {getExpectedDelivery() /* chamamos nossa função que pega o tempo estimado da entrega */}
                </span>
            </h1>
            <Progress className="animate-pulse" value={getOrderStatusInfo().progressValue}/> 
            { /* 
                adicionamos nossa barra de progresso que veio do shadcn,
                e adicionamos uma classe de animação para pulsar.

                passamos a função para obtermos a informação do status do pedido
                e pegamos dela a propiedade progressValue que é um number,
                é isso indica a porcentagem da barra
            */ }
        </>
    )
}

export default OrderStatusHeader;