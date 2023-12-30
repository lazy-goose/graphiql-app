export function toFr(value: number, share: number) {
  return value / share
}

export function toFrArray(values: number[]) {
  const share = values.reduce((s, v) => s + v, 0)
  return {
    fractions: values.map((v) => toFr(v, share)),
    share,
  }
}
