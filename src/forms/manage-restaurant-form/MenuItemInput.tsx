import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

type Props = { // criamos um tipo para o  MenuItemInput
    index: number; // pegamos o index do item no array
    removeMenuItem: () => void; // isso e uma função que remove um campo e não retorna nada
}

const MenuItemInput = ({ index, removeMenuItem }: Props) => { // recebemos aqui o index que este campo esta no array e uma função para remover esse campo
    const { control } = useFormContext();  // então tudo o que estamos fazendo aqui é obter a função de controle que nos ajuda a vincular nossos campos de formulário ao formulário

    return (
        <div className="flex flex-row items-end gap-2">
            <FormField 
            control={control} // pasamos o control
            name={`menuItems.${index}.name`}  // falamos que o name vai ser por exemplo : "menuItems.1.name"
            render={({field}) => ( // recebemos um objeto field, Este objeto field contém várias propriedades e métodos que são fornecidos pelo React Hook Form para controlar o campo de formulário associado. As propriedades mais comuns incluem name, value, onChange, onBlur, entre outras.
                <FormItem>
                    <FormLabel className="flex items-center gap-1">
                        Name <FormMessage />
                    </FormLabel>
                    <FormControl>
                        <Input {...field} placeholder="Cheese pizza" className="bg-white"/>
                    </FormControl>
                </FormItem>
            )}/>
            <FormField 
            control={control} 
            name={`menuItems.${index}.price`} // falamos que o name vai ser por exemplo : "menuItems.1.price"
            render={({field}) => (
                <FormItem>
                    <FormLabel className="flex items-center gap-1">
                        Price ($) <FormMessage />
                    </FormLabel>
                    <FormControl>
                        <Input {...field} placeholder="8.00" className="bg-white"/>
                    </FormControl>
                </FormItem>
            )}/>
            <Button type="button" onClick={removeMenuItem} className="bg-red-500 max-h-fit"> {/* "fit" pode implicar que a altura máxima deve se ajustar ao conteúdo interno do elemento. */}
                Remove 
            </Button> {/* quando clicarmos aqui chamamos a função de remover campo que recebemos como parâmetro, e removemos esse campo do array */}
        </div>
    )
}

export default MenuItemInput