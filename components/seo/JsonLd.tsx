import { createJsonLd } from "@/lib/seo";

const JsonLd = () => (
  <script
    type="application/ld+json"
    // Escape "<" so the JSON can't close the script tag early.
    dangerouslySetInnerHTML={{
      __html: JSON.stringify(createJsonLd()).replace(/</g, "\\u003c"),
    }}
  />
);

export default JsonLd;
