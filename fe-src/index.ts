import "./router";
import "./pages/home";
import "./pages/auth";
import "./pages/profile";
import "./pages/reported-pets";
import "./pages/report-pet";
import "./pages/edit-pet";
import "./components/header";
import "./components/button";
import "./components/loader";
import { state } from "./state";

(function () {
  state.init();
})();
