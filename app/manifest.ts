import type { MetadataRoute } from "next";

export default function manifest():MetadataRoute.Manifest{return {name:"India Evidence Dashboard",short_name:"India Evidence",description:"A politically neutral, source-linked record of what changed and what can be proved across India.",start_url:"/",display:"standalone",background_color:"#fff8e9",theme_color:"#102a2d",icons:[{src:"/favicon.svg",sizes:"any",type:"image/svg+xml"}]};}
