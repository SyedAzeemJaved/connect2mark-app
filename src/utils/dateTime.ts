export const formatDateToMobileAppFormatString = (date: Date): string => {
    const [year, month, _date] = date.toISOString().slice(0, 10).split('-');

    return `${_date}/${month}/${year}`;
};

export const formatDateToApiFormatString = (date: Date): string => {
    const [year, month, _date] = date.toISOString().slice(0, 10).split('-');

    return `${year}-${month}-${_date}`;
};
