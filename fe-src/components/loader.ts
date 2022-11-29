import { Router } from "../router";
import { state } from "../state";

class Loader extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    const shadow = this.attachShadow({ mode: "open" });
    const loader = document.createElement("div");
    const style = document.createElement("style");
    const cs = state.getState();
    loader.classList.add("loader");
    style.innerHTML =
      /*css*/
      `

          @keyframes ldio-o3khqszu1c {
            0% { opacity: 1 }
            100% { opacity: 0 }
          }
          .ldio-o3khqszu1c div {
            left: 94px;
            top: 48px;
            position: absolute;
            animation: ldio-o3khqszu1c linear 1s infinite;
            background: #0a0a0a;
            width: 12px;
            height: 24px;
            border-radius: 6px / 12px;
            transform-origin: 6px 52px;
          }.ldio-o3khqszu1c div:nth-child(1) {
            transform: rotate(0deg);
            animation-delay: -0.9166666666666666s;
            background: #0a0a0a;
          }.ldio-o3khqszu1c div:nth-child(2) {
            transform: rotate(30deg);
            animation-delay: -0.8333333333333334s;
            background: #0a0a0a;
          }.ldio-o3khqszu1c div:nth-child(3) {
            transform: rotate(60deg);
            animation-delay: -0.75s;
            background: #0a0a0a;
          }.ldio-o3khqszu1c div:nth-child(4) {
            transform: rotate(90deg);
            animation-delay: -0.6666666666666666s;
            background: #0a0a0a;
          }.ldio-o3khqszu1c div:nth-child(5) {
            transform: rotate(120deg);
            animation-delay: -0.5833333333333334s;
            background: #0a0a0a;
          }.ldio-o3khqszu1c div:nth-child(6) {
            transform: rotate(150deg);
            animation-delay: -0.5s;
            background: #0a0a0a;
          }.ldio-o3khqszu1c div:nth-child(7) {
            transform: rotate(180deg);
            animation-delay: -0.4166666666666667s;
            background: #0a0a0a;
          }.ldio-o3khqszu1c div:nth-child(8) {
            transform: rotate(210deg);
            animation-delay: -0.3333333333333333s;
            background: #0a0a0a;
          }.ldio-o3khqszu1c div:nth-child(9) {
            transform: rotate(240deg);
            animation-delay: -0.25s;
            background: #0a0a0a;
          }.ldio-o3khqszu1c div:nth-child(10) {
            transform: rotate(270deg);
            animation-delay: -0.16666666666666666s;
            background: #0a0a0a;
          }.ldio-o3khqszu1c div:nth-child(11) {
            transform: rotate(300deg);
            animation-delay: -0.08333333333333333s;
            background: #0a0a0a;
          }.ldio-o3khqszu1c div:nth-child(12) {
            transform: rotate(330deg);
            animation-delay: 0s;
            background: #0a0a0a;
          }
          .loadingio-spinner-spinner-rx0u9in4cw {
            width: 200px;
            height: 200px;
            display: inline-block;
            overflow: hidden;
          }
          .ldio-o3khqszu1c {
            width: 100%;
            height: 100%;
            position: relative;
            transform: translateZ(0) scale(1);
            backface-visibility: hidden;
            transform-origin: 0 0; /* see note above */
          }
          .ldio-o3khqszu1c div { box-sizing: content-box; }
      `;

    loader.innerHTML =
      /*html*/
      `
      <div class="loadingio-spinner-spinner-rx0u9in4cw"><div class="ldio-o3khqszu1c">
      <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
      </div></div>
    `;

    shadow.appendChild(loader);
    shadow.appendChild(style);
  }
}

customElements.define("custom-loader", Loader);
