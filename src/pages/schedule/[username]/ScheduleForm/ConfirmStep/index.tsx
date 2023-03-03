import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import dayjs from 'dayjs'
import { CalendarBlank, Clock } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import * as Styled from './styles'


const confirmFormSchema = z.object({
    name: z.string().min(3, { message: 'O nome precisa no mínimo 3 caracteres' }),
    email: z.string().email({ message: 'Digite um e-mail válido' }),
    observations: z.string().nullable(),
})

type ConfirmFormData = z.infer<typeof confirmFormSchema>

interface ConfirmStepProps {
    schedulingDate: Date
    onCancelConfirmation: () => void
}

export function ConfirmStep({
    schedulingDate,
    onCancelConfirmation,
}: ConfirmStepProps) {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ConfirmFormData>({
        resolver: zodResolver(confirmFormSchema)
    })

    function handleConfirmScheduling(data: ConfirmFormData) {
        console.log(data)
    }

    const describedDate = dayjs(schedulingDate).format('DD[ de ]MMMM[ de ]YYYY')
    const describedTime = dayjs(schedulingDate).format('HH:mm[h]')

    return (
        <Styled.ConfirmForm as="form" onSubmit={handleSubmit(handleConfirmScheduling)}>
            <Styled.FormHeader>
                <Text>
                    <CalendarBlank />
                    {describedDate}
                </Text>
                <Text>
                    <Clock />
                    {describedTime}
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
                <Button type="button" variant="tertiary" onClick={onCancelConfirmation}>
                    Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    Confirmar
                </Button>
            </Styled.FormActions>
        </Styled.ConfirmForm>
    )
}