export function getInitialDisplayValue(item) {
  if (!item) {
    return "...";
  }
  if (item.category) {
    return item.category.name;
  } else if (item.collection) {
    return item.collection.name;
  } else if (item.page) {
    return item.page.title;
  } else if (item.url) {
    return item.url;
  } else {
    return "";
  }
}
