import { Text, StyleSheet, View } from "@react-pdf/renderer";
import { PdfLayout, TableBodyPdf, TableHeaderPdf, TablePdf } from ".";
import type { AccountStatusPdfData } from "infrastructure/interfaces";

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 12,
    borderBottom: 1,
    borderBottomColor: "#cad5e2",
  },
  infoColumn: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    marginBottom: 6,
  },
  infoKey: {
    fontSize: 8,
    fontWeight: 700,
    textTransform: "uppercase",
    width: "40%",
    color: "#292b33",
  },
  infoValue: {
    fontSize: 8,
    width: "60%",
    marginRight: 10,
  },
  paymentTitle: {
    fontSize: 9,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  paymentColumn: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  paymentKey: {
    fontSize: 8,
    fontWeight: 700,
    textTransform: "uppercase",
    width: "70%",
    color: "#0f172b",
  },
  paymentValue: {
    fontSize: 8,
    width: "30%",
    textAlign: "right",
  },
  tableTitle: {
    fontSize: 9,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  totalsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 12,
    marginTop: 12,
    borderTop: 1,
    borderTopColor: "#cad5e2",
  },
  totalsColumn: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 2,
    marginBottom: 6,
  },
  totalsKey: {
    fontSize: 8,
    fontWeight: 700,
    width: "55%",
    color: "#292b33",
  },
  totalsValue: {
    fontSize: 8,
    width: "45%",
    marginRight: 10,
  },
});

interface AccountStatementPdfProps {
  data: AccountStatusPdfData;
}

export const AccountStatusPdf = ({ data }: AccountStatementPdfProps) => {
  return (
    <PdfLayout logoUrl={data.logo} title={data.title} subtitle={data.subtitle}>
      <View style={styles.infoContainer}>
        {data.info.map((item, index) => (
          <View key={index} style={styles.infoColumn}>
            <Text style={styles.infoKey}>{item.key}:</Text>
            <Text style={styles.infoValue}>{item.value}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.paymentTitle}>Forma de pago según convenio</Text>

      {data.paymentInfo.map((item, index) => (
        <View key={index} style={styles.paymentColumn}>
          <Text style={styles.paymentKey}>{item.key}:</Text>
          <Text style={styles.paymentValue}>{item.value}</Text>
        </View>
      ))}

      <Text style={styles.tableTitle}>Detalle de cancelaciones</Text>

      <TablePdf>
        <TableHeaderPdf columns={data.cancelationColumns} />
        <TableBodyPdf rows={data.cancelationRows.rows} />
      </TablePdf>

      <View style={styles.totalsContainer}>
        {data.totalsInfo.map((item, index) => (
          <View key={index} style={styles.totalsColumn}>
            <Text style={styles.totalsKey}>{item.key}:</Text>
            <Text style={styles.totalsValue}>{item.value}</Text>
          </View>
        ))}
      </View>
    </PdfLayout>
  );
};
