import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  header: {
    flexDirection: "row",
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
});

interface PdfLayoutProps { 
  children: React.ReactNode;
  logoUrl: string;
  title: string;
  orientation?: "landscape" | "portrait";
  subtitle?: string;
  pageStyle?: any;
}

export const PdfLayout = ({
  children,
  logoUrl,
  title,
  orientation = "portrait",
  subtitle,
  pageStyle,
}: PdfLayoutProps) => {
  return (
    <Document>
      <Page
        size="A4"
        style={[styles.page, pageStyle]}
        orientation={orientation}
      >
        <View style={styles.header}>
          <Image style={styles.logo} src={logoUrl} />

          <View
            style={{
              position: "relative",
              right: 15,
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        </View>

        {children}
      </Page>
    </Document>
  );
};
