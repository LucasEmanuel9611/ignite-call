import * as Styled from "./styles"
import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";

export default function Register() {
    <Styled.Container>
        <Styled.Header>
            <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
            <Text>
                Precisamos de algumas informações para criar seu perfil! Ah, você
                pode editar essas informações depois.
            </Text>

            <MultiStep size={4} currentStep={1} />
        </Styled.Header>

        <Styled.Form as="form">
            <label>
                <Text size="sm">Nome de usuário</Text>
                <TextInput prefix="ignite.com/" placeholder="seu-usuario" />
            </label>

            <label>
                <Text size="sm">Nome completo</Text>
                <TextInput placeholder="Seu nome" />
            </label>

            <Button type="submit">
                Próximo passo
                <ArrowRight />
            </Button>
        </Styled.Form>
    </Styled.Container>
}