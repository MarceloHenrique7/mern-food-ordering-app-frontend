import { Order, OrderStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ORDER_STATUS } from "@/config/order-status-config";
import { useUpdateMyRestaurantOrder } from "@/api/MyRestaurantApi";
import { useEffect, useState } from "react";

type Props = { // criamos um tipo apenas para referênciar que receberemos um (pedido) order
    order: Order
}

// esse componente e um card que mostra nosso pedido na página de orders
const OrderItemCard = ({ order }: Props) => {

    const [status, setStatus] = useState<OrderStatus>(order.status)
    /*
        Esse useState é para definir no select o seu valor atual,
        ou seja, vamos atualizar o valor do select quando for alterado

        dizemos que o status tem que ser do tipo "<OrderStatus>",
        e como valor inicial para esse status colocamos, o status atual do pedido
    */

        useEffect(() => {
            // monitoramos a propiedade order.status para sincronizar o "status",
            // se não tivessemos o useEffect o useState que altera o status, alteraria apenas na primeira vez que carregase 
            setStatus(order.status)
        }, [order.status])

    const { updateRestaurantStatus, isLoading } = useUpdateMyRestaurantOrder(); 
    /* 
        pegamos a função que faz a request para para atualizar o status
        do pedido

        Pegamos o isLoading, para dizer se a request está acontecendo ainda
    */  

    const handleStatusChange = async (newStatus: OrderStatus) => { 
        /*
            Essa função lida com alteração do status do nosso select
            Recebemos o newState que e o novo status para mandarmos para nossa função que atualizar o status "updateRestaurantStatus"
        */
        await updateRestaurantStatus({ orderId: order._id as string, status: newStatus })
        /*
            Chamamos a função que atualiza o status do pedido e passamos o id do pedido,
            passamos também o status novo
        */
       setStatus(newStatus) // atualizamos no useState "status", que é usado para atualizar o value do select
    }   

    const getTime = () => {
        const orderDateTime = new Date(order.createdAt) // aqui criamos uma data com a data que já existe na propiedade createdAt
       
        const hours = orderDateTime.getHours(); // pegamos as horas dessa data
        const minutes = orderDateTime.getMinutes() // pegamos os minutos dessa data

        
        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        /*  
            queremos adicionar um zero no minuto se ele for menor que dez, exemplo:
            Hours = 12 a hora pode vim assim
            minutes = 2 e o minuto vem assim
            12:2 então a hora com os minutos ficariam assim
            12:02 adicionamos o zero para ficar ajustado o horario
        */

        return `${hours}:${paddedMinutes}`; // retornamos a hora completa
    }

  return (
    <Card>
        <CardHeader>
            <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
                <div>
                    Customer Name:
                    <span className="ml-2 font-normal">{order.deliveryDetails.name}</span>
                </div>
                <div>
                    Delivery address:
                    <span className="ml-2 font-normal">{order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}</span>
                </div>
                <div>
                    Time:
                    <span className="ml-2 font-normal">{getTime()}</span>
                </div>
                <div>
                    Total Cost:
                    <span className="ml-2 font-normal">${(order.totalAmount / 100).toFixed(2)}</span>
                </div>
            </CardTitle>
            <Separator />
            <CardContent className="flex flex-col gap-6">
                {/* 
                    Aqui temos o conteudo do card
                    Onde vai ficar nosso select para gerenciar o status dos pedidos
                */}
                <div className="flex flex-col gap-3 mt-5">
                    {order.cartItems.map((cartItem) => (
                        <span>
                            <Badge variant="outline" className="mr-2">
                                {cartItem.quantity}
                            </Badge>
                            {cartItem.name}
                        </span>
                    ))}
                    {/*
                        Aqui temos essa div que primeiro mostra a quantidade e o nome do item:
                            EX: 10 Hamburguer

                        então fazemos um map pelo cartItems que e o nosso array de pedidos
                        no "order" que recebemos nesse componente ele contem esse array de items
                        "cartItems"

                        <Badge> e apenas um componente para dar um destaque no texto como se fosse
                        um botão, variant="outline" é um estilo diferente para esse componente
                        
                        mr-2 - margin right de 2

                    */}
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="status">
                        What is the status of this order?
                    </Label>
                    <Select value={status} disabled={isLoading} onValueChange={(value) => handleStatusChange(value as OrderStatus)}> 
                        {/* 
                            definimos o value (valor) do select como "status" nossa variavel que usa o useState para ser atualizada

                            onValueChange - toda vez que o select for alterado, passamos uma arrow function
                            para poder pegar o value desse select,
                            
                            chamamos nossa função que lida com o status do pedido e passamos o value,
                            dizendo que esse value e do tipo "OrderStatus"

                            disabled={isLoading} - aqui quando alterarmos o status vai acontecer um requisição
                            para o backend atualizar esse status, então se ainda estiver em processo essa
                            requisição, indicamos que o select não pode ser usado porque a request está 
                            em andamento
                                
                        */}
                        <SelectTrigger id="status">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            {ORDER_STATUS.map((status) => (
                                <SelectItem value={status.value}>
                                    {status.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {/*
                    
                    Aqui nessa div é aonde vai o nosso select
                    
                    Usamos um Label para indicar e referênciar o select
                    Ultilizamos o componente do shadcn <Select> para facilitar
                    <SelectTrigger> - colocamos aqui o id="status" para vincular esse select com o label
                    <SelectValue> é p valor inicial do select, colocamos apenas um placeholder="Status"
                    
                    <SelectContent> é aonde colocamos as opções do select, 
                    position="popper" - é a posição onde queremos que apareça as opções do select
                    quando o user clicar no <SelectTrigger>, dizemos "popper", Que significa sua posição natural
                    que normalmente e embaixo do <SelectTrigger>
                    
                    depois fazemos um map pelo array de objetos, em "ORDER_STATUS"
                    cada objeto desse e um status diferente, então pegamos "status" por "status"
                    e criamos um <SelectItem>, passando o valor dele é o label que é o texto que o usuário vai ver
                    */}
                </div>
            </CardContent>
        </CardHeader>
        {/* 
            Primeiro ultilizamos o componente de card do shadCn <Card> para indicar que isso e um card
            depois informamos que teremos nesse card um header <CardHeader>
            nesse <CardHeader> temos um titulos do header <CardTitle>
            
            Em <CardTitle> temos algumas classes

            "grid" - para telas menores vais ser apenas uma grid com as div em coluna
            "md:grid-cols-4" - para telas medias ou maiores teremos as div em 4 colunas 
            "gap-4" - espaçamento entre essas div
            "justify-between": espaçamos os elementos usando todo espaço disponivel
            "mb-3": adicionamos uma margim bottom de 3

            após isso temos os span
            "ml-2": margin left de 2 unidades
            "font-normal": indica que a font e de tamanho normal
            
            getTime() obtemos aqui o horario que o pedido foi feito para adicionarmos nesse card

            ${(order.totalAmount / 100).toFixed(2)} - aqui estamos convertendo de centavos
            para moeda

        */}
    </Card>
  )
}

export default OrderItemCard;
