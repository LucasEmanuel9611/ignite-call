import { Button, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from "react-hook-form"
import { z } from 'zod'
import * as Styled from './styles'

const ClaimUsernameFormSchema = z.object({
    username: z
        .string()
        .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
        .regex(/^([a-z\\-]+)$/i, {
            message: 'O usuário pode ter apenas letras e hifens.',
        })
        .transform((username) => username.toLowerCase()),
    name: z
        .string()
        .min(3, { message: 'O nome precisa ter pelo menos 3 letras.' }),
})


type ClaimUsernameFormData = z.infer<typeof ClaimUsernameFormSchema>

export function ClaimUserNameForm() {
    const { register, handleSubmit } = useForm<ClaimUsernameFormData>()

    async function handleClaimUsername(data: ClaimUsernameFormData) {
        console.log(data)
    }

    return (
        <Styled.Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
            <TextInput size='sm' placeholder='seu-usuario' prefix="ignite.com/" />
            <Button size="sm" type="submit">
                Reservar
                <ArrowRight />
            </Button>
        </Styled.Form>
    )
}