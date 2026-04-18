import {
  getPaymentChannelOption,
  PAYMENT_CHANNEL_PRESET_OPTIONS,
} from "@/lib/payment-channels";

export function PaymentChannelConfigFields({
  fieldPrefix,
  defaultChannelCode,
  enabledChannelCodes,
}: {
  fieldPrefix: string;
  defaultChannelCode: string;
  enabledChannelCodes: string[];
}) {
  const normalizedDefaultChannelCode = defaultChannelCode.trim();
  const selectedChannelCodes =
    enabledChannelCodes.length > 0
      ? enabledChannelCodes
      : normalizedDefaultChannelCode
        ? [normalizedDefaultChannelCode]
        : [];
  const selectedChannelSet = new Set(selectedChannelCodes);
  const presetChannelSet = new Set(PAYMENT_CHANNEL_PRESET_OPTIONS.map((channel) => channel.code));
  const extraChannelCodes = selectedChannelCodes.filter((channel) => !presetChannelSet.has(channel));
  const suggestedDefaultChannel =
    normalizedDefaultChannelCode && !presetChannelSet.has(normalizedDefaultChannelCode)
      ? getPaymentChannelOption(normalizedDefaultChannelCode)
      : null;
  const datalistId = `${fieldPrefix}DefaultChannelCodeList`;

  return (
    <>
      <div className="field">
        <label htmlFor={`${fieldPrefix}DefaultChannelCode`}>默认通道</label>
        <input
          id={`${fieldPrefix}DefaultChannelCode`}
          name="defaultChannelCode"
          defaultValue={defaultChannelCode}
          placeholder="alipay.page"
          list={datalistId}
          required
        />
        <datalist id={datalistId}>
          {PAYMENT_CHANNEL_PRESET_OPTIONS.map((channel) => (
            <option key={channel.code} value={channel.code}>
              {channel.label}
            </option>
          ))}
          {suggestedDefaultChannel ? (
            <option value={suggestedDefaultChannel.code}>{suggestedDefaultChannel.label}</option>
          ) : null}
        </datalist>
        <p className="small-copy">创建订单时默认选中这个通道；保存时它会自动加入启用列表。</p>
      </div>

      <div className="field">
        <label>启用支付方式</label>
        <div className="sku-selector">
          {PAYMENT_CHANNEL_PRESET_OPTIONS.map((channel) => (
            <label key={channel.code} className="sku-option">
              <input
                type="checkbox"
                name="enabledChannelCodes"
                value={channel.code}
                defaultChecked={
                  selectedChannelSet.has(channel.code) || channel.code === normalizedDefaultChannelCode
                }
              />
              <div className="sku-option-body">
                <div className="sku-option-head">
                  <strong>{channel.label}</strong>
                  <span>{channel.code}</span>
                </div>
                <p>{channel.description}</p>
              </div>
            </label>
          ))}
        </div>
        <p className="small-copy">勾选后，前台商品购买页会展示这些可选支付方式。</p>
      </div>

      <div className="field">
        <label htmlFor={`${fieldPrefix}ExtraEnabledChannelCodes`}>额外通道编码</label>
        <input
          id={`${fieldPrefix}ExtraEnabledChannelCodes`}
          name="enabledChannelCodes"
          defaultValue={extraChannelCodes.join(", ")}
          placeholder="可选，多个用英文逗号分隔"
        />
        <p className="small-copy">用于补充不在预设列表里的 NovaPay 通道编码。</p>
      </div>
    </>
  );
}
