import type { Metadata } from "next";
import {
  BusinessQuestionPage,
  businessQuestionMetadata,
} from "@/components/BusinessQuestionPage";

export const metadata: Metadata = businessQuestionMetadata("another-vendor-won");

export default function Page() {
  return <BusinessQuestionPage slug="another-vendor-won" />;
}
