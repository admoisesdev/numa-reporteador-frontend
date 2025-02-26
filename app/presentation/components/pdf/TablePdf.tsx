import { View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  table: {
    width: "100%",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    backgroundColor: "#1d293d",
    color: "#fff",
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  tableCell: {
    flex: 1,
    padding: 3,
    fontSize: 8,
    textAlign: "center",
  },
});

interface TableProps {
  children: React.ReactNode;
  style?: any;
}

const TablePdf = ({ children, style }: TableProps) => (
  <View style={[styles.table, style]}>{children}</View>
);

interface TableCellProps {
  children?: React.ReactNode;
  style?: any;
}

const TableCellPdf = ({ children, style }: TableCellProps) => (
  <View style={[styles.tableCell, ...(Array.isArray(style) ? style : [style])]}>
    <Text style={{ textAlign: "center" }}>{children}</Text>
  </View>
);

type Column = {
  title: string;
  subcolumns?: string[];
};

interface TableHeaderProps {
  columns: Column[];
}

const TableHeaderPdf = ({ columns }: TableHeaderProps) => (
  <View>
    <View style={[styles.tableRow, styles.tableHeader]}>
      {columns.map((column, index) => (
        <TableCellPdf
          key={index}
          style={{
            flex: column.subcolumns ? column.subcolumns.length : 1,
            borderLeftWidth: index === 0 ? 0 : 1,
            borderLeftColor: "#e2e8f0",
          }}
        >
          {column.title}
        </TableCellPdf>
      ))}
    </View>

    {columns.some((column) => column.subcolumns) && (
      <View style={[styles.tableRow, styles.tableHeader]}>
        {columns.map((column, index) =>
          column.subcolumns ? (
            column.subcolumns.map((subcolumn, subIndex) => (
              <TableCellPdf key={`${index}-${subIndex}`}>
                {subcolumn}
              </TableCellPdf>
            ))
          ) : (
            <TableCellPdf key={index} />
          )
        )}
      </View>
    )}
  </View>
);

interface TableBodyProps {
  rows: (string | number)[][][];
}

const TableBodyPdf = ({ rows }: TableBodyProps) => (
  <View>
    {rows.map((row, rowIndex) => (
      <View
        key={rowIndex}
        style={[
          styles.tableRow,
          {
            backgroundColor: rowIndex % 2 === 0 ? "#e2e8f0" : "#f1f5f9",
            padding: 3,
          },
        ]}
      >
        {row.flat().map((cell, cellIndex) => (
          <TableCellPdf key={cellIndex}>{cell}</TableCellPdf>
        ))}
      </View>
    ))}
  </View>
);

export { TablePdf, TableHeaderPdf, TableCellPdf, TableBodyPdf };
