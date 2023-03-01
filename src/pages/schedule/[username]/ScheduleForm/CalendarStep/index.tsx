import { Calendar } from '@/components/Calendar'
import { api } from '@/lib/axios'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import * as Styled from './styles'

interface Availability {
    possibleTimes: number[]
    availabilityTimes: number[]
}

export function CalendarStep() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [availability, setAvailability] = useState<Availability | null>(null)
    const router = useRouter()

    const isDateSelected = !!selectedDate
    const username = String(router.query.username)

    const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
    const describedDate = selectedDate
        ? dayjs(selectedDate).format('DD[ de ]MMMM')
        : null

    useEffect(() => {
        if (!selectedDate) {
            return
        }

        api
            .get(`/users/${username}/availability`, {
                params: {
                    date: dayjs(selectedDate).format('YYYY-MM-DD'),
                },
            })
            .then((response) => {
                setAvailability(response.data)
            })
    }, [selectedDate, username])

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

                        {availability?.possibleTimes.map((hour) => (
                            <Styled.TimePickerItem
                                key={hour}
                                disabled={!availability.availabilityTimes.includes(hour)}>
                                {String(hour).padStart(2, '0')}:00h
                            </Styled.TimePickerItem>
                        ))}
                    </Styled.TimePickerList>
                </Styled.Container>
            )}
        </Styled.Container>
    )
}