import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";


// adicionaremos isso ao inicio das rotas que só usuários logados podem ver
const ProtectedRoute = () => {

  const { isAuthenticated, isLoading } = useAuth0(); // isAuthenticated vem de auth0 e isso verifica se o usuario está autenticado, isLoading nos diz se isAuthenticated ainda esta verificando se o user está logado
  

  if(isLoading) {
    return null // se estiver carregando o processo de verificar se o user está authenticado, apenas retorne null
  }
  // após carregar a verificação que acontece em isAuthenticated
  if(isAuthenticated) {
    return <Outlet /> // Outlet significa: renderize todas as rotas filhas desse componente, Nou seja (Outlet) para dizer: 'continue a usar as rotas a seguir porque o usuario esta logado e tudo ok', 
  }

  return <Navigate to="/" replace /> // caso ele não esteja logado usamos o (Navigate para redirecionar para rota da home page ('/'))

}



export default ProtectedRoute;