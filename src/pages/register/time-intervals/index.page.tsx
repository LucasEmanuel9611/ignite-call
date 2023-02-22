import * as Styled from './styles'

import {
    Button,
    Checkbox,
    Heading,
    MultiStep,
    Text,
    TextInput,
} from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'

export default function TimeIntervals() {
    return (
        <Styled.Container>
            <Styled.Header>
                <Heading as="strong">Quase lá</Heading>
                <Text>
                    Defina o intervalo de horário que você está disponível em cada dia da
                    semana.
                </Text>

                <MultiStep size={4} currentStep={3} />
            </Styled.Header>

            <Styled.IntervalBox as="form">
                <Styled.IntervalContainer>
                    <Styled.IntervalItem>
                        <Styled.IntervalDay>
                            <Checkbox />
                            <Text>Segunda-feira</Text>
                        </Styled.IntervalDay>
                        <Styled.IntervalInputs>
                            <TextInput size="sm" type="time" step={60} />
                            <TextInput size="sm" type="time" step={60} />
                        </Styled.IntervalInputs>
                    </Styled.IntervalItem>

                    <Styled.IntervalItem>
                        <Styled.IntervalDay>
                            <Checkbox />
                            <Text>Terça-feira</Text>
                        </Styled.IntervalDay>
                        <Styled.IntervalInputs>
                            <TextInput size="sm" type="time" step={60} />
                            <TextInput size="sm" type="time" step={60} />
                        </Styled.IntervalInputs>
                    </Styled.IntervalItem>
                </Styled.IntervalContainer>

                <Button type="submit">
                    Próximo passo
                    <ArrowRight />
                </Button>
            </Styled.IntervalBox>
        </Styled.Container>
    )
}