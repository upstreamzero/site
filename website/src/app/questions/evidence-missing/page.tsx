import type { Metadata } from "next";
import {
  BusinessQuestionPage,
  businessQuestionMetadata,
} from "@/components/BusinessQuestionPage";

export const metadata: Metadata = businessQuestionMetadata("evidence-missing");

export default function Page() {
  return <BusinessQuestionPage slug="evidence-missing" />;
}
