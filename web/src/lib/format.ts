import moment from "moment";

export const formatDateWithTime = (time: string) => {
  return moment(time).format("DD-MM-YYYY hh:mm:ss");
}