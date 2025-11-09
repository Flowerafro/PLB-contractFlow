import { render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";
import { Document } from "@/app/Document";
import { setCommonHeaders } from "@/app/headers";
import { Home } from "@/app/pages/Home";
import { Login } from "@/app/pages/Login";
import Archive from "@/app/pages/Archive";
import Dashboard from "@/app/pages/Dashboard";
import CreateContract from "@/app/pages/CreateContract";
import ContractSuccess from "@/app/pages/ContractSuccess";
import ClientOverview from "@/app/pages/ClientOverview";
import Tables from "@/app/pages/Tables";
import {env} from "cloudflare:workers"
import style from "./app/index.css";

interface Env {
   CLOUDFLARE_ACCOUNT_ID: string;
   R2_BUCKET_NAME: string;
   R2: R2Bucket; 
}

export type AppContext = {
  env: Env;
};

export default defineApp([

  setCommonHeaders(),
  ({ ctx }) => {
    // setup ctx here
    ctx;
  },
  route("/upload/", async ({ request }) => {
    try {
      
       const formData = await request.formData();
       const data = new FormData();
       const file = formData.get('file') as File;
      console.log("file", file);
       
       if (!file) {
      if (!file) {
         return Response.json({ error: 'No file provided' }, { status: 400 });
       }
      }
   
       const timestamp = Date.now();
       const fileName = `${timestamp}-${file.name}`;
       //const fileBuffer = await file.arrayBuffer();
           const r2ObjectKey = `/storage/${file.name}`;
   
        await env.R2.put(r2ObjectKey, file.stream(), {
         httpMetadata: {
           contentType: file.type,
         },
       });
   
       return Response.json({ 
         success: true, 
         fileName,
         url: r2ObjectKey ,
         message: 'File uploaded successfully' 
       });
   
     } catch (error) {
       console.error('R2 upload error:', error);
       return Response.json({ 
         error: 'Failed to upload file' 
       }, { status: 500 });
     }
  }),

  render(Document, [
    route("/", () => <Login />), // default rute er login for å simulere beskyttet side
    route("/Home", () => <Home />),
    route("/create", () => <CreateContract />),
    route("/success", () => <ContractSuccess />),
    route("/clients", () => <ClientOverview />),
    route("/clients/:id", (({params}) => <ClientOverview clientId={params.id} />)),
    route("/tables", () => <Tables />),
    route("/archive", () => <Archive />),
    route("/archive", () => <Archive />)
  ]),
  
]);
