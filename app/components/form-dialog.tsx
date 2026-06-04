"use client";

import { type ReactNode } from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type FormDialogProps = {
  /** 触发按钮文案 */
  triggerLabel: ReactNode;
  /** 弹窗标题 */
  title: ReactNode;
  /** 弹窗副标题（可选） */
  description?: ReactNode;
  /** 触发按钮的 className，默认次要按钮 */
  triggerClassName?: string;
  /** 弹窗内容（通常是一个 <form>） */
  children: ReactNode;
};

/**
 * 通用"点击按钮 → 弹窗内填表单"组件。
 *
 * 表单本身仍然使用原有的服务端 action：提交成功后服务端 redirect 会整页跳转，
 * 弹窗随之关闭；校验失败时会带 error 回到当前页（弹窗关闭，错误以通知条展示）。
 * 因此无需改动任何业务逻辑，只是把表单装进弹窗。
 */
export function FormDialog({
  triggerLabel,
  title,
  description,
  triggerClassName = "button-secondary",
  children,
}: FormDialogProps) {
  return (
    <Dialog>
      <DialogTrigger className={triggerClassName}>{triggerLabel}</DialogTrigger>
      <DialogContent title={title} description={description}>
        {children}
      </DialogContent>
    </Dialog>
  );
}
