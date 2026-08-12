import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

function isPrivateAddress(address:string){
  const normalized=address.toLowerCase().replace(/^::ffff:/,"");
  if(normalized==="::1" || normalized==="::" || normalized.startsWith("fc") || normalized.startsWith("fd") || normalized.startsWith("fe8") || normalized.startsWith("fe9") || normalized.startsWith("fea") || normalized.startsWith("feb")) return true;
  if(isIP(normalized)!==4) return false;
  const parts=normalized.split(".").map(Number);
  return parts[0]===10 || parts[0]===127 || parts[0]===0 || (parts[0]===169&&parts[1]===254) || (parts[0]===172&&parts[1]>=16&&parts[1]<=31) || (parts[0]===192&&parts[1]===168) || (parts[0]===100&&parts[1]>=64&&parts[1]<=127) || parts[0]>=224;
}

export async function assertPublicHttpsUrl(rawUrl:string){
  const url=new URL(rawUrl);
  if(url.protocol!=="https:" || url.username || url.password || url.port) throw new Error("Only credential-free HTTPS source URLs are allowed.");
  if(url.hostname==="localhost" || isIP(url.hostname) && isPrivateAddress(url.hostname)) throw new Error("Private source targets are blocked.");
  const addresses=await lookup(url.hostname,{all:true,verbatim:true});
  if(!addresses.length || addresses.some(({address})=>isPrivateAddress(address))) throw new Error("Source hostname resolved to a private or invalid address.");
  return url;
}

export async function safeSourceFetch(rawUrl:string,init:RequestInit){
  let current=await assertPublicHttpsUrl(rawUrl);
  for(let redirects=0;redirects<=5;redirects+=1){
    const response=await fetch(current,{...init,redirect:"manual"});
    if(response.status<300 || response.status>=400) return response;
    const location=response.headers.get("location");
    if(!location) return response;
    current=await assertPublicHttpsUrl(new URL(location,current).toString());
  }
  throw new Error("Source exceeded the redirect limit.");
}
