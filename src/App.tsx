import type { Component } from 'solid-js';

import styles from './App.module.css';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <h1>
          This site is under construction.
        </h1>
        <p>
          If you would like to contribute, please visit the <a href="https://github.com/vicplusplus/farm-paragon" target='_blank' rel="noreferrer noopener"> GitHub repository</a>.
        </p>
      </header>
    </div>
  );
};

export default App;
