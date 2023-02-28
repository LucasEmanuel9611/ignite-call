import dayjs from 'dayjs'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { useMemo, useState } from 'react'
import { getShortNameWeekDays } from '../../utils/get-week-days'
import * as Styled from './styles'

interface CalendarWeek {
    week: number
    days: Array<{
        date: dayjs.Dayjs
        disabled: boolean
    }>
}

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

    const calendarWeeks = useMemo(() => {
        const daysInMonthArray = Array.from({
            length: currentDate.daysInMonth(),
        }).map((_, index) => {
            return currentDate.set('date', index + 1)
        })

        const firstMonthDayInWeek = currentDate.get('day')

        const previousMonthDays = Array.from({
            length: firstMonthDayInWeek,
        })
            .map((_, index) => {
                return currentDate.subtract(index + 1, 'day')
            })
            .reverse()

        const lastDayInCurrentMonth = currentDate.set(
            'date',
            currentDate.daysInMonth(),
        )
        const lastWeekDay = lastDayInCurrentMonth.get('day')

        const nextMonthDays = Array.from({
            length: 7 - (lastWeekDay + 1),
        }).map((_, index) => {
            return lastDayInCurrentMonth.add(index + 1, 'day')
        })

        const calendarDays = [
            ...previousMonthDays.map((date) => {
                return { date, disabled: true }
            }),
            ...daysInMonthArray.map((date) => {
                return { date, disabled: false }
            }),
            ...nextMonthDays.map((date) => {
                return { date, disabled: true }
            }),
        ]

        const calendarWeeks = calendarDays.reduce<CalendarWeek[]>(
            (weeks, _, index, original) => {
                const isNewWeek = index % 7 === 0

                if (isNewWeek) {
                    weeks.push({
                        week: index / 7 + 1,
                        days: original.slice(index, index + 7),
                    })
                }

                return weeks
            },
            [],
        )

        return calendarWeeks
    }, [currentDate])


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
                    {calendarWeeks.map(({ week, days }) => {
                        return (
                            <tr key={week}>
                                {days.map(({ date, disabled }) => {
                                    return (
                                        <td key={date.toString()}>
                                            <Styled.CalendarDay disabled={disabled}>
                                                {date.get('date')}
                                            </Styled.CalendarDay>
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </Styled.CalendarBody>
        </Styled.CalendarContainer>
    )
}