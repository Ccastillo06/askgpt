export const mergeTruthyObjectValues = <T extends object>(obj1: T, obj2: T): T => {
  const newObj = Object.keys(obj2).reduce((acc, nextKey) => {
    const key = nextKey as keyof T
    const value = obj2[key] ?? obj1[key]

    return {
      ...acc,
      [nextKey]: value
    }
  }, {})

  return {
    ...obj1,
    ...newObj
  }
}
