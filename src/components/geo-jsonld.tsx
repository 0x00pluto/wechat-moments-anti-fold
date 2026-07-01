import { buildGeoJsonLd } from "@/lib/geo";

export function GeoJsonLd() {
  const jsonLd = buildGeoJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
