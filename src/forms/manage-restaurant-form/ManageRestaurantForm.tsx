import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import DetailsSection from "./DetailsSection";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Restaurant } from "@/types";
import { useEffect } from "react";


const formSchema = z.object({ // criando um schema de validação para restaurante
    restaurantName: z.string({
        required_error: "restaurant name is required",
    }),
    city: z.string({
        required_error: "city is required", // para o erro do campo ser obrigatorio teremos essa mensagem, ou seja o usuario tentou enviar um campo vazio
    }),
    country: z.string({
        required_error: "country is required",
    }),
    deliveryPrice: z.coerce.number({ // z.coerce.number coerce converte um tipo de string para number
        required_error: "delivery price is required",
        invalid_type_error: "must be a valid number" // aqui e a mensagem para caso usuario digite um tipo de dados diferente de number
    }),

    estimatedDeliveryTime: z.coerce.number({ // z.coerce.number coerce converte um tipo de string para number
        required_error: "estimated delivery time is required",
        invalid_type_error: "must be a valid number" // aqui e a mensagem para caso usuario digite um tipo de dados diferente de number
    }),
    cuisines: z.array(z.string()).nonempty({ // tem que ser um array e não pode ser vazio
        message: "please select at least one item",
    }),

    menuItems: z.array(z.object({ // aqui dizemos que te que ser um array, e para cada objeto dentro dele faremos a verificação nas seguintes propiedades
        name: z.string().min(1, "name is required"), // name e uma string e o min de caracteres e 1
        price: z.coerce.number().min(1, "price is required"), // price e um number e o min de caracteres e 1
    })),
    
    imageUrl: z.string().optional(), // dizemos que este campo e uma string e é opcional 

    imageFile: z.instanceof(File, { message: "image is required" }).optional() // esse campo tem que ser uma instancia de File (arquivo, e ele é opcional
}).refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"]

    /* 
    O refine() é usado para aplicar uma validação personalizada
    a um esquema. Ele recebe uma função de validação como primeiro
    argumento e um objeto de configuração como segundo argumento
    
    (data) referência todo schema em si, 
    (data) => data.imageUrl || data.imageFile que verifica
    se ou o campo imageUrl ou o campo imageFile estão presentes.
    Se um deles estiver presente, a validação passa, caso contrário,
    falhará.

    Se a validação falhar, a mensagem de erro definida no objeto de
    configuração será retornada. Neste caso, a mensagem é
    "Either image URL or image File must be provided".

    O campo path no objeto de configuração indica o caminho para o
    campo ao qual a mensagem de erro se refere. Neste caso, a mensagem
    será associada ao campo imageFile.
    */ 
})

type RestaurantFormData = z.infer<typeof formSchema>

type Props = {
    restaurant?: Restaurant // dizemos que restaurant tem que ser do tipo Restaurant que criamos em types.ts "?" indica que essa propiedade e opcional
    onSave: (restaurantFormData: FormData) => void; // onSave e uma função que aceita dados de um formulario (FormData) e não retornamos nada (void)
    isLoading: boolean; // um booleano que indica se o componente está atualmente em um estado de carregamento. Isso pode ser usado para mostrar um indicador de carregamento ou desabilitar interações durante o carregamento. 
}
 
const ManageRestaurantForm = ({ onSave, isLoading, restaurant }: Props) => { // essa função recebe como parâmetro uma função onSave() que manipular um registro ou cria e etc. tambem uma propiedade que diz se o processo de criação do restaurante está em andamento, e restaurant para popularmos (preencher) nossos campos do form automaticamente 
    const form = useForm<RestaurantFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cuisines: [], // passamos valores padrão para esses campos
            menuItems: [{name: "", price: 0}], // aqui temos valores padrão para esse campo
        },
    });

    useEffect(() => {
        if(!restaurant) { // se não tivermos restaurant apenas damos um retorno e nada acontece
            return;
        }

        const deliveryPriceFormated = parseInt( 
            (restaurant.deliveryPrice / 100).toFixed(2)
        )

        /* convertemos o delivery price que vem no formato de centavos ex: 250
            para um inteiro, toFixed arredonda o numero para duas casas decimais após
            a virgula então 250 seria 2,50 porque dividimos 250 por 100, então arredondando
            com toFixed ficaria 2, depois convertemos para Int
        */

        const menuItemsFormated = restaurant.menuItems.map((item)=>({ // fazemos um map pelo array de MenuItems e para cada item fazemos isso
            ...item, // mantemos tudo que ja existe em cada item
            price: parseInt((item.price / 100).toFixed(2)) // mas aqui convertemos para int apenas o price de cada item de array
        })) // essa função já retorna por si propio o array atualizado, porque passamos desse jeito: (item) => ({}), isso ja faz ela retornar o valor para a variavel const menuItemsFormated

        const updatedRestaurant = { // atualizamos os dados do restaurante com esses valor acima covertido para INT
            ...restaurant, // copiamos tudo que já existe de dados em restaurante
            deliveryPrice: deliveryPriceFormated, // porem esse campo atribuimos o nosso novo valor formatado
            menuItems: menuItemsFormated, // aqui a mesma coisa
        }  

        form.reset(updatedRestaurant) // resetamos o nosso formulario e enviamos nosso restautante atualizado!
    }, [form, restaurant]); // [form, restaurant], é um array de dependências. Isso significa que o useEffect será reexecutado sempre que uma das variáveis contidas nesse array for modificada. Se nenhum array de dependência for fornecido, o efeito será executado após cada renderização.

    const onSubmit = (formDataJson: RestaurantFormData) => { // essa função vai lidar com submit, e aceita dados do tipo restaurantFormData
        // vamos converter os dados recebidos como json em FormData object, porque no nosso backend nos estamos aceitando esse tipo de dados
        const formData = new FormData() // criamos um formData aqui 
        console.log("estamos em submit")
        /* Os dados enviados usando o objeto FormData são 
        armazenados de forma semelhante aos dados de um formulário HTML.
        Eles são formatados como pares chave-valor, onde cada campo do
        formulário é uma chave e o valor associado é o conteúdo desse campo.
        */

        formData.append("restaurantName", formDataJson.restaurantName)
        formData.append("city", formDataJson.city)
        formData.append("country", formDataJson.country)

        // 1 real = 100 centavos
        // 1.50 real = 150 centavos
        formData.append(
            "deliveryPrice", 
            (formDataJson.deliveryPrice * 100).toString() // aqui vamos multiplicar o valor recebido por 100, para tranformalo em centavos, depois tranformamos para string
        );
        
        formData.append(
            "estimatedDeliveryTime",
            formDataJson.estimatedDeliveryTime.toString()
        ); // tranformamos para string o campo
        

        // cuisine e um array temos que lidar com cada item do array separado
        formDataJson.cuisines.forEach((cuisine, index) => { // fazemos um forEach pelo array cuisines e pegamos cada item (cuisine) e o (index) desse item no array
            formData.append(`cuisines[${index}]`, cuisine)
            /*
            Exemplo de como ficaria esses dados
                cuisines[0]: "Italiana", no array cuisine na posição 0 temos esse valor
                cuisines[1]: "Japonesa"
                cuisines[2]: "Mexicana"
            */
        })

        // menuItems e um array temos que lidar com cada item do array separado
        // em cada item do array temos a chave name com valor e a chave price com valor
        formDataJson.menuItems.forEach((menuItem, index) => {
            formData.append(`menuItems[${index}][name]`, menuItem.name) // no nosso array menuItems na posição (index) e na chave ([name]) adicione o valor menuItem.name
            formData.append(`menuItems[${index}][price]`, (menuItem.price * 100).toString()) // // no nosso array menuItems na posição (index) e na chave ([price]) adicione o valor menuItem.price, (menuItem.price * 100) convertemos para centavos e tranformamos para string
            /*
            Exemplo de como ficaria esses dados
                menuItems[0][name]: "Hamburguer", no array menuItems na posição 0 e na chave name temos esse valor
                menuItems[0][price]: "12", no array menuItems na posição 0 e na chave pricetemos esse valor
                menuItems[1][name]: "Coxinha"
                menuItems[1][price]: "12"
            */
        });

        if (formDataJson.imageFile) { // existe esse campo no nosso formDataJson?
            formData.append(`imageFile`, formDataJson.imageFile) // adicionamos ao formData o campo de Arquivo
        }

        onSave(formData) // chamamos o onSave para salvar os dados agora em formato de formData
    }

  return (
    <Form {...form}> {/* passamos todas propiedades, metodos e funções do form para esse Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-50 p-10 rounded-lg"> {/* falamos que vamos chamar a função onSubmit quando for for enviado */}
            <DetailsSection /> {/* incorporamos a seção de detalhes */}
            <Separator /> {/* adicionamos um separador (linha) para separar as seções */}
            <CuisinesSection /> {/* seção de opções de cozinhas do restaurante */}
            <Separator /> 
            <MenuSection /> {/* seção para adicionarmos items no menu */}
            <Separator />
            <ImageSection /> {/* seção onde adicionamos imagem do restaurante */}


            {
            /*
            aqui primeiramente será exibido o componente de Button, mas quando o usuario clicar
            no Button iremos salvar o formulario e enquanto esse formulario estiver sendo salvo a
            propiedade de isLoading vai ficar true então se estiver carregando o salvamento exibimos
            um LoadingButton, componente de um botão carregando, para mostrar que os dados estão sendo
            processados
            */
            }
        </form> 

    </Form>
  )
}


export default ManageRestaurantForm;
