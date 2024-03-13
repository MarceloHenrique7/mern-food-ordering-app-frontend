import { Link } from "react-router-dom"
import MobileNav from "./MobileNav"
import MainNav from "./MainNav"

const Header = () => {
  return (
    <div className="border-b-2 border-b-orange-500 py-6">
        <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-3x1 font-bold tracking-tight text-orange-500">
                MernEats.com
            </Link> {/* tracking-tight move apenas as letras para ficarem mais proximas */}
            <div className="md:hidden"> {/* md:hidden faz com que essa div so vai ser mostrada a partir de tela menores, para telas medias ou superior, ficara oculta o conteudo dessa div */}
                <MobileNav />
            </div>
            <div className="hidden md:block"> {/* inicialmente começa "hidden" e para telas medias ele ficara visivel "md:block" */}
                <MainNav>
                    
                </MainNav>
            </div>
        </div> {/* justify-between items-center diz que vamos usar o flex-box para posicionar os children direto de dentro dessa div */}
    </div> /* py-6 vai adicionar um preenchimento na parte superior e inferior do header || border-b-2 border-b-orange-500 styles para bordas do header*/
  )
}


export default Header