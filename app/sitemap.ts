import type { MetadataRoute } from "next";
import { jurisdictions } from "../lib/evidence";

const base="https://india-evidence-dashboard-public.vercel.app";
export default function sitemap():MetadataRoute.Sitemap{const updated=new Date();const staticRoutes=["","/catalog","/compare","/corrections","/editorial","/explore","/history","/infrastructure","/infrastructure/registry","/operations","/schemes","/state-packs"];return [...staticRoutes.map(route=>({url:`${base}${route}`,lastModified:updated,changeFrequency:route===""?"daily" as const:"weekly" as const,priority:route===""?1:.7})),...jurisdictions.map(item=>({url:`${base}/state/${item.slug}`,lastModified:updated,changeFrequency:"weekly" as const,priority:.8}))];}
