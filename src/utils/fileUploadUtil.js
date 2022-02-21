const getFormattedFileSize = (sizeInBytes) => {
  let units = ['kb', 'mb', 'gb', 'tb'];
  let formattedSize = '';
  let i = sizeInBytes;
  let j = 0;

  while (i > 1024 && j < 4) {
    i = parseFloat(i / 1024).toFixed(2);
    formattedSize = `${i} ${units[j]}`;
    j++;
  }
  return formattedSize;
};

export { getFormattedFileSize };
