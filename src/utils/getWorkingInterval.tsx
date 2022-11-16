function getWorkingInterval(dtInterval: number): string {
    const absDtInterval = Math.abs(dtInterval);
    const days = Math.floor(absDtInterval / 1000 / 3600 / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years <= 0) {
        if (months <= 0) {
            if (days <= 0) {
                return "Первый день";
            }
            return `${days} ${getDayLabel(days)}`;
        }
        let result = `${months} ${getMonthLabel(months)}`;
        const ofsDays = days - months * 30;
        if (ofsDays > 0) {
            result += ` и ${ofsDays} ${getDayLabel(ofsDays)}`;
        }
        return result;
    }

    let result = `${years} ${getYearLabel(years)}`;
    const ofsMonth = months - years * 12;
    if (ofsMonth > 0) {
        result += `и ${ofsMonth} ${getMonthLabel(ofsMonth)}`;
    }
    return result;
}

export default getWorkingInterval;

function getDayLabel(days: number): string {
    if (days >= 5 && days <= 20) return "дней";
    if (days >= 25 && days <= 30) return "дней";

    if (days >= 2 && days <= 4) return "дня";
    if (days >= 22 && days <= 24) return "дня";

    return "день";
}

function getMonthLabel(months: number): string {
    if (months === 1) return "месяц";
    if (months >= 2 && months <= 4) return "месяца";
    return "месяцев";
}

function getYearLabel(years: number): string {
    if (years >= 5 && years <= 20) return "лет";
    if (years >= 25 && years <= 30) return "лет";

    if (years >= 2 && years <= 4) return "года";
    if (years >= 22 && years <= 24) return "года";

    return "год";
}
