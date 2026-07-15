import { makeObjectRoute } from "@/lib/objectRoute";
export const dynamic = "force-static";
const r = makeObjectRoute("observation");
export const generateStaticParams = r.generateStaticParams;
export const generateMetadata = r.generateMetadata;
export const dynamicParams = false;
export default r.Page;
