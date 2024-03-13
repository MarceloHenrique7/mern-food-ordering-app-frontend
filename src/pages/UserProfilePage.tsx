import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";


const UserProfilePage = () => {
    const { currentUser, isLoading: isGetLoading } = useGetMyUser(); // aqui quando esse componente e renderizado nos fazemos a busca primeiro dos dados do usuario usando nossa função (useGetMyUser) essa função nos retorna (currentUser, isLoading) então nos desestruturamos do retorno dessa função essas propiedades { currentUser, isLoading: isGetLoading } | (isLoading: isGetLoading) aqui siginifica apenas que estamos dando outro nome para isLoading (isGetLoading)
    const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser() // depois useUpdateMyUser() usando a nossa função de atualizar usuario, nos pegamos de dentro dessa função, outra função (updateUser) que essa de fato vai atualizar o usuario, quando o form for enviado chamamos essa função, isLoading: (isUpdateLoading) indica que quando mandarmos atualizar o usuarios (isUpdateLoading) vamos verificar o estado de carregamento desse update 

    if(isGetLoading) { // se estiver carregando a busca pelo usuario retornamos e renderizamos na tela essa mensagem enquanto buscamos pelo user
      return <span>Loading...</span>
    }

    if (!currentUser) { // se não encontrarmos o usuario, retornamos que não foi possivel carregar o usuario
      return <span>Unable to load user profile</span>
    }

  return ( // quando o user for encontrado renderizamos nosso form na pagina 
    <UserProfileForm 
     currentUser={currentUser} // passamos os dados do nosso usuario que está logado para o nosso form, usaremos os dados para deixa já preenchido os campos do form
     onSave={updateUser} // quando esse form for enviado, passamos os dados do form para onSave() e o onSave(updateUser) executa a nossa função que atualiza o usuario
     isLoading={isUpdateLoading} /> 
  )
}

export default UserProfilePage;