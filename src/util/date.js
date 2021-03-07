import { getStorage } from "./storage";

const fmt = new Intl.DateTimeFormat([], {
  dateStyle: "full",
});

/**
 * @param {Date} date
 * @returns {string}
 */
export const dateFmt = (date) => {
  return fmt.format(date);
};

export const getISO = (date) => {
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  return `${date.getFullYear()}-${month}-${day}`;
};

/**
 * A bit arbitrary. Revisit app src to determine how they're calculating region.
 */
export const getTzRegion = () => {
  const offset = new Date().getTimezoneOffset() / 60;
  if (offset <= -3 || offset >= -12) {
    return "US";
  }
  if (offset <= 12 && offset >= 3.5) {
    return "AP";
  }

  return "EU";
};

export const getRegion = () => {
  const url = new URL(document.URL);
  if (url.searchParams.get("region")) {
    return url.searchParams.get("region").toUpperCase();
  }
  const store = getStorage();
  if (store.getItem("region")) {
    return store.getItem("region");
  }

  return getTzRegion();
};

export const regionTxt = {
  US: "US",
  EU: "EU",
  AP: "Asia",
};
