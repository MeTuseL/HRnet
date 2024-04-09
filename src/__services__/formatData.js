export const formatDate = (date) => {
    const newdate = new Date(date)
    const month = newdate.getMonth() + 1
    const day = newdate.getDate()
    const year = newdate.getFullYear()

    const formattedMonth = month < 10 ? `0${month}` : month
    const formattedDay = day < 10 ? `0${day}` : day

    return `${formattedMonth}/${formattedDay}/${year}`
}
