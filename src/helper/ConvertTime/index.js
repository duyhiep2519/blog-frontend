import formatRelative from "date-fns/formatRelative";
export const getTimestamp = (time) => {
  let formatDate = formatRelative(new Date(time), new Date());
  // const res = new Date(time);
  // const year = res.getFullYear();
  // const month = res.getMonth() + 1;
  // const day = res.getDate();
  // const hour = res.getHours() < 10 ? `0${res.getHours()}` : res.getHours();
  // const min = res.getMinutes() < 10 ? `0${res.getMinutes()}` : res.getMinutes();
  // // return `${day}/${month}/${year}, ${hour}:${min}`;
  formatDate = formatDate.charAt(0).toUpperCase() + formatDate.slice(1);
  return `${formatDate}`;
};
