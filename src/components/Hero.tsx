import hero from "../assets/hero.png"

const Hero = () => {
  return (
    <div>
        <img src={hero} className="w-full max-h-[600px] object-cover"/> {/* w-full para ocupar toda largura do container || max-h-[600px] especifica altura maxima || object-cover siginifica que ele vai cobrir toda sua proporção para que a imagem nao fique distorcida */}
    </div>
  )
}


export default Hero;