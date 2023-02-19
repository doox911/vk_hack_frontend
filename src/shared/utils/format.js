/**
 * Преобразовать дату в нужный формат
 *
 * Можно передать значение даты в формате YYYY-MM-DD hh:mm:ss, UTC, а также в миллисекундах
 *
 * @example format = 'DD.MM.YYYY hh:mm:ss'; // default
 *
 * Format.getFormat('2021-06-15', 'DD.MM.YYYY'); // 15.06.2021
 * Format.getFormat(new Date(), 'DD.MM.YYYY'); // 15.06.2021
 * Format.getFormat(1623751680766, 'DD.MM'); // 15.06
 */
export function getFormat(_date, format = 'DD.MM.YYYY hh:mm:ss') {
  let out = format;

  const date = new Date(_date);
  const day = zero(date.getDate());
  const month = zero(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = zero(date.getHours());
  const minutes = zero(date.getMinutes());
  const seconds = zero(date.getSeconds());

  out = out.replace('YYYY', year);
  out = out.replace('YY', year);
  out = out.replace('MM', month);
  out = out.replace('DD', day);
  out = out.replace('hh', hours);
  out = out.replace('mm', minutes);
  out = out.replace('ss', seconds);
  return out;
}

function zero(text) {
  return String(text).padStart(2, '0');
}
