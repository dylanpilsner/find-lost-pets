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

      @keyframes ldio-7az8g223uuj {
        0% { opacity: 1 }
        100% { opacity: 0 }
      }
      .ldio-7az8g223uuj div {
        left: 47px;
        top: 24px;
        position: absolute;
        animation: ldio-7az8g223uuj linear 2.127659574468085s infinite;
        background: #0a0a0a;
        width: 6px;
        height: 12px;
        border-radius: 3px / 6px;
        transform-origin: 3px 26px;
      }.ldio-7az8g223uuj div:nth-child(1) {
        transform: rotate(0deg);
        animation-delay: -1.9858156028368792s;
        background: #0a0a0a;
      }.ldio-7az8g223uuj div:nth-child(2) {
        transform: rotate(24deg);
        animation-delay: -1.8439716312056735s;
        background: #0a0a0a;
      }.ldio-7az8g223uuj div:nth-child(3) {
        transform: rotate(48deg);
        animation-delay: -1.7021276595744679s;
        background: #0a0a0a;
      }.ldio-7az8g223uuj div:nth-child(4) {
        transform: rotate(72deg);
        animation-delay: -1.5602836879432622s;
        background: #0a0a0a;
      }.ldio-7az8g223uuj div:nth-child(5) {
        transform: rotate(96deg);
        animation-delay: -1.4184397163120566s;
        background: #0a0a0a;
      }.ldio-7az8g223uuj div:nth-child(6) {
        transform: rotate(120deg);
        animation-delay: -1.276595744680851s;
        background: #0a0a0a;
      }.ldio-7az8g223uuj div:nth-child(7) {
        transform: rotate(144deg);
        animation-delay: -1.1347517730496453s;
        background: #0a0a0a;
      }.ldio-7az8g223uuj div:nth-child(8) {
        transform: rotate(168deg);
        animation-delay: -0.9929078014184396s;
        background: #0a0a0a;
      }.ldio-7az8g223uuj div:nth-child(9) {
        transform: rotate(192deg);
        animation-delay: -0.8510638297872339s;
        background: #0a0a0a;
      }.ldio-7az8g223uuj div:nth-child(10) {
        transform: rotate(216deg);
        animation-delay: -0.7092198581560283s;
        background: #0a0a0a;
      }.ldio-7az8g223uuj div:nth-child(11) {
        transform: rotate(240deg);
        animation-delay: -0.5673758865248226s;
        background: #0a0a0a;
      }.ldio-7az8g223uuj div:nth-child(12) {
        transform: rotate(264deg);
        animation-delay: -0.42553191489361697s;
        background: #0a0a0a;
      }.ldio-7az8g223uuj div:nth-child(13) {
        transform: rotate(288deg);
        animation-delay: -0.2836879432624113s;
        background: #0a0a0a;
      }.ldio-7az8g223uuj div:nth-child(14) {
        transform: rotate(312deg);
        animation-delay: -0.14184397163120566s;
        background: #0a0a0a;
      }.ldio-7az8g223uuj div:nth-child(15) {
        transform: rotate(336deg);
        animation-delay: 0s;
        background: #0a0a0a;
      }
      .loadingio-spinner-spinner-ud9bmcq7e9 {
        width: 71px;
        height: 71px;
        display: inline-block;
        overflow: hidden;
      }
      .ldio-7az8g223uuj {
        width: 100%;
        height: 100%;
        position: relative;
        transform: translateZ(0) scale(0.71);
        backface-visibility: hidden;
        transform-origin: 0 0; /* see note above */
      }
      .ldio-7az8g223uuj div { box-sizing: content-box; }
      /* generated by https://loading.io/ */
      `;

    loader.innerHTML =
      /*html*/
      `
      <div class="loadingio-spinner-spinner-ud9bmcq7e9"><div class="ldio-7az8g223uuj">
      <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
      </div></div>
    `;

    shadow.appendChild(loader);
    shadow.appendChild(style);
  }
}

customElements.define("custom-loader", Loader);
