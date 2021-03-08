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

// Idk why this has side-effects.
export const getDate = () => {
  const url = new URL(document.URL);
  // Defaults to '/'
  let [, date] = url.pathname.split('/');
  if (!date) {
    return getISO(new Date());
  }

  // Verify pathname is actually a date
  if (!/\d\d\d\d-\d\d-\d\d/.test(date)) {
    url.pathname = '/';
    window.history.replaceState({}, '', url.toString());
    return getISO(new Date());
  }

  // Date must be within 7 days of today
  // Bugged if switching to a region w/ TZ ahead of local TZ
  date = new Date(date + "T00:00"); // Sets to local TZ instead of UTC
  if (date.valueOf() < (new Date().valueOf() - 7*24*60*60e3)) {
    console.log('Invalid date range. Cannot time travel that far back');
    url.pathname = '/';
    window.history.replaceState({}, '', url.toString());
    return getISO(new Date());
  }

  return getISO(date);
}

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
