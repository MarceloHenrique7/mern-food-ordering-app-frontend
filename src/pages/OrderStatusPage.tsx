import { useGetMyOrder } from "@/api/OrderApi";
import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";





const OrderStatusPage = () => {
    const { orders, isLoading } = useGetMyOrder() // obtemos nossos pedidos que vem da nossa função que faz a request para obter o pedido, eo isLoading que indica se essa request ainda está acontecendo
    
    if(isLoading) {
        // se a request ainda estiver em andamento, ou seja ainda estamos tentando encontrar os pedidos
        return "Loading..." // retornamos uma mensagem de carregamento
    };

    if(!orders || orders.length === 0) {
        // se não existir nenhum pedido ou se nosso array de pedidos estiver vazio
        return "No Orders found" // retornamos um texto indicando que nenhum pedido foi encontrado
    };

    return (
        <div className="space-y-10"> {/* aqui dizemos que essa div tem um espaçamento de 10 unidades na vertical */}
            {orders.map((order)=> ( 
                <div className="space-y-10 bg-gray-50 p-10 rounded-lg">
                    <OrderStatusHeader order={order}/> {/* aqui será nosso cabeçalho da página de status do pedido, passamos nosso pedido */}
                    <div className="grid gap-10 md:grid-cols-2"> {/* aqui nessa div teremos para telas menores "mobile", uma grid com um elemento, é para telas medias uma grid com duas colunas */}
                        <OrderStatusDetail order={order} />
                        <AspectRatio ratio={16/5}>
                            <img src={order?.restaurant?.imageUrl} className="rounded-md object-cover h-full w-full"/>
                        </AspectRatio>
                        {/*
                            Exibimos "OrderStatusDetail" que contem detalhes como total do pedido, nomes dos item comprados
                            
                            AspectRatio é um componente para exibirmos imagens
                            ultilizamos ratio para definir a proporção da imagem

                            rounded-md - arredondamos as bordas da imagem
                            object-cover - faz com que a imagem preencha todo espaço disponivel
                            h-full - faz com que ultilize toda altura da imagem
                            w-full - faz com que ultilize toda largura da imagem

                        */}
                    </div>
                </div>
            ))}
            {/* fazemos um map pelos pedidos */}
        </div>
    )
    
}


export default OrderStatusPage;

