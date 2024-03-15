// isso e um componente que vai renderizar apenas um checkbox um input de checkbox
// que vai ser usado em cuisineSection para renderizar um Item

import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
    cuisine: string;
    field: ControllerRenderProps<FieldValues, "cuisines"> // field e uma propiedade que deve ser do tipo ControllerRenderProps, FieldValues é um tipo genérico que representa os valores dos campos do formulário. O segundo argumento cuisines é uma chave que indica qual campo do formulário está sendo controlado
}

const CuisineCheckbox = ({ cuisine, field }: Props) => { // aqui recebemos cuisine que poderia ser por exemplo "pizza", e o field
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
        <FormControl>
            <Checkbox 
            
            className="bg-white" 
            checked={field.value.includes(cuisine)}  /* {field.value.includes(cuisine) um exemplo: o meu field.value pode ser field.value = ["pizza", "pasta"] e o cuisine = "pizza" então verificamos se nesse array que vem em field.values inclui a palavra atribuida a cuisine */
            onCheckedChange={(checked)=> { // quando o checked e alterado chamamos esse onCheckedChange, e pegamos o estado do checked como parametro "checked" nos retorna true ou false
                    if (checked) { // if checked for igual a true 
                        field.onChange([...field.value, cuisine]) // pegamos todos itens que já existem em field.value e adicionamos o valor de cuisine que recebemos
                    } else {
                        field.onChange(field.value.filter((value: String) => value !== cuisine)) // se não nos apenas fazemos um filter no nosso array field.value, retornando todos items que ja existem dentro dele menos o valor de cuisine
                    }
                }}
            />
        </FormControl>
        <FormLabel className="text-sm font-normal"> {/* text-sm significa um texto pequeno (small), font-normal: Isso define o peso da fonte como "normal", ou seja, sem negrito */}
            {cuisine} { /* exibimos ao lado do checkbox o texto cuisine*/}
        </FormLabel>
    </FormItem>
  )
}

export default CuisineCheckbox;