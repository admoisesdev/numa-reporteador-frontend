import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Image,
} from "@react-pdf/renderer";
import { TableBodyPdf, TableHeaderPdf, TablePdf, type TableBodyProps } from "../pdf";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  logo: {
    width: 150,
    height: 50,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 13,
    textAlign: "center",
  },
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



export type DataPdf = {
  logo: string;
  title: string;
  subtitle: string;
  info: { key: string; value: string }[];
  paymentInfo: { key: string; value: string }[];
  cancelationColumns: { title: string; subcolumns: string[] }[];
  cancelationRows: { rows: { mainRow: string[][]; subRows?: string[][]}[] };
  totalsInfo: { key: string; value: number | string }[];
};

interface AccountStatementPdfProps {
  data: DataPdf;
}

export const AccountStatusPdf = ({ data }: AccountStatementPdfProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.logo} src={data.logo} />

          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.subtitle}>{data.subtitle}</Text>
          </View>
        </View>

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
      </Page>
    </Document>
  );
};
