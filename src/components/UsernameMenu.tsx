import { CircleUserRound } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";



const UsernameMenu = () => {
    const { user, logout } = useAuth0(); { /* esse hook cria uma request para API, e enquanto esse processo acontece const user fica definido como undefined */}
  return (
    <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-orange-500 gap-2">
            <CircleUserRound className="text-orange-500"/> {/* esse componente e o icone de perfil de user */}
            {user?.email} 
        </DropdownMenuTrigger>
        <DropdownMenuContent>{/* esse componente e para conteudo do dropmenu */}
            <DropdownMenuItem> {/* esse componente e para agrupar melhor o espaço do link */}
                <Link to="/manage-restaurant" className="font-bold hover:text-orange-500">
                    Manage Restaurant
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem> {/* esse componente e para agrupar melhor o espaço do link */}
                <Link to="/user-profile" className="font-bold hover:text-orange-500">
                    User Profile
                </Link>
            </DropdownMenuItem>
            <Separator /> {/* esse componente e para separar um do outro */}
            <DropdownMenuItem>
                <Button
                 onClick={ ()=> logout() }
                className="flex flex-1 font-bold bg-orange-500" /* faz com que esse elemento cresça e ocupe todo o espaço disponível na horizontal */
                >
                Log Out</Button> 
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}



export default UsernameMenu;