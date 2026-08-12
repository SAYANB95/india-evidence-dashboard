import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return <main className="auth-page"><div><Link className="record-brand" href="/"><span className="brand-mark"/><b>India Evidence <em>Dashboard</em></b></Link><p className="eyebrow">Protected editorial access</p><h1>Sign in to review evidence.</h1><p>Public evidence remains open. This account area is only for named reviewers whose actions are written to the audit trail.</p></div><SignIn path="/sign-in" routing="path" fallbackRedirectUrl="/editorial/manage" /></main>;
}
