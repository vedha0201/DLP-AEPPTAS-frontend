import { createFileRoute } from "@tanstack/react-router";
import { DlpApp } from "../components/dlp/shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Data Classification | AepttasShield Enterprise DLP" },
      { name: "description", content: "Discover, classify and monitor sensitive enterprise data with AepttasShield." },
      { property: "og:title", content: "Data Classification | AepttasShield" },
      { property: "og:description", content: "Enterprise-wide sensitive data classification and monitoring." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <DlpApp />;
}
