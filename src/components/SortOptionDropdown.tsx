

// esse componente vai ser o nosso filtro dos restaurants

import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

/*
  Um exemplo da funcionalidade desse componente:

    poderemos filtrar por tempo de entrega
    poderemos filtrar por melhores restaurantes
    poderemos filtrar por preço do delivery


*/
type Props = {
    onChange: (value: string) => void; // definimos no tipo um onChange para manipular o valor
    sortOption: string; // esse tipo também tem a opção de ordenação
}

const SORT_OPTIONS = [
    // aqui o label é oque o usuário vai ver, e poder selecionar
    // então o valor é o que será enviado para o back-end, como um parâmetro
    {
      label: "Best match", 
      value: "bestMatch"
    },
    {
      label: "Delivery Price",
      value: "deliveryPrice" // isso corresponde com mesmo nome do campo no model do restaurante no backend
    },
    {
      label: "Estimated delivery time",
      value: "estimatedDeliveryTime" // isso corresponde com mesmo nome do campo no model do restaurante no backend
    }
]

const SortOptionDropDown = ({ onChange, sortOption }: Props) => {
  
  const selectedSortLabel = SORT_OPTIONS.find((option)=> option.value === sortOption)?.label || SORT_OPTIONS[0].label
  /*
    A intenção dessa linha:
    const selectedSortLabel = SORT_OPTIONS.find((option)=> option.value === sortOption)?.label || SORT_OPTIONS[0].label
    e conseguir garantir que estamos usando o valor da propieade label para mostrar como uma opção para o usuário e não está usando o valor da propiedade "value"

    Option" representa cada objeto dentro SORT_OPTIONS
    procuramos dentro desse array SORT_OPTIONS onde o option.value for igual a sortOption que estamos recebendo,
    se encontrarmos verificamos se "?" tem uma propiedade "label" (?.label) ou "||" nos pegamos o primeiro objeto do array e pegamos a sua propiedade label
  */
  
  return (
    <DropdownMenu> {/* Criamos nosso DropDownMenu */}
        <DropdownMenuTrigger className="cursor-pointer"> {/* adidionamos o Um DropdownMenuTrigger do componente Dropdown */}
              <Button variant="outline" className="w-full">
                Sort By: {selectedSortLabel} {/* aqui vai mostrar a opção atual que o usuario ordenou */}
              </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent> {/* aqui vem o conteudo após o usuário clicar no trigger esse conteudo do Drop down aparece */}
              {SORT_OPTIONS.map((option)=> ( // fazmos um forEach pelo array de opções
                  <DropdownMenuItem className="cursor-pointer" onClick={() => onChange(option.value)}>
                    {/*
                       onClick={() => onChange(option.value)}
                       quando esse "DropdownMenuItem" for clicado
                       passamos o valor da option atual para essa função onChange

                    */}
                      {option.label} {/* exibimos o label (texto) da opção aqui */}
                  </DropdownMenuItem>
              ))}
        </DropdownMenuContent>
    </DropdownMenu>
  )
}


export default SortOptionDropDown;