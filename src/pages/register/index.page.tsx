import * as Styled from "./styles"
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form"
import { z } from 'zod'

const registerFormSchema = z.object({
    username: z.string()
        .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
        .regex(/^([a-z\\-]+)$/i, {
            message: 'O usuário pode ter apenas letras e hifens.',
        }).transform((username) => username.toLowerCase()),

    name: z
        .string()
        .min(3, { message: 'O nome precisa ter pelo menos 3 letras.' }),
})

type RegisterFormData = z.infer<registerFormSchema>

export default function Register() {

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerFormSchema),
    })

    function handleRegister(data: RegisterFormData) {
        console.log(data)
    }

    return (
        <Styled.Container>
            <Styled.Header>
                <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
                <Text>
                    Precisamos de algumas informações para criar seu perfil! Ah, você
                    pode editar essas informações depois.
                </Text>

                <MultiStep size={4} currentStep={1} />
            </Styled.Header>

            <Styled.Form as="form" onSubmit={handleSubmit(handleRegister)}>
                <label>
                    <Text size="sm">Nome de usuário</Text>
                    <TextInput
                        prefix="ignite.com/"
                        placeholder="seu-usuario"
                        {...register('username')}
                    />

                    {errors.username && (
                        <Styled.FormError size="sm">{errors.username.message}</Styled.FormError>
                    )}
                </label>

                <label>
                    <Text size="sm">Nome completo</Text>
                    <TextInput placeholder="Seu nome"  {...register('name')} />
                    {errors.name && (
                        <Styled.FormError size="sm">{errors.name.message}</Styled.FormError>
                    )}
                </label>

                <Button type="submit">
                    Próximo passo
                    <ArrowRight />
                </Button>
            </Styled.Form>
        </Styled.Container>
    )
}