import { makeObjectRoute } from "@/lib/objectRoute";
const r = makeObjectRoute("capability");
export const generateStaticParams = r.generateStaticParams;
export const dynamicParams = false;
export default r.Page;
