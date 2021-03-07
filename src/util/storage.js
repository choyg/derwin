/**
 * @returns {Storage}
 */
export const getStorage = () => {
  try {
    window.localStorage.setItem('mom?', 'derwin?');
    window.localStorage.removeItem('mom?');
    return window.localStorage;
  } catch (err) {
    return window.sessionStorage;
  }
}

export const store = getStorage();