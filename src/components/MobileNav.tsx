import { CircleUserRound, Menu } from "lucide-react" // menu - hamburguer
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react"
import MobileNavLinks from "./MobileNavLinks"

// componente de menu lateral da pagina - veio do ShadCN

const MobileNav = () => {
    const { isAuthenticated, loginWithRedirect, user } = useAuth0(); // isAuthenticated retorna true ou false caso user esteja logado, loginWithRedirect faz login e depois redirecionar o usuario, user para obter detalhes do user
  return (
    <Sheet>
        <SheetTrigger>
            <Menu className="text-orange-500"/>
        </SheetTrigger>
        <SheetContent className="space-y-3"> {/* space-y-3 faz com que tenha um espaço na vertical */}
            <SheetTitle>
                {isAuthenticated ? (
                    <span className="flex items-center font-bold gap-2">
                        <CircleUserRound className="text-orange-500" />
                        {user?.email}
                    </span>
                 ) : (
                    <span>Welcome to MernEats.com!</span> 
                )}
            </SheetTitle>
            <Separator />
            <SheetDescription className="flex flex-col gap-4">
                {isAuthenticated ? (
                <MobileNavLinks />
                ) : (
                    <Button onClick={() => loginWithRedirect()} className="flex-1 font-bold bg-orange-500">Log In</Button> /* flex-1 siginificar que ele vai ocupar todo espaço do componente pai */
                )}
                
            </SheetDescription>
        </SheetContent>
    </Sheet>
  )
}

export default MobileNav