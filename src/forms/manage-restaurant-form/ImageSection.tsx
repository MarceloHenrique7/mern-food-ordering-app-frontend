import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";




const ImageSection = () => {
    const { control, watch } = useFormContext(); // então tudo o que estamos fazendo aqui é obter a função de controle que nos ajuda a vincular nossos campos de formulário ao formulário
    
    const existingImageUrl = watch("imageUrl"); // basicamente estamos monitorando esse campo imageUrl que criamos no nosso banco de dados no backend



    /* 
    watch: Este é um método fornecido pela biblioteca react-hook-form
    que é usado para observar mudanças em campos específicos do formulário.
    Ele aceita o nome do campo como argumento e retorna o valor atual do campo.
    */
    
  return (
    <div className="space-y-2"> {/* adiciona um espaço entre os items de 2 */}
        <div>
            <h2 className="text-2x1 font-bold">Image</h2> {/* text-2x1 Este texto será 2 vezes maior que o texto padrão. */}
            <FormDescription> {/* adicionamos um FormDescription porque esse componente vai ser usado dentro de um outro Form */}
                Add an image that will be displayed on your restaurant listing in the search results. Adding a new image will overwrite the existing one
            </FormDescription>
        </div>

        
        <div className="flex flex-col gap-8 md:w-[50%]">
        {existingImageUrl && (
          <AspectRatio ratio={16 / 9}>
            <img
              src={existingImageUrl}
              className="rounded-md object-cover h-full w-full"
            />
          </AspectRatio>
        )}
        <FormField
          control={control}
          name="imageFile"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="bg-white"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(event) =>
                    field.onChange(
                      event.target.files ? event.target.files[0] : null
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}


export default ImageSection;