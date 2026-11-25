const truncate = (num: number) => Math.floor(num * 10) / 10;

export const formatCompactValue = (value: number) => {
  const format = (num: number) => truncate(num).toString();

  if (value >= 1_000_000_000_000) {
    return `${format(value / 1_000_000_000_000)}T`;
  }

  if (value >= 1_000_000_000) {
    return `${format(value / 1_000_000_000)}B`;
  }

  if (value >= 1_000_000) {
    return `${format(value / 1_000_000)}M`;
  }

  if (value >= 1_000) {
    return `${format(value / 1_000)}K`;
  }

  return value.toLocaleString();
};