import "./App.css";
import { createResource, Match } from "solid-js";
import { Loading } from "./components/Loading";
import { getBundle } from "./util/api";
import { dateFmt, getRegion, regionTxt, getDate } from "./util/date";
import {Header} from "./components/Header";

function App() {
  let [bundle] = createResource(
    () => ({region: getRegion(), date: getDate()}), getBundle
  );

  return (
    <div class="App">
      <Header />
      <Switch
        fallback={
          <article class="message">
            <h3>Failed to load article.</h3>
          </article>
        }
      >
        <Match when={bundle.loading}>
          <Loading />
        </Match>
        <Match when={bundle()}>
          {(sections) => (
            <For each={sections}>
              {(item) => (
                <article>
                  <Switch>
                    <Match when={item.title || item.message}>
                      <div class="message">
                        <h3>{item.title}</h3>
                        <h3>{item.message}</h3>
                      </div>
                    </Match>
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
                          <p class="credit">
                            Photo:{" "}
                            {item.pictureCredit || item.leaderPictureCredit}
                          </p>
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
        </div>
        <a class="ss" href="https://github.com/choyg/derwin">GitHub</a>
      </footer>
    </div>
  );
}

export default App;
