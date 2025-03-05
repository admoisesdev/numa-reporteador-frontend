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
    padding: 3,
    fontSize: 8,
    textAlign: "center",
    width: "100%",
    textAnchor: "middle",
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
    <Text>{children}</Text>
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
              <TableCellPdf key={`${index}-${subIndex}`} style={{ paddingRight: 25 }}>
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


export type Row = {
  mainRow: (string | number)[];
  subRows?: (string | number)[][];
};
export interface TableBodyProps {
  rows: {
    mainRow: (string | number)[][];
    subRows?: (string | number)[][];
  }[];
}

const TableBodyPdf = ({ rows = [] }: TableBodyProps) => {
  return (
    <View>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex}>
          <View
            style={[
              styles.tableRow,
              {
                backgroundColor: "#eef5ff",
              },
            ]}
          >
            {row.mainRow.flat().map((cell, cellIndex) => (
              <TableCellPdf key={cellIndex}>{cell}</TableCellPdf>
            ))}
          </View>
          {row.subRows &&
            row.subRows.map((subRow, subRowIndex) => (
              <View
                key={subRowIndex}
                style={[
                  styles.tableRow,
                  {
                    backgroundColor: "#f9fafb",
                  },
                ]}
              >
                {subRow.flat().map((cell, cellIndex) => (
                  <TableCellPdf key={cellIndex}>{cell}</TableCellPdf>
                ))}
              </View>
            ))}
        </View>
      ))}
    </View>
  );
};

export { TablePdf, TableHeaderPdf, TableCellPdf, TableBodyPdf };
