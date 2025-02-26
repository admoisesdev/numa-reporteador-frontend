import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Image,
} from "@react-pdf/renderer";
import { TableBodyPdf, TableHeaderPdf, TablePdf } from "../pdf";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  logo: {
    width: 210,
    height: 60,
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
    marginVertical: 12,
    marginLeft: 10,
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
    marginLeft: 10,
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  paymentColumn: {
    marginLeft: 10,
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
  },
  tableTitle: {
    marginLeft: 10,
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textTransform: "uppercase",
  },
});

type DataPdf = {
  logo: string;
  title: string;
  subtitle: string;
  date: string;
  info: { key: string; value: string }[];
  paymentInfo: { key: string; value: number }[];
  cancelationColumns: { title: string; subcolumns: string[] }[];
  cancelationRows: string[][][];
}

interface AccountStatementPdfProps {
  data: DataPdf;
}

export const AccountStatusPdf = ({ data }: AccountStatementPdfProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.logo} src={data.logo} />

          <View style={{ flex: 1, flexDirection: "column", gap: 2 }}>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.subtitle}>{data.subtitle}</Text>
          </View>

          <Text style={{ fontSize: 13 }}>{data.date}</Text>
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

        <TablePdf style={{ marginLeft: 10 }}>
          <TableHeaderPdf columns={data.cancelationColumns} />
          <TableBodyPdf rows={data.cancelationRows} />
        </TablePdf>
      </Page>
    </Document>
  );
};
