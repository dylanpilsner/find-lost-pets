class Button extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  addListeners() {}

  render() {
    const test = "black";
    const shadow = this.attachShadow({ mode: "open" });
    const button = document.createElement("button");
    const style = document.createElement("style");
    const attribute = this.hasAttribute("color");
    const color = this.getAttribute("color");
    button.classList.add("button");
    style.innerHTML =
      /*css*/
      `
        .button{
          height:70px;
          background-color:${!attribute ? "#D1C1AD" : color};
          border:1px solid grey;
          box-shadow:1px 2px 7px 0px rgba(0,0,0,0.75);
          font-family:Poppins;
          font-size:16px;
          font-weight:700;
          text-align:center;
          border-radius:10px;
          width:100%;
          cursor:pointer;
        }
        
      `;

    button.textContent = this.textContent;
    /*html*/

    shadow.appendChild(button);
    shadow.appendChild(style);
    this.addListeners();
  }
}

customElements.define("custom-button", Button);
