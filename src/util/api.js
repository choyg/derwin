import { dateFmt, getISO } from "./date";
import { store } from "./storage";

const headers = {
  Connection: "Keep-Alive",
  "Accept-Encoding": "gzip",
  "User-Agent": "okhttp/4.2.2",
};

/**
 * @param {'US' | 'EU' | 'AP'} region
 * @param {string | null} date YYYY-MM-DD
 * @returns {Promise<any[]>}
 */
const loadIssues = async (region) => {
  // A JSON API is exposed within the 'bundle.v1/issue/EU/json. However it does
  // not appear to actually be used in the Android app so we'll be nice and
  // hit their hot routes instead. It also tends to result in a cache miss.
  //.https://expresso.economist.com/api/v1/issue/${region}/${date}/json

  // `https://espresso.economist.com/api/v1/issue/${region}/json`,
  const res = await fetch(
    `https://yellow-truth-3e36.adultspinach.workers.dev?region=` + region
  );

  if (!res.ok) {
    throw new Error(res);
  }

  const issues = await res.json();
  issues.forEach((day) => {
    if (day.type === "advertChecksum") {
      return;
    }
    store.setItem(`ISSUE-${region}-${day.issueDate}`, JSON.stringify(day));
  });

  return issues;
};

export const loadBundle = async (url, region, date) => {
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(res);
  }

  const text = await res.text();

  store.setItem(`BUNDLE-${region}-${date}`, text);

  return JSON.parse(text);
};

/**
 * @param {'US' | 'EU' | 'AP'} region
 * @param {string | null} date YYYY-MM-DD
 */
export const getBundle = async ({ region, date }) => {
  // await fetch('https://expresso.economist.com/api/v1/issue/AP/2021-03-06/json')
  // return j;
  if (!date) {
    date = getISO(new Date());
  }

  document.title = dateFmt(new Date(date + "T00:00"));

  const bundleCache = store.getItem(`BUNDLE-${region}-${date}`);
  if (bundleCache) {
    return JSON.parse(bundleCache);
  }

  let issue = store.getItem(`ISSUE-${region}-${date}`);
  if (!issue) {
    await loadIssues(region);
    issue = store.getItem(`ISSUE-${region}-${date}`);
  }

  if (!issue) {
    return undefined;
  }

  issue = JSON.parse(issue);
  if (issue.type === "weekend" || !issue.bundleUri) {
    if (issue.title || issue.message) {
      return [issue];
    }
    return undefined;
  }

  return await loadBundle(issue.bundleUri, region, date);
};
