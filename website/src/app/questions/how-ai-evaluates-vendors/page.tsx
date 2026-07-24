import type { Metadata } from "next";
import {
  BusinessQuestionPage,
  businessQuestionMetadata,
} from "@/components/BusinessQuestionPage";

export const metadata: Metadata = businessQuestionMetadata("how-ai-evaluates-vendors");

export default function Page() {
  return <BusinessQuestionPage slug="how-ai-evaluates-vendors" />;
}
