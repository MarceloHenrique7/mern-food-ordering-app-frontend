import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Hero from "@/components/Hero"

type Props = {
    children: React.ReactNode /* tipagem do children */
    showHero?: boolean // essa propiedade vai servir para decidir se vamos mostrar o hero que e a imagem principal do site no layout, por exemplo se estivermos em uma pagina onde não queremos exibir o hero (imagem) então definimos como false essa propiedade aonde chamamos o layout
}

const Layout = ({ children, showHero = false }: Props) => { // aqui nos pegamos o children que e alguma coisa que vai estar dentro desse componente, depois pegamos o showHero que e true ou false, (mostrar a imagem ou não) inicialmente setamos como false
  return (
    <div className="flex flex-col min-h-screen">
        <Header /> {/* Header e o cabeçalho principal do site */}
        {showHero && <Hero /> } {/* se showHero for true então exiba, Hero e a imagem principal do site */}
        <div className="container mx-auto flex-1 py-10">{children}</div> {/* container mx-auto vai adicionar um espaço na esquerda e direita da pagina || py-10 para adicionar uns espaços em cima e embaixo || flex-1 ocupara todo espaço disponivel que sobrar dentro do container */}
        <Footer/> {/* Footer e o footer principal do site */}
    </div>
  )
}

export default Layout;
