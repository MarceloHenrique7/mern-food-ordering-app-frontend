

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFormContext } from "react-hook-form"

const DetailsSection = () => { // seção de detalhes no nosso form
    const { control } = useFormContext(); // usamos isso para pegar o control do Form pai, que e o form que vai estar englobando esse componente
  return (
    <div className="space-y-2">
        <div>
            <h2 className="text-2x1 font-bold">Details</h2> {/* titulo da seção */}
            <FormDescription> {/* usamos um FormDescription porque esse componente vai ser usado dentro do ManageRestaurantForm */}
                Enter the details about your restaurant
            </FormDescription>
        </div>
        <FormField 
        control={control} 
        name="restaurantName" 
        render={({ field })=>(
            <FormItem> {/* <FormItem>, <FormLabel>, <FormControl>: Estes são componentes de estilo e estruturação para organizar e estilizar o campo de formulário. */}
                <FormLabel>Name</FormLabel>
                <FormControl>
                    <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage /> 
            </FormItem>
        )}/>

        <div className="flex gap-4"> {/* temos essa div porque queremos que os campos dentro desta div fiquem em linha */}
            <FormField 
            control={control} 
            name="city" 
            render={({ field })=>( // recebemos um objeto field, Este objeto field contém várias propriedades e métodos que são fornecidos pelo React Hook Form para controlar o campo de formulário associado. As propriedades mais comuns incluem name, value, onChange, onBlur, entre outras.
                <FormItem className="flex-1"> {/* <FormItem>, <FormLabel>, <FormControl>: Estes são componentes de estilo e estruturação para organizar e estilizar o campo de formulário. */}
                    <FormLabel>City</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-white" />
                    </FormControl>
                    <FormMessage /> 
                </FormItem>
            )}/>

            <FormField 
            control={control} 
            name="country" 
            render={({ field })=>(
                <FormItem className="flex-1"> {/* <FormItem>, <FormLabel>, <FormControl>: Estes são componentes de estilo e estruturação para organizar e estilizar o campo de formulário. */}
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-white" />
                    </FormControl>
                    <FormMessage /> 
                </FormItem>
            )}/>
        </div>
        {/* daqui pra baixo os componentes para ficar em colunas */}
        <FormField 
            control={control} 
            name="deliveryPrice" 
            render={({ field })=>(
            <FormItem className="max-w-[25%]"> {/* max-w-[25%] falamos que o width desse itemForm vai ser de apenas 25% */}
                <FormLabel>Delivery Price ($)</FormLabel>
                <FormControl>
                    <Input {...field} className="bg-white" placeholder="1.50"/>
                </FormControl>
                <FormMessage /> 
            </FormItem>
        )}/>
        <FormField 
            control={control} 
            name="estimatedDeliveryTime" 
            render={({ field })=>(
            <FormItem className="max-w-[25%]"> {/* max-w-[25%] falamos que o width desse itemForm vai ser de apenas 25% */}
                <FormLabel>Estimated Delivery Time (minutes)</FormLabel>
                <FormControl>
                    <Input {...field} className="bg-white" placeholder="30"/>
                </FormControl>
                <FormMessage /> 
            </FormItem>
        )}/>
    </div>
  )
}



export default DetailsSection;