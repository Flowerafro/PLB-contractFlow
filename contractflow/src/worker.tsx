import { render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";
import { Document } from "@/app/Document";
import { setCommonHeaders } from "@/app/headers";
import { Home } from "@/app/pages/Home";
import { Login } from "@/app/pages/Login";
import Dashboard from "@/app/pages/Dashboard";
import CreateContract from "@/app/pages/CreateContract";
import ContractTerms from "@/app/pages/ContractTerms";
import ContractSuccess from "@/app/pages/ContractSuccess";
import ClientOverview from "@/app/pages/ClientOverview";
import Tables from "@/app/pages/Tables";
import style from "./app/index.css";




export type AppContext = {};

export default defineApp([
  setCommonHeaders(),
  ({ ctx }) => {
    // setup ctx here
    ctx;
  },
render(Document, [
    route("/", () => <Login />), // default rute er login for å simulere beskyttet side
    route("/Home", () => <Home />),
    route("/create", () => <CreateContract />),
    route("/terms", () => <ContractTerms />), 
    route("/success", () => <ContractSuccess />),
    route("/clients", () => <ClientOverview />),
    route("/tables", () => <Tables />),

  ]),
]);
