import { Button } from "@/components/ui/button";
import { FormDescription, FormField, FormItem } from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import MenuItemInput from "./MenuItemInput";

const MenuSection = () => {

    const { control } = useFormContext(); // então tudo o que estamos fazendo aqui é obter a função de controle que nos ajuda a vincular nossos campos de formulário ao formulário

    const { fields, append, remove } = useFieldArray({ // useFieldArray fornecido pelo React Hook Form para lidar com campos de array em um formulário, extraimos essas proiedades desse useFieldArray, fields: Esta propriedade contém um array de objetos que representam os campos do formulário. Cada objeto contém informações sobre o campo, append: Esta é uma função que permite adicionar um novo campo ao array de campos. Ela é útil para adicionar novos itens a um formulário dinamicamente. remove: Esta é uma função que permite remover um campo do array de campos. Ela é útil para remover itens de um formulário dinamicamente.
        control, // referenciamos o control do nosso formulario
        name: "menuItems", // este e o nome do nosso campo de array que estamos manipulando com o useFieldArray
    })

  return (

    // usamos tudo isso dentro de um <Form> que engloba tudo isso

    <div className="space-y-2">
        <div>
            <h2 className="text-2x1 font-bold">Menu</h2>
            <FormDescription>
                Create your menu and give each item a name and a price
            </FormDescription>
        </div>
        <FormField control={control} name="menuItems" render={() => (
            <FormItem className="flex flex-col gap-2">
                {fields.map((_, index) => ( // em fields fazemos um map por ele, e pegamos "_" que e o valor do item no array mas não usaremos ele, e pegamos o seu index no array 
                    <MenuItemInput
                     key={index} 
                     index={index} // passamos o index do nosso objeto no array de campos
                     removeMenuItem={() => remove(index) }  // passamos a função de remove do useFieldArray para usarmos no nosso botão de remover dentro do menuItemInput
                    />
                ))}
            </FormItem>
        )} />
        <Button type="button" onClick={() => append({ name: "", price: "" })}> {/* criamos um botão que quando clicado chamamos a função q adiciona nosso campo (objeto) no array de campos */}
            Add Menu Item
        </Button>
    </div>
  )
}

export default MenuSection;