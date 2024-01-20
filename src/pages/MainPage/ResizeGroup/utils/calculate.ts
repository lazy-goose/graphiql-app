export function moveFlexSpace(params: {
  fractions: number[]
  index: number
  value: number
  minmax?: [number, number][]
  sibling?: 1 | -1
}) {
  const { fractions, index, value, minmax = [], sibling = 1 } = params

  if (index < 0) return
  if (index > fractions.length - 1) return
  if (index === 0 && sibling < 0) return
  if (index === fractions.length - 1 && sibling > 0) return

  const getMin = (i: number, min = minmax?.[i]?.[0]) =>
    typeof min === 'number' ? min : 0
  const getMax = (i: number, max = minmax?.[i]?.[1]) =>
    typeof max === 'number' ? max : 1

  const sizeIndexes = fractions.map((_, i) => i)
  const pivot = sibling < 0 ? index : index + 1
  const toStart = sizeIndexes.slice(0, pivot).reverse()
  const toEnd = sizeIndexes.slice(pivot)

  const sizes /* mut */ = [...fractions] as number[]

  const delta = value - fractions[index]

  let move = delta

  while (move) {
    const growCandidates = delta > 0 ? toStart : toEnd
    const shrinkCandidates = delta > 0 ? toEnd : toStart

    const growTarget = growCandidates.find(
      (index) => sizes[index] < getMax(index),
    )
    const shrinkTarget = shrinkCandidates.find(
      (index) => sizes[index] > getMin(index),
    )

    if (growTarget === undefined) break
    if (shrinkTarget == undefined) break

    const grow = getMax(growTarget) - sizes[growTarget]
    const shrink = sizes[shrinkTarget] - getMin(shrinkTarget)

    const step = Math.min(grow, shrink, Math.abs(move))

    sizes[growTarget] += step
    sizes[shrinkTarget] -= step

    move -= Math.sign(delta) * step
  }

  return sizes
}

export function recalculateCollapse(params: {
  fractions: number[]
  collapsed: boolean[]
}) {
  const { fractions, collapsed } = params
  const isCollapsed = (index: number) => collapsed[index]
  const uncollapsedSpace = fractions.reduce(
    (sum, value, index) => sum + (!isCollapsed(index) ? value : 0),
    0,
  )
  return fractions.map((fr, index) =>
    !isCollapsed(index) ? fr / uncollapsedSpace : 0,
  )
}
