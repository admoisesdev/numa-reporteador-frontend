import { PdfLayout, TableBodyPdf, TableHeaderPdf, TablePdf } from ".";

import type { ChargedPortfolioPdfData } from "infrastructure/interfaces";
import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 60,
    padding: 12,
    borderBottom: 1,
    borderBottomColor: "#cad5e2",
    marginBottom: 10,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    marginBottom: 6,
    fontSize: 8,
  },
  infoKey: {
    fontSize: 12,
    fontWeight: 800,
    textTransform: "uppercase",
    color: "#292b33",
  },
  infoValue: {
    fontSize: 12,
  },
});

interface ChargedPortfolioPdfProps {
  data: ChargedPortfolioPdfData;
}

export const ChargedPortfolioPdf = ({ data }: ChargedPortfolioPdfProps) => {
  return (
    <PdfLayout
      logoUrl={data.logo}
      title={data.title}
      orientation="landscape"
      pageStyle={{ padding: 0 }}
    >
      <View style={styles.infoContainer}>
        {data.info.map((item, index) => (
          <View key={index} style={styles.info}>
            <Text style={styles.infoKey}>{item.key}:</Text>
            <Text style={styles.infoValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      <TablePdf>
        <TableHeaderPdf columns={data.contractsChargesColumns} />
        <TableBodyPdf rows={data.contractsChargesRows.rows} />
      </TablePdf>
    </PdfLayout>
  );
};
