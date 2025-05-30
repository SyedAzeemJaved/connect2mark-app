export const setText = (text: string) => {
  if (!text) {
    return '';
  }

  // Replace underscores with spaces and convert to title case
  return text.replace(/_/g, ' ').replace(/\w\S*/g, function (word) {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
  });
};
