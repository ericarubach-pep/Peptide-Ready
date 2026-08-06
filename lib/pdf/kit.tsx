import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

import type { ContentFile } from "@/lib/content/mdx";
import type { PeptideFrontmatter } from "@/lib/content/schema";
import type { Organization } from "@/types/database";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, fontFamily: "Helvetica" },
  header: { marginBottom: 16, borderBottom: 1, borderBottomColor: "#e2e8f0", paddingBottom: 12 },
  orgName: { fontSize: 16, fontWeight: 700 },
  watermark: { fontSize: 8, color: "#64748b", marginTop: 4 },
  peptideTitle: { fontSize: 14, fontWeight: 700, marginTop: 20, marginBottom: 6 },
  disclaimer: { fontSize: 9, color: "#78350f", backgroundColor: "#fffbeb", padding: 8, marginBottom: 10 },
  body: { fontSize: 10, lineHeight: 1.5, color: "#1e293b" },
  footer: { position: "absolute", bottom: 24, left: 40, right: 40, fontSize: 8, color: "#94a3b8", textAlign: "center" },
});

// Section 8.2 downloadable content kit + Section 9.2's mandated patient
// handout watermark ("For Educational Use Only — Provide Under Physician
// Supervision") and Section 9.1 tier-specific disclaimer, both rendered on
// every page of the export.
export function ContentKitDocument({
  org,
  peptides,
}: {
  org: Organization;
  peptides: ContentFile<PeptideFrontmatter>[];
}) {
  const disclaimer =
    org.tier === "enterprise"
      ? "Regulatory status may change. Verify at FDA.gov. This does not constitute legal or compliance advice."
      : "Educational purposes only. Not medical advice. Consult a licensed provider before starting any peptide protocol.";

  return (
    <Document>
      {peptides.map((peptide) => (
        <Page key={peptide.frontmatter.slug} size="LETTER" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.orgName}>{org.display_name ?? org.org_name}</Text>
            <Text style={styles.watermark}>For Educational Use Only — Provide Under Physician Supervision</Text>
          </View>
          <Text style={styles.disclaimer}>{disclaimer}</Text>
          <Text style={styles.peptideTitle}>{peptide.frontmatter.name}</Text>
          <Text style={styles.body}>{peptide.body.replace(/[#*_>`]/g, "").trim()}</Text>
          <Text
            style={styles.footer}
            render={({ pageNumber }) =>
              org.attribution_visible ? `Content by PeptideReady · Page ${pageNumber}` : `Page ${pageNumber}`
            }
            fixed
          />
        </Page>
      ))}
    </Document>
  );
}
