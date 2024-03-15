import { FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cuisineList } from "@/config/restaurant-options-config";
import { useFormContext } from "react-hook-form";
import CuisineCheckbox from "./CuisineCheckbox";

const CuisinesSection = () => {

    const { control } = useFormContext(); // então tudo o que estamos fazendo aqui é obter a função de controle que nos ajuda a vincular nossos campos de formulário ao formulário

  return (
    <div className="space-y-2">
        <div>
            <h2 className="text-2x1 font-bold">Cuisines</h2> {/* titulo da seção */}
            <FormDescription> {/* usamos um FormDescription porque esse componente vai ser usado dentro do ManageRestaurantForm */}
                Select the cuisines that your restaurant serves
            </FormDescription>
        </div>
        <FormField 
            control={control}
            name="cuisines"
            render={({ field }) => ( // recebemos um objeto field, Este objeto field contém várias propriedades e métodos que são fornecidos pelo React Hook Form para controlar o campo de formulário associado. As propriedades mais comuns incluem name, value, onChange, onBlur, entre outras.
                <FormItem>
                    <div className="grid md:grid-cols-5 gap-1"> {/* essa div vai ser uma grid, para telas medias a grid vai mostrar 5 items por colunas, gap-1 espaçamento de 1 */}
                        {cuisineList.map((cuisineItem, index)=> (
                            <CuisineCheckbox key={index} cuisine={cuisineItem} field={field} />
                    ))}
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    </div>
  )
}


export default CuisinesSection;