import { route } from "rwsdk/router";
import type { RequestInfo } from "rwsdk/worker";

export const contractTestRoutes = [
    route("/", async ({ request, ctx }: RequestInfo) => {
        if (request.method === "GET") {
            try {
                if (!ctx?.env?.DB) {
                    return Response.json(
                        { 
                            success: false, 
                            error: "Database not available" 
                        }, 
                        { status: 500 }
                    );
                }

                // Use native D1 API
                const stmt = ctx.env.DB.prepare("SELECT * FROM contracts ORDER BY created_at DESC");
                const { results } = await stmt.all();

                // Transform to match ContractTest interface
                const transformedData = results.map((row: any) => ({
                    id: row.id,
                    plbReference: row.plb_reference,
                    clientId: row.client_id,
                    principalId: row.principal_id,
                    productCode: row.product_code,
                    orderDate: row.order_date,
                    tonnPerFcl: row.tonn_per_fcl,
                    priceUsdPerMtC: row.price_usd_per_mt_c,
                    totalUsdC: row.total_usd_c,
                    commissionGroupBp: row.commission_group_bp,
                    customerOrderNo: row.customer_order_no,
                    principalContractNo: row.principal_contract_no,
                    principalContractDate: row.principal_contract_date,
                    principalOrderNo: row.principal_order_no,
                    status: row.status,
                    createdAt: row.created_at,
                }));

                return Response.json({ success: true, data: transformedData });
            } catch (error) {
                console.error("Error fetching contract test data:", error);
                return Response.json(
                    { 
                        success: false, 
                        error: "Failed to fetch contract test data" 
                    }, 
                    { status: 500 }
                );
            }
        }
        return Response.json({ error: "Method not allowed" }, { status: 405 });
    }),

    route("/:id", async ({ request, params, ctx }: RequestInfo) => {
        if (request.method === "GET") {
            try {
                const id = parseInt(params.id as string);
                if (isNaN(id)) {
                    return Response.json(
                        { 
                            success: false, 
                            error: "Invalid contract ID" 
                        }, 
                        { status: 400 }
                    );
                }

                if (!ctx?.env?.DB) {
                    return Response.json(
                        { 
                            success: false, 
                            error: "Database not available" 
                        }, 
                        { status: 500 }
                    );
                }

                // Use native D1 API
                const stmt = ctx.env.DB.prepare("SELECT * FROM contracts WHERE id = ?").bind(id);
                const row = await stmt.first();

                if (!row) {
                    return Response.json(
                        { 
                            success: false, 
                            error: "Contract not found" 
                        }, 
                        { status: 404 }
                    );
                }

                const transformedData = {
                    id: row.id,
                    plbReference: row.plb_reference,
                    clientId: row.client_id,
                    principalId: row.principal_id,
                    productCode: row.product_code,
                    orderDate: row.order_date,
                    tonnPerFcl: row.tonn_per_fcl,
                    priceUsdPerMtC: row.price_usd_per_mt_c,
                    totalUsdC: row.total_usd_c,
                    commissionGroupBp: row.commission_group_bp,
                    customerOrderNo: row.customer_order_no,
                    principalContractNo: row.principal_contract_no,
                    principalContractDate: row.principal_contract_date,
                    principalOrderNo: row.principal_order_no,
                    status: row.status,
                    createdAt: row.created_at,
                };

                return Response.json({ success: true, data: transformedData });
            } catch (error) {
                console.error("Error fetching contract test by ID:", error);
                return Response.json(
                    { 
                        success: false, 
                        error: "Failed to fetch contract test" 
                    }, 
                    { status: 500 }
                );
            }
        }
        return Response.json({ error: "Method not allowed" }, { status: 405 });
    }),
];