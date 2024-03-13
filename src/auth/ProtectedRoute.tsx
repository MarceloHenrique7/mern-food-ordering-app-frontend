import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";


// adicionaremos isso ao inicio das rotas que só usuários logados podem ver
const ProtectedRoute = () => {

  const { isAuthenticated } = useAuth0();
  
  return isAuthenticated ? (<Outlet />) : (<Navigate to="/"/> ) // Outlet significa: renderize todas as rotas filhas desse componente, Nou seja (Outlet) para dizer: 'continue a usar as rotas a seguir porque o usuario esta logado e tudo ok', caso ele não esteja logado usamos o (Navigate para redirecionar para rota da home page ('/'))

}



export default ProtectedRoute;