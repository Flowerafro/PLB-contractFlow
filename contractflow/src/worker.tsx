import { render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/app/Document";
import { setCommonHeaders } from "@/app/headers";
import { Home } from "@/app/pages/Home";
import { Login } from "@/app/pages/Login";
import CreateContract from "@/app/pages/CreateContract";
import ContractTerms from "@/app/pages/ContractTerms";



export type AppContext = {};

export default defineApp([
  setCommonHeaders(),
  ({ ctx }) => {
    // setup ctx here
    ctx;
  },
render(Document, [
    route("/", () => <Login />), // default route is now login
    route("/Home", () => <Home />),
    route("/create", () => <CreateContract />),
    route("/terms", () => <ContractTerms />),

    

  ]),
]);
