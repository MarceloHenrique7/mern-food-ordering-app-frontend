import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod'
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';


const formSchema = z.object({ // criamos um schema de validação para a nossa searchQuery
    searchQuery: z.string({ // aqui definimos que searchQuery e do tipo string
        required_error: "Restaurant name is required" // caso esse campo seja vazio retornamos um erro que required_error com essa mensagem, isso significa que o user não digitou nada no campo
    }),
})


export type SearchForm = z.infer<typeof formSchema> // aqui usamos z.infer para extrair o tipo do nosso schema de validação formSchema então <typeof formSchema> pegamos o tipo do schema e passamos para SearchForm

type Props = {
    onSubmit: (formData: SearchForm)=> void; // declaramos que onSubmit será uma função que recebe como parâmetro um formData: que e do tipo SearchForm é não retorna nada
    placeHolder: string; // declaramos que esse tipo também recebe um placeHolder que e do tipo string
    onReset?: () => void; // declaramos que onReset não é obrigatorio nesse tipo "?", e onReset é uma função que não retorna nada
    searchQuery?: string; // recebemos nesse tipo um searchQuery que e opcional
}



// criamos o nosso componente de searchBar (barra de pesquisa) onde o usuário vai poder fazer sua pesquisa
const SearchBar = ({ onSubmit, placeHolder, onReset, searchQuery }: Props) => { // desestruturamos do tipo Props suas propiedades definidas, é agora recebemos cada propiedade desse tipo Props, dentro dessa função
    
    const form = useForm<SearchForm>({

        resolver: zodResolver(formSchema),
        defaultValues: {
            searchQuery // definimos um valor padrão para esse campo searchQuery
        }
        /* 
        const form = useForm<SearchForm>({...}) é usado para criar um controle
        de formulário React Hook Form para o componente atual (searchBar), configurando-o
        para validar os dados do formulário com base no schema de validação
        Zod formSchema e inicializando os valores padrão do formulário.
        */
    })
    
    
    const handleReset = () => { // essa função serve para resetarmos o formulario
        form.reset({
            searchQuery: "" 
            /* 
            chamamos o form.reset() e passamos o campo que queremos resetar
            ou seja se o user chamou essa função o texto que ele tinha digitado no campo
            searchQuery será apagado
            */
        })

        if(onReset) { 
            // aqui nos verificamos se essa função foi passada para esse componente,
            // se sim nos executamos ela
            onReset();
        }
    }
  
    return (
    <Form {...form}>
        {/* 
            ultilizamos <Form> para indicar que isso daqui e um formulario

            ...form está espalhando todos os atributos e métodos do objeto
            form fornecido pelo React Hook Form como props para o componente
            <Form>. Isso inclui propriedades e métodos como handleSubmit,
            register, control, etc
        */}
        <form onSubmit={form.handleSubmit(onSubmit)} className={`flex items-center flex-1 gap-3 justify-between flex-row border-2 rounded-full p-3 mx-5 ${form.formState.errors.searchQuery && "border-red-500"}`}>
            {/*
                onSubmit e oque vai ser chama ao esse formulario ser enviado,

                form.handleSubmit e a propiedade do nosso objeto form que lida
                com o envio do formulario e valida e esse envio é valido.

                se for valido esse envio nos chamamo o onSubmit que recebemos como
                parâmetro.

                className="flex items-center flex-1 gap-3 justify-between flex-row border-2 rounded-full p-3 mx-5"

                flex: Define um contêiner flexível. Os elementos filhos desse contêiner flexível podem ser organizados
                em uma única linha ou em várias linhas.

                items-center: Alinha os itens ao longo do eixo transversal (cross-axis) do contêiner flexível, o que normalmente
                é verticalmente no contexto de um layout em linha (row).

                flex-1: Define que o elemento deve ocupar todo o espaço disponível no contêiner flexível ao longo do eixo principal
                (main-axis). Isso geralmente é usado para fazer com que um elemento preencha todo o espaço restante dentro do
                contêiner flexível.

                gap-3: Define o espaçamento entre os filhos diretos do contêiner flexível. Neste caso, o espaçamento é de 3 unidades
                (provavelmente em pixels ou outra unidade de medida).

                justify-between: Distribui os itens ao longo do eixo principal (main-axis) do contêiner flexível

                flex-row: Define a direção do fluxo de layout do contêiner flexível como linha, ou seja, os itens são organizados
                horizontalmente dentro do contêiner.

                border-2: Adiciona uma borda ao elemento com uma largura de 2 unidades (provavelmente em pixels ou outra unidade de medida).

                rounded-full: Arredonda os cantos do elemento, dando uma aparência circular ou oval.

                p-3: Define o preenchimento (padding) do elemento. Neste caso, o preenchimento é de 3 unidades em todas as direções (topo, direita, baixo e esquerda).

                mx-5: Define a margem horizontal (margin) do elemento. Neste caso, a margem é de 5 unidades em ambas as direções (esquerda e direita).


                ${form.formState.errors.searchQuery && "border-red-500"}: aqui basicamente dizemos:

                se o nosso campo "searchQuery" tiver erros, nos aplicamos mais uma classe no estilo da borda
                para dar a impressão de erro deixando a borda vermelha ao usuário digitar algo errado
            */}
            <Search strokeWidth={2.5} size={30} className="ml-1 text-orange-500 hidden md:block"/> {/* Search e um icone de pesquisa, strokeWidth controlamos a largura da linha do icone, size={30} definimos seu tamanho, em className: ml-1 damos uma margin left de 1 no icone, e adicionamos uma cor laranja a ele, hidden: escondemos o icone para telas menores, md:block tornamos o display block e mostramos o icone em telas medias */}
            <FormField  
                control={form.control} 
                name="searchQuery" 
                render={({ field }) => 
                <FormItem className="flex-1">
                    <FormControl>
                        <Input {...field} className="border-none shadow-none text-x1 focus-visible:ring-0" placeholder={placeHolder}/>
                    </FormControl>
                </FormItem>}
            />
            {/* 
                <FormField para dizer que vamos renderizar um campo de formulario

                control={form.control}, dizemos que camos usar o control do nosso objeto form para esse campo

                name="searchQuery" damos o nome do nosso campo

                render={({ field }) => ...}: 

                Dentro do componente <FormField>, estamos passando uma propriedade chamada render. Esta propriedade
                recebe uma função de renderização como valor. Esta função de renderização tem um parâmetro chamado field.

                A desestruturação {({ field }) => ...} está extraindo o valor de field do objeto passado para a função de renderização.
                Esse objeto deve ser fornecido pelo componente <FormField>, que, por sua vez, provavelmente o recebe do React Hook Form.

                Portanto, em essência, field está vindo do React Hook Form por meio do componente <FormField>. Ele contém as propriedades
                e métodos necessários para controlar o campo de formulário e integrá-lo ao React Hook Form.

                <Input {...field} ...>: Aqui, estamos renderizando o campo de entrada do formulário. <Input> é um componente de entrada
                (input) e ...field está espalhando todas as props fornecidas por field para o componente <Input>. Isso inclui props como
                value, onChange, onBlur, etc. Estas props são necessárias para controlar o estado do campo de formulário e interagir com
                o React Hook Form.

                className="border-none shadow-none text-x1 focus-visible:ring-0"
                
                border-none: removemos a borda do elemento
                
                shadow-none: removemos a sombra do elemento 
                
                text-x1: definimos o tamanho do texto para x1

                focus-visible:ring-0: focus-visible:ring-0: Esta é uma regra de pseudo-classe que é aplicada
                quando o elemento recebe foco visível (ou seja, quando o usuário o seleciona com o teclado).
                ring-0 remove qualquer anel (ring) que possa ser aplicado ao elemento quando está em foco.
                Isso é útil para evitar estilos de foco indesejados, como anéis de destaque, em determinadas 
                situações de design.
            */}
            
            {/* 
                O formState é um objeto fornecido pelo React Hook Form que contém informações sobre o estado atual do formulário.
                isDirty é uma propriedade desse objeto que indica se o formulário foi modificado pelo usuário.

                Se form.formState.isDirty for verdadeiro (ou seja, se o formulário foi modificado), o botão "Clear" será renderizado.

                Se form.formState.isDirty for falso (ou seja, se o formulário não foi modificado), o botão "Clear" não será renderizado.

            */}
            <Button 
                onClick={handleReset}
                type="button"
                variant="outline" 
                className="rounded-full"
            >Clear</Button>
            {/* 
                renderizamos um botão de Clear que vai aparecer após o usuario digitar algo
                ele vai ser util caso o usuario digite algo muito na searchBar grande tipo:
                    "restaurant in lodon with pasta"
                inves dele apagar pelo teclado ele clica nesse botão
                
                onClick={handleReset} quando clicado chamamos a função para resetar (apagar) o conteudo do campo de input

                variant = outline, adicionamos uma borda ao botão praticamente,
                classname = rounded-full, arredonda as bordas
            */}
            <Button type="submit" className='rounded-full bg-orange-500'>
                Search
            </Button>
            {/*
                esse button Search irá aparecer toda hora, porque ele é o botão que vai fazer a busca para o usuário
                'rounded-full bg-orange-500': significa que adicionaremos uma borda e ele tera um fundo laranja
            */}
        </form>
    </Form>
  )
}


export default SearchBar;
