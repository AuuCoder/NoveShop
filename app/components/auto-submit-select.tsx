"use client";

import { type ReactNode } from "react";

type AutoSubmitSelectProps = {
  id?: string;
  name: string;
  defaultValue?: string;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
};

/**
 * 一个会在值变化时自动提交所属表单的 <select>。
 * 用于筛选条：选完即筛选，无需再点“应用筛选”按钮。
 */
export function AutoSubmitSelect({ children, ...props }: AutoSubmitSelectProps) {
  return (
    <select
      {...props}
      onChange={(event) => {
        event.currentTarget.form?.requestSubmit();
      }}
    >
      {children}
    </select>
  );
}
