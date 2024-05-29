export const updateData = (date, update) => date.map((item) => item.id === update.id ? update : item);
export const updateItem = (item, prop) => ({...item, ...prop});
