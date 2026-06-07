"use client";

import { type ReactNode } from "react";

type ConfirmSubmitButtonProps = {
  confirmMessage: string;
  children: ReactNode;
  className?: string;
  formNoValidate?: boolean;
};

/**
 * 一个在点击时弹出二次确认的提交按钮。
 * 用户取消时阻止表单提交，确认后才走原本的 server action。
 */
export function ConfirmSubmitButton({
  confirmMessage,
  children,
  className,
  formNoValidate,
}: ConfirmSubmitButtonProps) {
  return (
    <button
      type="submit"
      className={className}
      formNoValidate={formNoValidate}
      onClick={(event) => {
        if (!window.confirm(confirmMessage)) {
          event.preventDefault();
        }
      }}
    >
      {children}
    </button>
  );
}
