import { render, route, prefix } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";
import { Document } from "./app/Document";
import { setCommonHeaders } from "./app/headers";
import { Home } from "./app/pages/Home";
import { Login } from "./app/pages/Login";
import Archive from "./app/pages/Archive";
import Dashboard from "./app/pages/Dashboard";
import CreateContract from "./app/pages/CreateContract";
import Layout from "./app/pages/Layout";
import ContractSuccess from "./app/pages/ContractSuccess";
import ClientOverview from "./app/pages/ClientOverview";
import Tables from "./app/pages/Tables";
import { hovedListenRoutes } from "./features/dataRetrieval/hovedListenRoutes";
import { clientRoutes } from "./features/clients/clientRoutes";
import { UserSession } from "./sessions/UserSession";
import { getDb } from "./db/index";
import type { D1Database } from '@cloudflare/workers-types';
import {contracts } from "./db/schema/schema";
import { env } from "cloudflare:workers"

type DB = D1Database;

/*declare global {
  var DB: D1Database;
}
*/

// Authentication check using cookies
function requireAuth(request: Request) {
  // Check for user session in cookies
  const cookies = request.headers.get('Cookie');
  if (cookies && cookies.includes('user_session=')) {
    return true; // User has session
  }
  
  // For simple testing, we'll redirect to login
  return Response.redirect(new URL('/Login', request.url), 302);
}

export interface Env {
   CLOUDFLARE_ACCOUNT_ID: string;
   R2_BUCKET_NAME: string;
   R2: R2Bucket; 
   DB: DB;
   R2_SECRET_ACCESS_KEY: string;
   R2_ACCESS_KEY_ID: string;
}

export type AppContext = {
  env: Env;
  user?: any;
};

export default defineApp([

  setCommonHeaders(),
  
  
  ({ ctx }) => {
/*
    if (ctx && ctx.env && ctx.env.DB) {
      // Ensure only D1Database is assigned to globalThis.DB
      globalThis.DB = (ctx.env.DB as unknown as D1Database);
    }
*/
    },

  prefix("/api/v1/hovedlisten/", hovedListenRoutes),

  //prefix("/api/v1/clients", clientRoutes),
  //prefix("/api/v1/contracts", contractRoutes),


  route("/api/v1/hovedlisten/", async ({ ctx }) => {
    try {
      const db = getDb(ctx.env);

      const r2 = ctx.env.R2;

      const secretAccess = ctx.env.R2_SECRET_ACCESS_KEY;
      const apiKey = ctx.env.R2_ACCESS_KEY_ID;

      return Response.json({
        dbConnected: !!db,
        r2Connected: !!r2,
        secretAccess,
        apiKey
      });
    }
    catch (error) {
      return Response.json({
        success: false,
        error: error instanceof Error ? error.message : String(error)
      }, { status: 500 }
      )
    }
  }),

  // Seed route(testing)
  route("/seed/", async ({ ctx }) => {
    try {
      const { seedData } = await import("./db/seedHovedlisten");
      await seedData(ctx.env);
      return Response.json({ success: true, message: "Database seeded successfully" });
    } catch (error) {
      console.error("Error seeding database:", error);
      return Response.json({
        success: false,
        error: "Failed to seed database",
      }, { status: 500 });
    }
  }),

// Vil på sikt forenes med R2 upload arbeidet:  
  route("/upload/", async ({ request, ctx }) => {
    try {
      const formData = await request.formData();
      const data = new FormData();
      const file = formData.get('file') as File;
       
      if (!file) {
        return Response.json({ error: 'No file provided' }, { status: 400 });
      }
      
/*      
      if (typeof process !== 'undefined' && process.versions && process.versions.node) {
        const fs = await import('fs/promises');
        const path = await import('path');
        const uploadDir = 'C:/Users/pa-te/Documents/Studierelatert2025_2026/ITF31619_Webapplikasjoner/ProsjektOppgave/PLB-contactFlow/contractflow/.wrangler/state/v3/r2/plb-contractflow-r2';
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = path.join(uploadDir, fileName);

        await fs.mkdir(uploadDir, {recursive: true});

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        await fs.writeFile(filePath, buffer);

        return Response.json({
          success: true,
          fileName,
          path: filePath,
          message: 'File saved locally'
        });
      }   
*/

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
          fileName: file.name,
          url: `/storage/dev-${Date.now()}-${file.name}`,
          message: 'Upload simulated (development mode). Deploy to Cloudflare or use "wrangler dev --remote" for real uploads.'
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

  route("/api/r2-files", async ({ ctx }) => {
    try {
      const listResponse = await ctx.env.R2.list();
      const files = listResponse.objects.map(obj => ({
        fileName: obj.key,
        size: obj.size,
        uploaded: obj.uploaded,
// Her kan det legges til flere metadata typer (selskap, conract, osv)
// Interface for generiske filer?
      }));
    return Response.json(files);
    } catch (error) {
      return Response.json({ error: 'Failes to fetch files' }, { status: 500 });
    }
  }),

  render(Document, [
    route("/", () => <Login />), // default route is login
    route("/Login", () => <Login />),
    
    // Protected routes - require authentication  
    route("/Home", ({ request }) => {
      const authResult = requireAuth(request);
      if (authResult instanceof Response) return authResult;
      return <Home />;
    }),
    route("/Dashboard", ({ request }) => {
      const authResult = requireAuth(request);
      if (authResult instanceof Response) return authResult;
      return <Dashboard />;
    }),
    route("/create", ({ request }) => {
      const authResult = requireAuth(request);
      if (authResult instanceof Response) return authResult;
      return <Layout><CreateContract /></Layout>;
    }),
    route("/success", ({ request }) => {
      const authResult = requireAuth(request);
      if (authResult instanceof Response) return authResult;
      return <Layout><ContractSuccess /></Layout>;
    }),
    route("/clients", ({ request }) => {
      const authResult = requireAuth(request);
      if (authResult instanceof Response) return authResult;
      return <Layout><ClientOverview /></Layout>;
    }),
    route("/clients/:id", ({ request, params }) => {
      const authResult = requireAuth(request);
      if (authResult instanceof Response) return authResult;
      return <Layout><ClientOverview clientId={params.id} /></Layout>;
    }),
    route("/tables", ({ request }) => {
      const authResult = requireAuth(request);
      if (authResult instanceof Response) return authResult;
      return <Layout><Tables /></Layout>;
    }),
    route("/archive", ({ request }) => {
      const authResult = requireAuth(request);
      if (authResult instanceof Response) return authResult;
      return <Layout><Archive /></Layout>;
    })
  ]),
  
]);

// Export Durable Objects
export { UserSession };
