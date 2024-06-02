
export const updateDate = (date, update) => date.map((item) => item.id === update.item ? update : item);
export const updateItem = (item, prop) => ({...item, ...prop});
