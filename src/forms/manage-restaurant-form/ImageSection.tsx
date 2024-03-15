import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
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

        
        <div className="flex flex-col gap-8 md:w-[50%]"> {/* vamos ter os items em colunas nessa div com um gap de 8 (espaçamento) e um width de 50% para telas medias*/}
            {existingImageUrl && (
                <AspectRatio ratio={16/9}> {/* esse componente vai servir para exibirmos a imagem do restaurante no formulario, caso tenha, ratio significa a proporção da imagem*/}
                    <img src={existingImageUrl} className="rounded-md object-cover h-full w-full"/> 
                    {/* então se a imagem existir exibimos ela aqui, essa imagem estar armazenada em cloudinary, que armazenamos ela pelo backend */}
                    {/* 
                        classes:
                            rounded-md - arredondamos as bordas da imagem
                            object-cover - garantimos que a imagem cobrirar todo container do AspectRatio
                            h-full: Esta classe define a altura do elemento como 100% do seu contêiner pai.
                            w-full: Esta classe define a largura do elemento como 100% do seu contêiner pai.
                    */}
                </AspectRatio>
            )}
            <FormField 
            control={control} 
            name="imageFile" 
            render={({ field }) => (
                <FormItem> {/* abrimos a tag para dizer que vamos ter um item, apenas por questão de organização */}
                    {/* abrimos a tag para dizer que vamos ter um control, apenas por questão de organização */}
                    <FormControl> 
                        {/* aqui temos um componente de input que e do tipo file, ou seja apenas arquivos serão enviados aqui, e nos aceitamos apenas esses 3 formatos de imagem, jpg, jpeg, png */}
                        <Input
                            className="bg-white" 
                            type="file" 
                            accept=".jpg, .jpeg, .png"
                            onChange={(event)=> field.onChange(
                                event.target.files ? event.target.files[0] : null
                             )
                            }
                           /> {/* onChange: quando o usuario seleciona uma arquivo essa função e chamada,  e então pegamos o evento que ocorreu (event) e nesse evento ele possui uma lista de arquivos (event.target.files) aqui se localiza essa lista, então nos alteramos o onChange do campo (field.onChange) e atribuimos ao onChange o arquivo, (event.target.files ? event.target.files[0] : null) se a lista que veio do event tiver algum arquivo dentro então atribuimos esse arquivo ao onChange no field (campo) se não tiver arquivo nessa lista então atribuimos null*/}
                    </FormControl>
                    <FormMessage /> {/* aqui colocamos um componente de mesagem para captar e mostrar aqui os erros caso tenha, ex: o usuario selecionou um arquivo maior de 5mb ou deixou esse campo vazio */}
                </FormItem>
            )}
            
            />
        </div>
    </div>
  )
}


export default ImageSection;