import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button"
import UsernameMenu from "./UsernameMenu";
import { Link } from "react-router-dom";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0(); // isAuthenticated retorna true ou false para saber se o user esta logado

  return (
    <span className="flex space-x-2 items-center"> {/* isso ira espçar os links na NavBar */}
      {isAuthenticated ? (
        <>
            <Link to={"/order-status"} className="font-bold hover:text-orange-500"> {/* adicionamos um link para página de status do pedido */}
              Order Status
            </Link>
            <UsernameMenu />  
        </>
      ) : ( 
          <Button 
          variant="ghost" 
          className="font-bold hover:text-orange-500 hover:bg-white"
          onClick={async () => await loginWithRedirect()}
          > {/* variant=ghost remove os estilos que ja vem no component de button do shadCn, para que podemos colocar nossos propios estilos */}
          Log In
      </Button>
      )}
    </span> 

  )
}
export default MainNav;