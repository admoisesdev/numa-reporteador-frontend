import React from "react";
import {
  BlobProvider,
  type DocumentProps,
} from "@react-pdf/renderer";
import { Spinner } from "../ui";
import { TypographyH4 } from "./TypographyH4";

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
        if (loading) return (
          <div className="flex items-center justify-center h-full">
            <Spinner className="text-slate-500" size="large">
              <span className="text-slate-500 text-xl">Cargando vista previa...</span>
            </Spinner>
          </div>
        );
        if (error) return (
          <div className="flex items-center justify-center h-full">
            <TypographyH4 className="text-slate-500">
              Error al generar el PDF.
            </TypographyH4>
          </div>
        );

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
