import {getISO} from "../util/date";

export const Header = () => {
  const today = new Date();
  const fmt = new Intl.DateTimeFormat([], {
    dateStyle: 'short',
    year: undefined
  });
  const timeline = new Array(7).fill(undefined).map((_, idx) => {
    return new Date(today.valueOf() - (6 - idx) * 24 * 60 * 60e3);
  });

  return (
    <div class="header">
      <For each={timeline}>
        {item => (
          <a class="ss" href={`/${getISO(item)}`}>
            {fmt.format(item)}
          </a>
        )}
      </For>
    </div>
  );
};
