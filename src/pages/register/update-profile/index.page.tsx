import * as Styled from "./styles"
import { zodResolver } from '@hookform/resolvers/zod'
import { Avatar, Button, Heading, MultiStep, Text, TextArea } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { buildNextAuthOptions } from "@/pages/api/auth/[...nextauth].api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "@/lib/axios";
import { NextSeo } from "next-seo";

const UpdateProfileSchema = z.object({
    bio: z.string()
})

type UpdateProfileData = z.infer<typeof UpdateProfileSchema>

export default function UpdateProfile() {

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<UpdateProfileData>({
        resolver: zodResolver(UpdateProfileSchema),
    })

    const session = useSession()
    const router = useRouter()

    async function handleUpdateProfile(data: UpdateProfileData) {
        await api.put('/users/profile', {
            bio: data.bio,
        })

        await router.push(`/schedule/${session.data?.user.username}`)
    }

    return (
        <>
            <NextSeo title="Atualize seu perfil | Ignite Call" noindex />
            <Styled.Container>
                <Styled.Header>
                    <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
                    <Text>
                        Precisamos de algumas informações para criar seu perfil! Ah, você
                        pode editar essas informações depois.
                    </Text>

                    <MultiStep size={4} currentStep={4} />
                </Styled.Header>

                <Styled.ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
                    <label>
                        <Text size="sm">Foto de perfil</Text>
                        <Avatar
                            src={session.data?.user.avatar_url}
                            referrerPolicy="no-referrer"
                            alt={session.data?.user.name}
                        />
                    </label>

                    <label>
                        <Text size="sm">Sobre você</Text>
                        <TextArea {...register('bio')} />
                        <Styled.FormAnnotation size="sm">
                            Fale um pouco sobre você. Isto será exibido em sua página pessoal.
                        </Styled.FormAnnotation>
                    </label>

                    <Button type="submit" disabled={isSubmitting}>
                        Finalizar
                        <ArrowRight />
                    </Button>
                </Styled.ProfileBox>
            </Styled.Container>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await unstable_getServerSession(
        req,
        res,
        buildNextAuthOptions(req, res),
    )

    return {
        props: {
            session,
        },
    }
}