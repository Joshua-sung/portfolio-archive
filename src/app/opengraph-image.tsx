import { ImageResponse } from "next/og";

export const alt = "Joshua Sung — Growth & Operations PM portfolio with measurable business impact";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const metrics = [
  { value: "78.6x", label: "Weekly view lift" },
  { value: "252h/yr", label: "Reporting time saved" },
  { value: "4.21x", label: "QA throughput" },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: "#090909",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#FE5B2C",
            }}
          >
            Growth PM · Operations PM · Data PM
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
            }}
          >
            Joshua Sung
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              maxWidth: 900,
              fontSize: 34,
              lineHeight: 1.35,
              color: "#d4d4d4",
            }}
          >
            I connect operational execution to measurable business impact.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", gap: 20 }}>
            {metrics.map((metric) => (
              <div
                key={metric.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "24px 32px",
                  borderRadius: 20,
                  backgroundColor: "#141414",
                  border: "1px solid #262626",
                }}
              >
                <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: "#FE5B2C" }}>
                  {metric.value}
                </div>
                <div style={{ display: "flex", marginTop: 8, fontSize: 20, color: "#a3a3a3" }}>
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 36,
              fontSize: 22,
              color: "#737373",
            }}
          >
            <div style={{ display: "flex" }}>portfolio-archive-blue.vercel.app</div>
            <div style={{ display: "flex" }}>github.com/Joshua-sung</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
