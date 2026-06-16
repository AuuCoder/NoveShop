"use client";

import { useMemo, useState } from "react";

export type InventorySkuOption = {
  id: string;
  productName: string;
  skuName: string;
  available: number;
  enabled: boolean;
};

export type InventorySkuMerchantGroup = {
  merchantId: string;
  merchantName: string;
  merchantEmail?: string;
  skus: InventorySkuOption[];
};

/**
 * 批量导入卡密时的 SKU 选择器：先选店铺（商户），再在该店铺下选 SKU。
 * 避免把所有店铺的 SKU 平铺在一个下拉里导致难以定位。
 * 第二个 <select> 保留 name="skuId"，提交字段与原实现一致，后端无需改动。
 */
export function InventorySkuPicker({ groups }: { groups: InventorySkuMerchantGroup[] }) {
  const [merchantId, setMerchantId] = useState<string>(groups.length === 1 ? groups[0].merchantId : "");
  const [skuId, setSkuId] = useState<string>("");

  const activeGroup = useMemo(
    () => groups.find((group) => group.merchantId === merchantId) ?? null,
    [groups, merchantId],
  );

  return (
    <>
      <div className="field">
        <label htmlFor="inventorySkuPickerMerchant">选择店铺</label>
        <select
          id="inventorySkuPickerMerchant"
          value={merchantId}
          onChange={(event) => {
            setMerchantId(event.target.value);
            setSkuId("");
          }}
        >
          <option value="" disabled>
            先选择一个店铺
          </option>
          {groups.map((group) => (
            <option key={group.merchantId} value={group.merchantId}>
              {group.merchantName}
              {group.merchantEmail ? ` · ${group.merchantEmail}` : ""} · {group.skus.length} 个 SKU
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="skuId">选择 SKU</label>
        <select
          id="skuId"
          name="skuId"
          required
          value={skuId}
          disabled={!activeGroup}
          onChange={(event) => setSkuId(event.target.value)}
        >
          <option value="" disabled>
            {activeGroup ? "选择该店铺下的 SKU" : "请先选择店铺"}
          </option>
          {activeGroup?.skus.map((sku) => (
            <option key={sku.id} value={sku.id}>
              {sku.productName} · {sku.skuName} · 可售 {sku.available} · {sku.enabled ? "启用中" : "已停用"}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
