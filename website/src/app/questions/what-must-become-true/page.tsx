import type { Metadata } from "next";
import {
  BusinessQuestionPage,
  businessQuestionMetadata,
} from "@/components/BusinessQuestionPage";

export const metadata: Metadata = businessQuestionMetadata("what-must-become-true");

export default function Page() {
  return <BusinessQuestionPage slug="what-must-become-true" />;
}
