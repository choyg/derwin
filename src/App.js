import "./App.css";
import { createResource, Match } from "solid-js";
import { Loading } from "./components/Loading";
import { getBundle } from "./util/api";
import { dateFmt, getRegion, regionTxt } from "./util/date";

function App() {
  let [issue] = createResource(() => ({ region: getRegion() }), getBundle);

  return (
    <div class="App">
      <header class="header"></header>
      <Switch fallback={"Failed to load"}>
        <Match when={issue.loading}>
          <Loading />
        </Match>
        <Match when={issue()}>
          {(sections) => (
            <For each={sections} fallback={<h1>lmao</h1>}>
              {(item) => (
                <article>
                  <Switch>
                    <Match when={item.type === "issue"}>
                      <h1>{item.headlineSummary}</h1>
                      <p class="ss date">
                        {dateFmt(new Date(item.issueDate + "T00:00"))} -{" "}
                        {regionTxt[getRegion()]}
                      </p>
                      <h3 class="ss wib">World in Brief</h3>
                    </Match>
                    <Match
                      when={
                        item.type === "gobbet_page" || item.type === "article"
                      }
                    >
                      {item.headline ? (
                        <h2 class="ss wib">{item.headline}</h2>
                      ) : (
                        <></>
                      )}
                      {item.image || item.leaderImage ? (
                        <div class="img-container">
                          <img
                            src={
                              "data:image/jpeg;base64," +
                              (item.image || item.leaderImage)
                            }
                          />
                          <p class="credit">Photo: {item.pictureCredit || item.leaderPictureCredit}</p>
                        </div>
                      ) : (
                        <></>
                      )}
                      <div class="article" innerHTML={item.body}></div>
                    </Match>
                  </Switch>
                </article>
              )}
            </For>
          )}
        </Match>
      </Switch>
      <footer>
        <div class="regions">
          <a href="/?region=US">US</a>
          <a href="/?region=EU">EU</a>
          <a href="/?region=AP">Asia</a>
        </div>
        <a href="https://github.com/choyg/derwin">GitHub</a>
      </footer>
    </div>
  );
}

export default App;
