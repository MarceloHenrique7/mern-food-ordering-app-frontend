
const Footer = () => {
  return (
    <div className="bg-orange-500 py-10">
        <div className="container max-auto flex flex-col md:flex-row justify-between items-center"> {/* container e max-auto garante que o footer vai esta alinhado com toda pagina ||  md:flex-row para telas medias será um flex de row */}
            <span className="text-3x1 text-white font-bold tracking-tight">
                MernEats.com
            </span>
            <span className="text-white font-bold tracking-tight flex gap-4">
                <span>Privacy Policy</span>
                <span>Terms of Services</span>
            </span>
        </div>
    </div>
  )
}

export default Footer