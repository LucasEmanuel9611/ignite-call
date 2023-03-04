function getWeekDays() {
  const formatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })

  return Array.from(Array(7).keys()).map(day =>
    formatter.format(new Date(Date.UTC(2021, 5, day)))
  )
}

export function getLongNameWeekDays() {
  const weekDays = getWeekDays()

  return weekDays.map(weekDay => {
    return weekDay.substring(0, 1).toUpperCase().concat(weekDay.substring(1))
  })
}

export const getShortNameWeekDays = () => {
  const weekDays = getWeekDays()

  return weekDays.map(weekDay => {
    return weekDay.substring(0, 3).toUpperCase()
  })
}
