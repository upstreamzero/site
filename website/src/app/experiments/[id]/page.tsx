import { makeObjectRoute } from "@/lib/objectRoute";
const r = makeObjectRoute("experiment");
export const generateStaticParams = r.generateStaticParams;
export const generateMetadata = r.generateMetadata;
export const dynamicParams = false;
export default r.Page;
