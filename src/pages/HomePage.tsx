import landingImage from "../assets/landing.png"
import appDownloadImage from "../assets/appDownload.png"

const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
        <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
            <h1 className="text-5x1 font-bold tracking-tight text-orange-600">
                Tuck into a takway today
            </h1>   
             <span className="text-x1">Food is just a click away!</span>
        </div> {/* bg-white background branco || rounded-lg adicionar arredodamentos nas bordas || shadow-md adiciona sombra fora da div || py-8 adiciona um espaçamento interno na dic || -mt-16 adiciona uma margem negativa ao topo de 16*/}
        <div className="grid md:grid-cols-2 gap-5"> {/* isso tudo vai criar um css grid || md:grid-cols-2 dizemos que para telas media teremos duas colunas*/}
            <img src={landingImage}/>
            <div className="flex flex-col items-center justify-center gap-4 text-center">
                <span className="font-bold text-3x1 tracking-tighter"> {/* tracking-tighter adiciona espaço entre as letras */}
                    Order takeaway even faster!
                </span> 
                <span>
                    Donwload the MernEats App for faster ordering and personalised recommendations
                </span>
                <img src={appDownloadImage} />
            </div>
        </div>  
    </div> /* adicionando um flex box na pagina || flex-col todos os elementos estejam em coluna || gap-12 adicionar um gap (espaço) entre os elementos */
  )
}

export default HomePage;
