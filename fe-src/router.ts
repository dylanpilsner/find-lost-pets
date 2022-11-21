import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  {
    path: "/home",
    component: "home-page",
  },
  {
    path: "/auth-page",
    component: "auth-page",
  },
]);
if (location.pathname == "/") {
  Router.go("/home");
}

export { Router };
