import { CSSProperties } from "react";
import { CSSObject } from "@emotion/react";

export type CustomCSSObject = CSSProperties & CSSObject & {
  [key: string]: string | number | CustomCSSObject
}
