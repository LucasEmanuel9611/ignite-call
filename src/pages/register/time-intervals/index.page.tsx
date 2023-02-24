import * as Styled from './styles'

import {
    Button,
    Checkbox,
    Heading,
    MultiStep,
    Text,
    TextInput
} from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

const timeIntervalsFormSchema = z.object({

})

export default function TimeIntervals() {
    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: { isSubmitting, errors }
    } = useForm({
        defaultValues: {
            intervals: [
                { weekDay: 0, enabled: false, startTime: '00:00', endTime: '00:00' },
                { weekDay: 1, enabled: true, startTime: '00:00', endTime: '00:00' },
                { weekDay: 2, enabled: true, startTime: '00:00', endTime: '00:00' },
                { weekDay: 3, enabled: true, startTime: '00:00', endTime: '00:00' },
                { weekDay: 4, enabled: true, startTime: '00:00', endTime: '00:00' },
                { weekDay: 5, enabled: true, startTime: '00:00', endTime: '00:00' },
                { weekDay: 6, enabled: false, startTime: '00:00', endTime: '00:00' },
            ]
        }
    })

    const { fields } = useFieldArray({
        control,
        name: 'intervals'
    })

    const intervals = watch('intervals')

    async function handleSetTimeIntervals() { }

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

            <Styled.IntervalBox as="form" onSubmit={handleSubmit(handleSetTimeIntervals)}>
                <Styled.IntervalContainer>
                    {fields.map((field, index) => (
                        <Styled.IntervalItem key={field.id}>
                            <Styled.IntervalDay>
                                <Controller
                                    name={`intervals.${index}.enabled`}
                                    control={control}
                                    render={({ field }) => {
                                        return (
                                            <Checkbox
                                                onCheckedChange={(checked) =>
                                                    field.onChange(checked === true)
                                                }
                                                checked={field.value}
                                            />
                                        )
                                    }}
                                />
                                <Text>{field.weekDay}</Text>
                            </Styled.IntervalDay>
                            <Styled.IntervalInputs>
                                <TextInput size="sm"
                                    type="time"
                                    step={60}
                                    disabled={intervals[index].enabled === false}
                                    {...register(`intervals.${index}.startTime`)}
                                />
                                <TextInput
                                    size="sm"
                                    type="time"
                                    step={60}
                                    disabled={intervals[index].enabled === false}
                                    {...register(`intervals.${index}.endTime`)}
                                />
                            </Styled.IntervalInputs>
                        </Styled.IntervalItem>
                    ))}

                </Styled.IntervalContainer>

                <Button type="submit">
                    Próximo passo
                    <ArrowRight />
                </Button>
            </Styled.IntervalBox>
        </Styled.Container>
    )
}