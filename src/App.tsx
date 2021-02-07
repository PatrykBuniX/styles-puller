import styles from "./App.module.scss";
import { Editor } from "./components/editor/Editor";

// const example = `<div class="about-intro">
// <div class="about-content">
//   <h2>Cool</h2>
//   <p>It is very important.</p>
// </div>
// <div class="about-img-wrapper">
//   <img loading="lazy" src="#" alt="" />
// </div>
// </div>`;

function App() {
  return (
    <div className={styles.App}>
      <Editor />
    </div>
  );
}

export default App;
