import * as Styled from "./styles"
import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";
import { ArrowRight, Check } from "phosphor-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function ConnectCalendar() {
    const session = useSession()
    const router = useRouter()

    const hasAuthError = !!router.query.error
    const isSignedIn = session.status === "authenticated"

    async function handleConnectCalendar() {
        await signIn('google')
    }

    async function handleNavigateToNextStep() {
        await router.push('/register/time-intervals')
    }

    return (
        <Styled.Container>
            <Styled.Header>
                <Heading as="strong">Conecte sua agenda!</Heading>
                <Text>
                    Conecte o seu calendário para verificar automaticamente as horas
                    ocupadas e os novos eventos à medida em que são agendados.
                </Text>

                <MultiStep size={4} currentStep={2} />
            </Styled.Header>

            <Styled.ConnectBox>
                <Styled.ConnectItem>
                    <Text>Google Calendar</Text>
                    {
                        isSignedIn ? (
                            <Button size="sm" disabled >
                                <Check />
                            </Button>
                        ) : (
                            <Button variant="secondary" size="sm" onClick={handleConnectCalendar} >
                                Conectar
                                <ArrowRight />
                            </Button>
                        )}
                </Styled.ConnectItem>

                {hasAuthError && (
                    <Styled.AuthError size="sm">
                        Falha ao se conectar ao Goolge, verifique se você habilitou
                        as permissões de acesso ao Google Calendar
                    </Styled.AuthError>
                )}

                <Button type="submit" disabled={!isSignedIn} onClick={handleNavigateToNextStep}>
                    Próximo passo
                    <ArrowRight />
                </Button>
            </Styled.ConnectBox>

        </Styled.Container>
    )
}