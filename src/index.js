import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createGlobalStyle} from "styled-components";
import {GlobalProvider} from "./context/index.context";

const root = ReactDOM.createRoot(document.getElementById('root'));

const GlobalCss = createGlobalStyle`
  *, ::after, ::before {
    box-sizing: inherit;
  }

  :root {
    --main-background: #006474;
    --transparent-background: #00000030;

    --enter-form-background: #009fb5;
    --enter-button-background: #008da1;
    --enter-button-interact-background: #007989;

    --dark-square-background: #ce4047;
    --light-square-background: #f4d9bf;

    --dark-player-background: #27211b;
    --light-player-background: #ffffff;

    --dark-timer-background: #27211b;
    --light-timer-background: #ffffff;

    --dark-text: #ce4047;
    --light-text: #f4d9bf;

    --piece-selected-background: #faeea0aa;
    --piece-selected-border: gray;

    --target-enemy-background: #ed4628cc;
    --target-no-enemy-background: #cc9a62cc;

    
    @media only screen and (min-width: 1000px) {
      --board-width: 95vh;
    }
    @media only screen and (max-width: 1000px) {
      --board-width: 95vw;
    }
  }

  html {
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, system-ui, Helvetica, Arial, sans-serif;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--main-background);
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }
`

root.render(<GlobalProvider>
	<GlobalCss/>
	<App/>
</GlobalProvider>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);

