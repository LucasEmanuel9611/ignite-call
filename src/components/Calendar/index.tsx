import dayjs from 'dayjs'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useState } from 'react'
import { getShortNameWeekDays } from '../../utils/get-week-days'
import * as Styled from './styles'

export function Calendar() {
    const [currentDate, setCurrentDate] = useState(() => {
        return dayjs().set('date', 1)
    })

    function handlePreviousMonth() {
        const previousMonth = currentDate.subtract(1, 'month')

        setCurrentDate(previousMonth)
    }

    function handleNextMonth() {
        const nextMonth = currentDate.add(1, 'month')

        setCurrentDate(nextMonth)
    }

    const shortNameWeekDays = getShortNameWeekDays()

    const currentMonth = currentDate.format('MMMM')
    const currentYear = currentDate.format('YYYY')

    return (
        <Styled.CalendarContainer>
            <Styled.CalendarHeader>
                <Styled.CalendarTitle>
                    {currentMonth} <span>{currentYear}</span>
                </Styled.CalendarTitle>

                <Styled.CalendarActions>
                    <button onClick={handlePreviousMonth} title="Previous month">
                        <CaretLeft />
                    </button>
                    <button onClick={handleNextMonth} title="Next month">
                        <CaretRight />
                    </button>
                </Styled.CalendarActions>
            </Styled.CalendarHeader>

            <Styled.CalendarBody>
                <thead>
                    <tr>
                        {shortNameWeekDays.map((weekDay) => (
                            <th key={weekDay}>{weekDay}.</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <Styled.CalendarDay>1</Styled.CalendarDay>
                        </td>
                        <td>
                            <Styled.CalendarDay>2</Styled.CalendarDay>
                        </td>
                        <td>
                            <Styled.CalendarDay>3</Styled.CalendarDay>
                        </td>
                    </tr>
                </tbody>
            </Styled.CalendarBody>
        </Styled.CalendarContainer>
    )
}