export const getStoredItems = (key) => {
  const storedItems = localStorage.getItem(key)

  if (!storedItems) {
    return []
  }

  return JSON.parse(storedItems)
}

export const saveStoredItems = (key, items) => {
  localStorage.setItem(key, JSON.stringify(items))
}

export const isStoredItem = (key, id) => {
  const items = getStoredItems(key)

  return items.some((item) => item.id === id)
}

export const toggleStoredItem = (key, item) => {
  const items = getStoredItems(key)

  const exists = items.some(
    (storedItem) => storedItem.id === item.id
  )

  if (exists) {
    const filteredItems = items.filter(
      (storedItem) => storedItem.id !== item.id
    )

    saveStoredItems(key, filteredItems)

    return filteredItems
  }

  const updatedItems = [...items, item]

  saveStoredItems(key, updatedItems)

  return updatedItems
}