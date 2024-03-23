import { useUpdateMyRestaurant, useCreateMyRestaurant, useGetMyRestaurant, useGetMyRestaurantOrders } from "@/api/MyRestaurantApi"
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm"


const ManageRestaurantPage = () => { // criamos a pagina do form do restaurante

  const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant() // desestruturamos a função que ativa a outra função de criação do restaurante, e tambem pegamos o isLoading: renomeamos isLoading para isCreateLoading
  const { restaurant } = useGetMyRestaurant(); // pegamos restaurant que vem da nossa função que usamos para obter os dados do restaurante, 
  const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant() // desestruturamos a função que ativa a outra função de atualizar do restaurante, e tambem pegamos o isLoading: renomeamos isLoading para isUpdateLoading

  const {orders} = useGetMyRestaurantOrders(); // pegamos dessa nossa função os pedidos (orders) que o restaurante tem

  const isEditing = !!restaurant // vai servir para nos informar se estamos criando um restaurante ou editando
  /* 
  const isEditing = !!restaurant: Aqui, isEditing é uma variável
  que é definida como true se restaurant não for nulo (null) ou
  indefinido (undefined). O operador !! é usado para converter o
  valor de restaurant em um booleano. Se restaurant for uma referência
  válida (ou seja, não for null ou undefined), !!restaurant será true,
  indicando que estamos editando um restaurante existente. Se restaurant
  for null ou undefined, !!restaurant será false, indicando que não
  estamos editando e que estamos criando um novo restaurante.
  */

  return (

    <Tabs defaultValue="orders">
      {/* 
        tabs e um componente estilo uma tabela, onde voçê pode alternar paginas
        link do componente: https://ui.shadcn.com/docs/components/tabs
      */}
      <TabsList>
        {/* exibimos uma tabsList para indicar que teremos uma lista de tabs */}
          <TabsTrigger value="orders">
                Orders
          </TabsTrigger>
          <TabsTrigger value="manage-restaurant">
                Manage Restaurant
          </TabsTrigger>
          {/* Em trigger definimos o titulos para cada tab e passsamos seu valor para vincular com o <TabsContent />*/}
      </TabsList>

      <TabsContent value="orders" className="space-y-5 bg-gray-50 pg-10 rounded-lg">
        {/*
          Aqui em content indicamos que teremos o conteudo que será exibido para quando o usuário clicar no tab orders
        */}
          <h2 className="text-2x1 font-bold">{orders?.length} active orders</h2>
          {orders?.map((order)=> (
            <OrderItemCard order={order}/>
          ))}
          {/*
            Aqui fazemos um map pelo array dos pedidos
            e renderizamos para cada pedido ativo um card para exibir as informações desse pedido
          */}
      </TabsContent>

      <TabsContent value="manage-restaurant">
          <ManageRestaurantForm 
            restaurant={restaurant} 
            onSave={isEditing ? updateRestaurant : createRestaurant} // se isEditing for true significa que já temos um restaurante então estamos atualizando ele, senão for true significa que não encontramos nenhum restaurante e então estamos criando um. 
            isLoading={isCreateLoading || isUpdateLoading} /> // isCreateLoading e isUpdateLoading são variáveis que indicam se a operação de criação ou atualização do restaurante está em andamento, respectivamente. Se uma dessas operações estiver em andamento, isLoading será true, indicando que o formulário está em um estado de carregamento.
            {/* 
            Aqui em content indicamos que teremos o conteudo que será exibido para quando o usuário clicar no tab Manage Restaurant

            passamos para nosso Form os dados de "restaurant" para deixar os dados do restaurante já preenchido no form, caso o usuario tenha criado ele.
            
            aqui passamos a função que nos vamos usar para fazer a requisição
            para o backend que vai tentar criar o restaurante, é nessa função
            passamos os dados que veio desse componente de form para essa função.

            isLoading passamos para nosso form para informar se está em processo de carregamento
            quando usuario clicar para salvar os dados
            */}
      </TabsContent>

    </Tabs>




  )
}


export default ManageRestaurantPage