import { Calendar } from '@/components/Calendar'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import * as Styled from './styles'

interface Availability {
    possibleTimes: number[]
    availableTimes: number[]
}

export function CalendarStep() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    const router = useRouter()

    const isDateSelected = !!selectedDate
    const username = String(router.query.username)

    const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
    const describedDate = selectedDate
        ? dayjs(selectedDate).format('DD[ de ]MMMM')
        : null

    const selectedDateWithoutTime = selectedDate
        ? dayjs(selectedDate).format('YYYY-MM-DD')
        : null

    const { data: availability } = useQuery<Availability>(
        ['availability', selectedDateWithoutTime],
        async () => {
            const response = await api.get(`/users/${username}/availability`, {
                params: {
                    date: selectedDateWithoutTime,
                },
            })

            return response.data
        },
        {
            enabled: !!selectedDate,
        },
    )
    return (
        <Styled.Container>
            <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

            {/* TODO: Adicionar animação */}
            {isDateSelected && (
                <Styled.Container>
                    <Styled.TimePickerHeader>
                        {weekDay} <span>{describedDate}</span>
                    </Styled.TimePickerHeader>

                    <Styled.TimePickerList>
                        {availability?.possibleTimes.map((hour) => {
                            return (
                                <Styled.TimePickerItem
                                    key={hour}
                                    disabled={!availability.availableTimes.includes(hour)}
                                >
                                    {String(hour).padStart(2, '0')}:00h
                                </Styled.TimePickerItem>
                            )
                        })}
                    </Styled.TimePickerList>
                </Styled.Container>
            )}
        </Styled.Container>
    )
}