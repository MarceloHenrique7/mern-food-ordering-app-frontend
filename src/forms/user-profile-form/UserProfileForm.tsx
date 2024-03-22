import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod"; // zodResolver do @hookform/resolvers/zod para utilizar a resolução de esquema Zod no React Hook Form.
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod" // Zod é uma primeira biblioteca de declaração e validação de esquema TypeScript. Estou usando o termo "esquema" para me referir amplamente a qualquer tipo de dados, de um stringobjeto aninhado simples a um complexo. link: https://www.npmjs.com/package/zod

const formSchema = z.object({ // aqui definimos um form schema
    email: z.string().optional(), // email e uma string e é opicional
    name: z.string().min(1, "name is required"), // name tem que ser uma string e tem que ter no minimo 1 caracter, se não tiver ele vai mostrar a mensagem passado como parâmetro no min()
    addressLine1: z.string().min(1, "Address Line 1 is required"), // address line 1 tem que ser uma string e tem que ter no minimo 1 caracter, se não tiver ele vai mostrar a mensagem passado como parâmetro no min()
    city: z.string().min(1, "city Line 1 is required"), // city tem que ser uma string e tem que ter no minimo 1 caracter, se não tiver ele vai mostrar a mensagem passado como parâmetro no min()
    country: z.string().min(1, "country Line 1 is required"), // country tem que ser uma string e tem que ter no minimo 1 caracter, se não tiver ele vai mostrar a mensagem passado como parâmetro no min()
})


export type UserFormData = z.infer<typeof formSchema>; // infer e uma funcionalidade que extrai o tipo de um schema zod, typeof formSchema: Isso retorna o tipo estático do schema 


type Props = {
    currentUser: User; // dizemos que teremos um currentUser que vai ser do tipo User que criamos em types.ts
    onSave: (userProfileData: UserFormData) => void; // onSave e uma função que aceita dados de perfil de usuário (UserFormData) e não retornamos nada (void)
    isLoading: boolean; // um booleano que indica se o componente está atualmente em um estado de carregamento. Isso pode ser usado para mostrar um indicador de carregamento ou desabilitar interações durante o carregamento. 
    title?: string; // temos um title (titulo) que e o titulo do nosso form
    buttonText?: string // temos um texto para o botão do formulario
}

const UserProfileForm = ({ onSave, isLoading, currentUser, title = "User Profile", buttonText="Submit" }: Props)  => { // aqui definimos uma função de componente do React que recebe as propiedades definidas acima no tipo Props, como argumentos 
    //  title = "User Profile", buttonText="Submit", aqui indicamos valores padrão para essas propiedades ou seja, caso a gente não receba esses parâmetro, esses são seus valores

    const form = useForm<UserFormData>({ // inicializamos um hook de formulario (form) usando o useForm. O tipo UserFormData está sendo passado como argumento para a função useForm. Isso significa que o hook de formulário (form) irá gerenciar o estado do formulário usando o tipo UserFormData para definir a forma dos dados do formulário. 
        resolver: zodResolver(formSchema), // basicamente mandamos nosso esquema para o zodResolver() que faz validação
        defaultValues: currentUser, // mandamos o valores padrão para nosso form dizendo que vai ser o currentUser que contem as propiedades do nosso usuario (name, email etc..)
    });

    useEffect(() => {  // se a nossa pagina atualizar ou esse componente atualizar, precisamos ter certeza que estamos recebendo o usuario atual e atualizado
        form.reset(currentUser); // fazemos um reset no form (passando nosso usuario atual)
    }, [currentUser, form])

    return ( // retornamos o formulario
        <Form {...form}> {/* aqui indicamos que isso vai ser um <Form> {...form} esse spread e uma forma de passarmos todas propiedades ou metodos que existem em form para nosso componente <Form>, quando passamos um spread estamos desetruturando o objeto e passando todas as suas propriedades e métodos como propriedades separadas. */}
            <form onSubmit={form.handleSubmit(onSave)} className="space-y-4 bg-gray-50 rounded-lg md:p-10"> {/* onSubmit vai ser chamada quando o form for enviado, form.handleSubmit(onSave) e atribuido, isso indica que vamos chamar a função onSave e ela vai lidar com a validação do formulario, form.handleSubmit é uma função fornecida pelo hook useForm que recebe uma função de callback para ser executada quando o formulário é submetido. */}
                <div>
                    <h2 className="text-2x1 font-bold">{title}</h2> {/* aqui temos um cabeçalho do form */}
                    <FormDescription> { /* usamos aqui FormDescription para indicar uma descrição abaixo do nosso cabeçalho*/ }
                        View and change your profile information here
                    </FormDescription>
                </div>
                <FormField 
                    control={form.control} 
                    name="email" 
                    render={({ field }) => ( // <FormField> e um componente que encapsula um campo de formulario, na propiedade control indicamos que o objeto de controle para esse campo vai vir de form.control o hook que vem do react, ele vai gerenciar as ações e estados dos campos, name= serve para indetificação do campo, render={({ field })  Esta é uma propriedade render que aceita uma função de renderização como argumento. Essa função recebe um objeto field que contém todas as propriedades necessárias para conectar o campo de entrada ao React Hook Form. Neste caso, a função renderizada está encapsulando o campo de entrada
                    <FormItem> {/* <FormItem>, <FormLabel>, <FormControl>: Estes são componentes de estilo e estruturação para organizar e estilizar o campo de formulário. */}
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                             {/* o spread ...field está sendo usado para passar todas as propiedades do objeto field que vem de render para o componente <Input> . Isso inclui propriedades como onChange, value, etc. disabled está desabilitando a entrada do usuário no campo */}
                            <Input {...field} disabled className="bg-white"/>
                        </FormControl>
                    </FormItem>
                )}/>

                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white"/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}/>

                {/* aqui separamos em uma div porque esses outros 3 campos vao ficar na mesma linha, quando a tela for maior que media */}
                <div className="flex flex-col md:flex-row gap-4">
                    <FormField control={form.control} name="addressLine1" render={({ field }) => (
                        <FormItem className="flex-1"> {/* flex-1 indica que esse campo vai preencher todo espaço restante */}
                            <FormLabel>Address Line 1</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white"/>
                            </FormControl>
                            <FormMessage /> {/* aqui vamos exibir a mensagem de erro que vem da validação de form */}
                        </FormItem>
                    )}/>

                    <FormField control={form.control} name="city" render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white"/>
                            </FormControl>
                            <FormMessage /> {/* aqui vamos exibir a mensagem de erro que vem da validação de form */}
                        </FormItem>
                    )}/>

                    <FormField control={form.control} name="country" render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white"/>
                            </FormControl>
                            <FormMessage /> {/* aqui vamos exibir a mensagem de erro que vem da validação de form */}
                        </FormItem>
                    )}/>
                </div>
                
                {isLoading ? (
                <LoadingButton/>
                ) : (
                <Button type="submit" className="bg-orange-500">{buttonText}</Button>
                )} {/* está carregando? então renderize meu botão de carregamento, senão renderize o meu botão de submit normal */}

            </form>
        </Form>
    )


}


export default UserProfileForm;
