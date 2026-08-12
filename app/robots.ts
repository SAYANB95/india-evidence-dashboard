import type { MetadataRoute } from "next";

export default function robots():MetadataRoute.Robots{return {rules:{userAgent:"*",allow:"/",disallow:["/editorial/manage","/api/"]},sitemap:"https://india-evidence-dashboard-public.vercel.app/sitemap.xml"};}
