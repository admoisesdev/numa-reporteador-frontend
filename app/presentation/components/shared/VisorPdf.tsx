import React from "react";
import {
  BlobProvider,
  type DocumentProps,
} from "@react-pdf/renderer";

type PdfDocument = React.ReactElement<
  DocumentProps,
  string | React.JSXElementConstructor<any>
>;

interface VisorPdfProps {
  pdfDocument: PdfDocument;
}

export const VisorPdf = ({ pdfDocument }: VisorPdfProps) => {
  return (
    <BlobProvider document={pdfDocument}>
      {({ url, loading, error }) => {
        if (loading) return <div>Cargando vista previa...</div>;
        if (error) return <div>Error al generar el PDF.</div>;

        return (
          <iframe
            src={url!}
            width="100%"
            height="100%"
            title="Vista previa del PDF"
          />
        );
      }}
    </BlobProvider>
  );
};
