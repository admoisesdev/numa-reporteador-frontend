import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { PdfLayout } from ".";
import type { ChargedPortfolioPdfData } from "infrastructure/interfaces";

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: "row",
    gap:80,
    paddingVertical: 12,
    borderBottom: 1,
    borderBottomColor: "#cad5e2",
    marginBottom: 10,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    marginBottom: 6,
  },
  infoKey: {
    fontSize: 8,
    fontWeight: 800,
    textTransform: "uppercase",
    color: "#292b33",
  },
  infoValue: {
    fontSize: 8,
  },
});

interface ChargedPortfolioPdfProps {
  data: ChargedPortfolioPdfData;
}

export const ChargedPortfolioPdf = ({ data }: ChargedPortfolioPdfProps) => {
  return (
    <PdfLayout logoUrl={data.logo} title={data.title}>
      <View style={styles.infoContainer}>
        {data.info.map((item, index) => (
          <View key={index} style={styles.info}>
            <Text style={styles.infoKey}>{item.key}:</Text>
            <Text style={styles.infoValue}>{item.value}</Text>
          </View>
        ))}
      </View>
    </PdfLayout>
  );
};
