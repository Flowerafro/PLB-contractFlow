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
import { UserSession } from "./sessions/UserSession";
import type { D1Database, R2Bucket } from '@cloudflare/workers-types';
import { env } from "cloudflare:workers"
import { hovedListenRepository } from "./features/databaseViews/repositoryPatterns/createHovedListenRepository";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { createClientController, createClientRoutes } from "./features/databaseDataRetrieval/utilizations/clients";
import { createContractController, createContractRoutes } from "./features/databaseDataRetrieval/utilizations/contracts";
import { createHovedListenController } from "./features/databaseViews/controllers/hovedListenController";

// type DB = D1Database;

/*declare global {
  var DB: D1Database;
}
*/


function requireAuth(request: Request) {
  
  const cookies = request.headers.get('Cookie');
  if (cookies && cookies.includes('user_session=')) {
    return true; 
  }
  
  return Response.redirect(new URL('/Login', request.url), 302);
}

export interface Env {
   CLOUDFLARE_ACCOUNT_ID: string;
   R2_BUCKET_NAME: string;
   R2: R2Bucket; 
   DB: D1Database;
   R2_SECRET_ACCESS_KEY: string;
   R2_ACCESS_KEY_ID: string;
}

export type AppContext = {
  env: Env;
  user?: any;
};

export default defineApp([

  setCommonHeaders(),
  //prefix("/api/contracts", contractRoutes),

  
  ({ ctx }) => {

    },

 // prefix("/api/v1/hovedlisten", hovedListenRoutes),
  prefix("/api/v1/clients", createClientRoutes({ DB: env.DB })),
  prefix("/api/v1/contracts", createContractRoutes({ DB: env.DB })),


  route("/hovedlisten", (ctx) => {
    const controller = createHovedListenController(hovedListenRepository, { DB: env.DB });
    return controller.list(ctx);
  }),

  // Seed route(testing)
  route("/seed", async ({ ctx }) => {
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

  route("/upload", async ({ request, ctx }) => {
    try {
      const formData = await request.formData();
      const data = new FormData();
      const file = formData.get('file') as File;
      
      if (!file) {
        return Response.json({ error: 'No file provided' }, { status: 400 });
      }
      
      const timestamp = Date.now();
      const fileName = `${timestamp}-${file.name}`;
      const r2ObjectKey = `${file.name}`;
   
      await env.R2.put(r2ObjectKey, file.stream(), {
        httpMetadata: {
          contentType: file.type,
        },
      });

      return Response.json({ 
        success: true,
        fileName: file.name,
        url: `/dev-${Date.now()}-${file.name}`,
        message: 'File uploaded to R2 successfully'});

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

  route("/plb-contractflow-r2", async ({ request, ctx }) => {
    
    try {
      const url = new URL(request.url);
      const page = parseInt(url.searchParams.get('page') || '1');
      const limit = parseInt(url.searchParams.get('limit') || '10');
      const r2 = env.R2;

      if (!r2) {
        console.error("R2 binding is missing!");
        return Response.json({ error: "R2 binding is missing" }, { status: 500 });
      }
      const listResponse = await env.R2.list();
      console.log("R2 objects:", listResponse.objects);
      const allFiles = listResponse.objects.map(obj => ({
        fileName: obj.key,
        size: obj.size,
        uploaded: obj.uploaded,
// Her kan det legges til flere metadata typer (selskap, conract, osv)
// Interface for generiske filer?
      }));
      const paginatedFiles = allFiles.slice((page - 1) * limit, page * limit);
      return Response.json({ files: paginatedFiles, total: allFiles.length })
    } catch (error) {
      return Response.json({ error: 'Failed to fetch files' }, { status: 500 });
    }
  }),

  route("/plb-contractflow-r2/*", async ({ request, ctx }) => {
    try {
      const url = new URL(request.url);
      const path = url.pathname.replace('/plb-contractflow-r2', '');
      const r2 = env.R2;

      if (!r2) {
        return new Response('R2 binding missing', { status: 500 });
      }

      const object = await r2.get(path);
      if (!object) {
        return new Response('File not found', { status: 404 });
      }

      const headers = new Headers();
      if (object.httpMetadata?.contentType) {
        headers.set('Content-Type', object.httpMetadata.contentType);
      }

      return new Response(object.body, { headers });
    } catch (error) {
      console.error('Error fetching file:', error);
      return new Response('Internal server error', { status: 500 });
    }
  }),
  
  route("/api/generated-pdf", async ({ request }) => {
    const url = new URL(request.url);

    const uploaded = url.searchParams.get("uploaded") || "";
    const fileName = url.searchParams.get("fileName") || "";
    const fullFileName = url.searchParams.get("fullFileName") || "";
    const size = url.searchParams.get("size") || "";

  
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    page.drawText("Archive Document", {
      x: 50,
      y: 760,
      size: 22,
      font,
      color: rgb(0, 0, 0),
    });

    let y = 720;
    const step = 22;

    const add = (label: string, value: string) => {
      page.drawText(`${label}: ${value}`, {
        x: 50,
        y,
        size: 14,
        font,
        color: rgb(0, 0, 0),
      });
      y -= step;
    };

    add("Date", uploaded);
    add("Filename", fileName);
    add("Full filename", fullFileName);
    add("Size", size);

    const pdfBytes = await pdfDoc.save();

    
    return new Response(pdfBytes, {
      headers: {
        "Content-Type": "application/pdf",
        "Cache-Control": "no-store",
      },
    });
  }),

  route("/api/clients", async (ctx) => {
    const method = ctx.request.method.toLowerCase();
    const controller = createClientController({ DB: env.DB });
    switch (method) {
      case "get":
        return controller.list(ctx);
      case "post":
        return controller.create(ctx);
      default:
        return new Response("Method Not Allowed", { status: 405 });
    }
  }),
  route("/api/clients/search", (ctx) => {
    const controller = createClientController({ DB: env.DB });
    return controller.search(ctx);
  }),
  route("/api/clients/:id", async (ctx) => {
    const method = ctx.request.method.toLowerCase();
    const controller = createClientController({ DB: env.DB });
    switch (method) {
      case "get":
        return controller.get(ctx);
      case "put":
        return controller.update(ctx);
      case "delete":
        return controller.delete(ctx);
      default:
        return new Response("Method Not Allowed", { status: 405 });
    }
  }),

  route("/api/contracts", async (ctx) => {
    const method = ctx.request.method.toLowerCase();
    const controller = createContractController({ DB: env.DB });
    switch (method) {
      case "get":
        return controller.list(ctx);
      case "post":
        return controller.create(ctx);
      default:
        return new Response("Method Not Allowed", { status: 405 });
    }
  }),
  route("/api/contracts/search", (ctx) => {
    const controller = createContractController({ DB: env.DB });
    return controller.search(ctx);
  }),
  route("/api/contracts/:id", async (ctx) => {
    const method = ctx.request.method.toLowerCase();
    const controller = createContractController({ DB: env.DB });
    switch (method) {
      case "get":
        return controller.get(ctx);
      case "put":
        return controller.update(ctx);
      case "delete":
        return controller.delete(ctx);
      default:
        return new Response("Method Not Allowed", { status: 405 });
    }
  }),

  render(Document, [
    route("/", () => <Login />), 
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
