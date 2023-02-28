import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { CalendarBlank, Clock } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import * as Styled from './styles'


const confirmFormSchema = z.object({
    name: z.string().min(3, { message: 'O nome precisa no mínimo 3 caracteres' }),
    email: z.string().email({ message: 'Digite um e-mail válido' }),
    observations: z.string().nullable(),
})

type confirmFormData = z.infer<typeof confirmFormSchema>

export function ConfirmStep() {

    function handleConfirmScheduling(data: confirmFormData) { }

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<confirmFormData>({
        resolver: zodResolver(confirmFormSchema)
    })


    return (
        <Styled.ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
            <Styled.FormHeader>
                <Text>
                    <CalendarBlank />
                    22 de Setembro de 2022
                </Text>
                <Text>
                    <Clock />
                    18:00h
                </Text>
            </Styled.FormHeader>

            <label>
                <Text size="sm">Nome completo</Text>
                <TextInput placeholder="Seu nome" {...register('name')} />
                {errors.name &&
                    <Styled.FormError size="sm">{errors.name.message}</Styled.FormError>
                }
            </label>

            <label>
                <Text size="sm">Endereço de e-mail</Text>
                <TextInput type="email" placeholder="johndoe@example.com" {...register('email')} />
                {errors.email && (
                    <Styled.FormError size="sm">{errors.email.message}</Styled.FormError>
                )}
            </label>

            <label>
                <Text size="sm">Observações</Text>
                <TextArea {...register('observations')} />
            </label>

            <Styled.FormActions>
                <Button type="button" variant="tertiary">
                    Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    Confirmar
                </Button>
            </Styled.FormActions>
        </Styled.ConfirmForm>
    )
}