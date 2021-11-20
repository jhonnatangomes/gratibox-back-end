import dayjs from 'dayjs';

export default function nextDeliveries(day, planType) {
    const formattedDay =
        planType === 'Semanal' ? day : Number(day.split(' ')[1]);
    const weekdays = [
        'Domingo',
        'Segunda',
        'Terça',
        'Quarta',
        'Quinta',
        'Sexta',
        'Sábado',
    ];
    const nextDates = [];
    if (planType === 'Semanal') {
        const weekIndex = weekdays.indexOf(formattedDay);
        if (dayjs().day(weekIndex).isBefore(dayjs())) {
            nextDates.push(
                dayjs()
                    .day(weekIndex + 7)
                    .format('DD/MM/YYYY')
            );
            nextDates.push(
                dayjs()
                    .day(weekIndex + 14)
                    .format('DD/MM/YYYY')
            );
            nextDates.push(
                dayjs()
                    .day(weekIndex + 21)
                    .format('DD/MM/YYYY')
            );
        } else {
            nextDates.push(dayjs().day(weekIndex).format('DD/MM/YYYY'));
            nextDates.push(
                dayjs()
                    .day(weekIndex + 7)
                    .format('DD/MM/YYYY')
            );
            nextDates.push(
                dayjs()
                    .day(weekIndex + 14)
                    .format('DD/MM/YYYY')
            );
        }
    } else {
        const monthIndex = dayjs().month();
        if (dayjs().date(formattedDay).isBefore(dayjs())) {
            nextDates.push(
                dayjs()
                    .date(formattedDay)
                    .month(monthIndex + 1)
                    .format('DD/MM/YYYY')
            );
            nextDates.push(
                dayjs()
                    .date(formattedDay)
                    .month(monthIndex + 2)
                    .format('DD/MM/YYYY')
            );
            nextDates.push(
                dayjs()
                    .date(formattedDay)
                    .month(monthIndex + 3)
                    .format('DD/MM/YYYY')
            );
        } else {
            nextDates.push(dayjs().date(formattedDay).format('DD/MM/YYYY'));
            nextDates.push(
                dayjs()
                    .date(formattedDay)
                    .month(monthIndex + 1)
                    .format('DD/MM/YYYY')
            );
            nextDates.push(
                dayjs()
                    .date(formattedDay)
                    .month(monthIndex + 2)
                    .format('DD/MM/YYYY')
            );
        }
    }
    return nextDates;
}
