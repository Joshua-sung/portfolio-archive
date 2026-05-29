import type { Metadata } from "next";
import { Container } from "@/components/container";
import { ResumeDocument } from "@/components/resume-document";

export const metadata: Metadata = {
  title: "Career Description",
  description: "Project-based career description for Growth PM, Operations PM, and Data PM roles.",
};

export default function ResumePage() {
  return (
    <Container>
      <ResumeDocument locale="en" />
    </Container>
  );
}
