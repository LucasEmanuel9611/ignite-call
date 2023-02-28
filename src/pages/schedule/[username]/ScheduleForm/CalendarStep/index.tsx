import { Calendar } from '@/components/Calendar'
import * as Styled from './styles'

export function CalendarStep() {
    const isDateSelected = false

    return (
        <Styled.Container>
            <Calendar />

            {isDateSelected && (
                <Styled.Container>
                    <Styled.TimePickerHeader>
                        terça-feira <span>20 de setembro</span>
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