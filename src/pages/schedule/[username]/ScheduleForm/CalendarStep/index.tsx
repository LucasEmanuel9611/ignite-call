import { Calendar } from '@/components/Calendar'
import dayjs from 'dayjs'
import { useState } from 'react'
import * as Styled from './styles'

export function CalendarStep() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    const isDateSelected = !!selectedDate

    const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
    const describedDate = selectedDate
        ? dayjs(selectedDate).format('DD[ de ]MMMM')
        : null

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
                        <Styled.TimePickerItem>08:00h</Styled.TimePickerItem>
                        <Styled.TimePickerItem>09:00h</Styled.TimePickerItem>
                        <Styled.TimePickerItem>10:00h</Styled.TimePickerItem>
                        <Styled.TimePickerItem>11:00h</Styled.TimePickerItem>
                        <Styled.TimePickerItem>12:00h</Styled.TimePickerItem>
                        <Styled.TimePickerItem>13:00h</Styled.TimePickerItem>
                        <Styled.TimePickerItem>14:00h</Styled.TimePickerItem>
                        <Styled.TimePickerItem>15:00h</Styled.TimePickerItem>
                        <Styled.TimePickerItem>16:00h</Styled.TimePickerItem>
                        <Styled.TimePickerItem>17:00h</Styled.TimePickerItem>
                        <Styled.TimePickerItem>18:00h</Styled.TimePickerItem>
                    </Styled.TimePickerList>
                </Styled.Container>
            )}
        </Styled.Container>
    )
}