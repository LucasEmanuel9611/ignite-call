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
import { zodResolver } from '@hookform/resolvers/zod'
import { convertTimeStringToMinutes } from '@/utils/convert-time-string-to-minutes'

const timeIntervalsFormSchema = z.object({
    intervals: z.array(z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string()
    }))
        .length(7)
        .transform(intervals => intervals.filter(interval => interval.enabled))
        .refine(intervals => intervals.length > 0, {
            message: 'Você precisa selecionar pelo menos um dia da semana'
        })
        .transform((intervals) => {
            return intervals.map((interval) => {
                return {
                    weekDay: interval.weekDay,
                    startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
                    endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
                }
            })
        })
        .refine(intervals => {
            return intervals.every(interval => interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes)
        }, {
            message: "O Horáriode ermino deve ser pelo menos um hora distante do início"
        })
})

type TimeIntervalsFormInput = z.input<typeof timeIntervalsFormSchema>
type TimeIntervalsFormOutput = z.output<typeof timeIntervalsFormSchema>

export default function TimeIntervals() {
    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: { isSubmitting, errors }
    } = useForm({
        resolver: zodResolver(timeIntervalsFormSchema),
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

    async function handleSetTimeIntervals(data: any) {
        const formData = data as TimeIntervalsFormOutput

        console.log(formData)
    }
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

                {errors.intervals && (
                    <Styled.FormError size="sm">{errors.intervals.message}</Styled.FormError>
                )}

                <Button type="submit" disabled={isSubmitting}>
                    Próximo passo
                    <ArrowRight />
                </Button>
            </Styled.IntervalBox>
        </Styled.Container>
    )
}