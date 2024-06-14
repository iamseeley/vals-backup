import handler from "https://esm.town/v/maxm/staticChess";
import { pwa } from "https://esm.town/v/pomdtr/pwa";

export default pwa(handler, {
  name: "Static Chess",
  display: "standalone",
  background_color: "#ffffff",
  start_url: "/",
});