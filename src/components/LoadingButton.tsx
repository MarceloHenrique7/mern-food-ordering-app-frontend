import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";


const LoadingButton = () => {
  return (
    <Button disabled> {/* disabled está desabilitando o botão */}
        <Loader2 className="mr-2 h-4 animate-spin"/> {/*margin de 2, height de 4, e animação de girar*/}
        Loading {/* texto que vai aparecer embaixo do loader */}
    </Button>
  )
}

export default LoadingButton;