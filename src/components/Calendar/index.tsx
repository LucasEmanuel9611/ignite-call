import { CaretLeft, CaretRight } from 'phosphor-react'
import { getShortNameWeekDays } from '../../utils/get-week-days'
import * as Styled from './styles'

export function Calendar() {
    const shortNameWeekDays = getShortNameWeekDays()

    return (
        <Styled.CalendarContainer>
            <Styled.CalendarHeader>
                <Styled.CalendarTitle>
                    Dezembro <span>2022</span>
                </Styled.CalendarTitle>

                <Styled.CalendarActions>
                    <button>
                        <CaretLeft />
                    </button>
                    <button>
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