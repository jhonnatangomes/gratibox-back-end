import dayjs from 'dayjs';

function isWeekend(day) {
    const dayNum = day.day();
    if (dayNum === 6) {
        return day.add(2, 'd').format('DD/MM/YYYY');
    }
    if (dayNum === 0) {
        return day.add(1, 'd').format('DD/MM/YYYY');
    }
    return day.format('DD/MM/YYYY');
}

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
        const sameWeek = dayjs().day(weekIndex).format('DD/MM/YYYY');
        const oneWeekAfter = dayjs()
            .day(weekIndex + 7)
            .format('DD/MM/YYYY');
        const twoWeeksAfter = dayjs()
            .day(weekIndex + 14)
            .format('DD/MM/YYYY');
        const threeWeeksAfter = dayjs()
            .day(weekIndex + 21)
            .format('DD/MM/YYYY');

        if (dayjs().day(weekIndex).isBefore(dayjs())) {
            nextDates.push(oneWeekAfter);
            nextDates.push(twoWeeksAfter);
            nextDates.push(threeWeeksAfter);
        } else {
            nextDates.push(sameWeek);
            nextDates.push(oneWeekAfter);
            nextDates.push(twoWeeksAfter);
        }
    } else {
        const monthIndex = dayjs().month();
        const sameMonth = dayjs().date(formattedDay);
        const oneMonthAfter = dayjs()
            .date(formattedDay)
            .month(monthIndex + 1);
        const twoMonthsAfter = dayjs()
            .date(formattedDay)
            .month(monthIndex + 2);
        const threeMonthsAfter = dayjs()
            .date(formattedDay)
            .month(monthIndex + 3);

        if (dayjs().date(formattedDay).isBefore(dayjs())) {
            nextDates.push(isWeekend(oneMonthAfter));
            nextDates.push(isWeekend(twoMonthsAfter));
            nextDates.push(isWeekend(threeMonthsAfter));
        } else {
            nextDates.push(isWeekend(sameMonth));
            nextDates.push(isWeekend(oneMonthAfter));
            nextDates.push(isWeekend(twoMonthsAfter));
        }
    }
    return nextDates;
}
