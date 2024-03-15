import { useUpdateMyRestaurant, useCreateMyRestaurant, useGetMyRestaurant } from "@/api/MyRestaurantApi"
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm"


const ManageRestaurantPage = () => { // criamos a pagina do form do restaurante

  const { createRestaurant, isLoading: isCreateLoading } = useCreateMyRestaurant() // desestruturamos a função que ativa a outra função de criação do restaurante, e tambem pegamos o isLoading: renomeamos isLoading para isCreateLoading
  const { restaurant } = useGetMyRestaurant(); // pegamos restaurant que vem da nossa função que usamos para obter os dados do restaurante, 
  const { updateRestaurant, isLoading: isUpdateLoading } = useUpdateMyRestaurant() // desestruturamos a função que ativa a outra função de atualizar do restaurante, e tambem pegamos o isLoading: renomeamos isLoading para isUpdateLoading

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
    <ManageRestaurantForm
    restaurant={restaurant} 
    onSave={isEditing ? updateRestaurant : createRestaurant} // se isEditing for true significa que já temos um restaurante então estamos atualizando ele, senão for true significa que não encontramos nenhum restaurante e então estamos criando um. 
    isLoading={isCreateLoading || isUpdateLoading} /> // isCreateLoading e isUpdateLoading são variáveis que indicam se a operação de criação ou atualização do restaurante está em andamento, respectivamente. Se uma dessas operações estiver em andamento, isLoading será true, indicando que o formulário está em um estado de carregamento.
    // passamos para nosso Form os dados de "restaurant" para deixar os dados do restaurante já preenchido no form, caso o usuario tenha criado ele.
    
    /*
    aqui passamos a função que nos vamos usar para fazer a requisição
    para o backend que vai tentar criar o restaurante, é nessa função
    passamos os dados que veio desse componente de form para essa função.

    isLoading passamos para nosso form para informar se está em processo de carregamento
    quando usuario clicar para salvar os dados
    */


  )
}


export default ManageRestaurantPage