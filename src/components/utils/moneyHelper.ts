export const formatMoney = (value: number | null | undefined) : string | null => {
    if (value == null || !Number.isFinite(value)) return null;
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    return `$${value.toLocaleString('en-US')}`;
}