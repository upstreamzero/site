import type { Metadata } from "next";
import {
  BusinessQuestionPage,
  businessQuestionMetadata,
} from "@/components/BusinessQuestionPage";

export const metadata: Metadata = businessQuestionMetadata("measure-position-improved");

export default function Page() {
  return <BusinessQuestionPage slug="measure-position-improved" />;
}
