// import { isFunction } from "util";
// import downArrow from "./svg/SVGRepo/down-arrow-svgrepo-com.svg";
import React, { ReactNode } from "react";

type DownArrowIconProps = {
  height?: number | `${number}px`;
  width?: number | `${number}px`;
  size?: number | `${number}px`;
};

export default function DownArrowIcon({
  height,
  width,
}: DownArrowIconProps): ReactNode {
  return (
    <svg
      fill="#000000"
      width={width ?? "800px"}
      height={height ?? "800px"}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z" />
    </svg>
  );
}
// Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools
