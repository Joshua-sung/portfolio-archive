import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PrintButton } from "@/components/print-button";
import { ResumeDocument } from "@/components/resume-document";

export const metadata: Metadata = {
  title: "Career Description",
  description: "Project-based career description for Growth PM, Operations PM, and Data PM roles.",
};

export const revalidate = 3600;

export default function ResumePage() {
  return (
    <Container>
      <div className="flex justify-end pt-6 print:hidden">
        <PrintButton label="Save as PDF" />
      </div>
      <ResumeDocument locale="en" />
    </Container>
  );
}
