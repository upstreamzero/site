import type { Metadata } from "next";
import {
  BusinessQuestionPage,
  businessQuestionMetadata,
} from "@/components/BusinessQuestionPage";

export const metadata: Metadata = businessQuestionMetadata("disappeared-after-follow-up");

export default function Page() {
  return <BusinessQuestionPage slug="disappeared-after-follow-up" />;
}
