import { render, route, prefix } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";
import { Document } from "./app/Document";
import { setCommonHeaders } from "./app/headers";
import { Home } from "./app/pages/Home";
import { Login } from "./app/pages/Login";
import Archive from "./app/pages/Archive";
//import Dashboard from "./app/pages/Dashboard";
import CreateContract from "./app/pages/CreateContract";
import Layout from "./app/pages/Layout";
import ContractSuccess from "./app/pages/ContractSuccess";
import ClientOverview from "./app/pages/ClientOverview";
import Tables from "./app/pages/Tables";
import { hovedListenRoutes } from "./features/databaseDataRetrieval/hovedListenRoutes";
//import { clientRoutes } from "./features/clients/clientRoutes";



declare global {
  var DB: D1Database | undefined;
  var R2: R2Bucket | undefined;
}


interface Env {
   CLOUDFLARE_ACCOUNT_ID: string;
   R2_BUCKET_NAME: string;
   R2: R2Bucket; 
   DB: D1Database
}

export type AppContext = {
  env: Env;
  user?: any;
};

export default defineApp([

  setCommonHeaders(),
  ({ ctx }) => {
    // Make DB available globally for Drizzle (only if env and DB exist)
//    if (ctx && ctx.env && ctx.env.DB) {
    if (ctx?.env?.DB) {
      globalThis.DB = ctx.env.DB;
    }
  },

  // API  for database access
  prefix("/api/v1/hovedlisten", hovedListenRoutes),

  //prefix("/api/v1/clients", clientRoutes),
  //prefix("/api/v1/contracts", contractRoutes),



  // Seed route(testing)
  route("/seed", async ({ ctx }) => {
    try {
      const { seedData } = await import("./db/seedHovedlisten");
      await seedData(ctx?.env);
      return Response.json({ success: true, message: "Database seeded successfully" });
    } catch (error) {
      console.error("Error seeding database:", error);
      return Response.json({
        success: false,
        error: "Failed to seed database",
. Deploy to Cloudflare or use "wrangler dev --remote" for real uploads.'
         });
      }
   
      const timestamp = Date.now();
      const fileName = `${timestamp}-${file.name}`;
      //const fileBuffer = await file.arrayBuffer();
          const r2ObjectKey = `/storage/${file.name}`;
   
        await ctx.env.R2.put(r2ObjectKey, file.stream(), {
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
    route("/create", () => <Layout><CreateContract /></Layout>),
    route("/success", () => <Layout><ContractSuccess /></Layout>),
    route("/clients", () => <Layout><ClientOverview /></Layout>),
    route("/clients/:id", (({params}) => <Layout><ClientOverview clientId={params.id} /></Layout>)),
    route("/tables", () => <Layout><Tables /></Layout>),
    route("/archive", () => <Layout><Archive /></Layout>)
  ]),
  
]);
// // // // // // // // // // // // 