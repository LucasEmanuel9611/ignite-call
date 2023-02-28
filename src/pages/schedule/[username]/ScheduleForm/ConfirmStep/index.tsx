import { Button, Text, TextArea, TextInput } from '@ignite-ui/react'
import { CalendarBlank, Clock } from 'phosphor-react'
import * as Styled from './styles'

export function ConfirmStep() {
    function handleConfirmScheduling() { }

    return (
        <Styled.ConfirmForm as="form" onSubmit={handleConfirmScheduling}>
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
                <TextInput placeholder="Seu nome" />
            </label>

            <label>
                <Text size="sm">Endereço de e-mail</Text>
                <TextInput type="email" placeholder="johndoe@example.com" />
            </label>

            <label>
                <Text size="sm">Observações</Text>
                <TextArea />
            </label>

            <Styled.FormActions>
                <Button type="button" variant="tertiary">
                    Cancelar
                </Button>
                <Button type="submit">Confirmar</Button>
            </Styled.FormActions>
        </Styled.ConfirmForm>
    )
}