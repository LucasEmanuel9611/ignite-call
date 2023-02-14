import * as Styled from "./styles"
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { z } from 'zod'

export default function Register() {

    return (
        <Styled.Container>
            <Styled.Header>
                <Heading as="strong">Conecte sua agenda!</Heading>
                <Text>
                    Conecte o seu calendário para verificar automaticamente as horas
                    ocupadas e os novos eventos à medida em que são agendados.
                </Text>

                <MultiStep size={4} currentStep={1} />
            </Styled.Header>

            <Styled.ConnectBox>
                <Styled.ConnectItem>
                    <Text>Google Calendar</Text>
                    <Button variant="secondary" size="sm">
                        Conectar
                        <ArrowRight />
                    </Button>
                </Styled.ConnectItem>

                <Button type="submit">
                    Próximo passo
                    <ArrowRight />
                </Button>
            </Styled.ConnectBox>

        </Styled.Container>
    )
}