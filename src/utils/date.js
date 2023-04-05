import moment from 'moment';

export const getFormattedDate = () => {
    return moment().format('YYYY-MM-DD hh:mm:ss A');
}