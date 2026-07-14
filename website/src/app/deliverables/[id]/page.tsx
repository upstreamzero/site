import { makeObjectRoute } from "@/lib/objectRoute";
const r = makeObjectRoute("deliverable");
export const generateStaticParams = r.generateStaticParams;
export const dynamicParams = false;
export default r.Page;
