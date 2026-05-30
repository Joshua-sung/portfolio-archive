import type { Metadata } from "next";
import { Container } from "@/components/container";
import { ResumeDocument } from "@/components/resume-document";

export const metadata: Metadata = {
  title: "경력기술서",
  description: "Growth PM, Operations PM, Data PM 역할을 위한 프로젝트 기반 경력기술서.",
};

export const revalidate = 3600;

export default function KoreanResumePage() {
  return (
    <Container>
      <ResumeDocument locale="ko" />
    </Container>
  );
}
