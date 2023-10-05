import { ConditionSelect } from '../_data/data';

export function formatTime(dateAndTime) {
  const date = new Date(dateAndTime);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  const strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

export const getConditionSelectObject = (value) => {
  return ConditionSelect.filter((condition) => condition.value === value);
};

export const shuffleThis = (array) => {
  return array.sort(() => Math.random() - 0.5);
};
