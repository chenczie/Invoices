function buildFileUrl(baseUrl, fileName) {
  if (!baseUrl || !fileName) {
    return null;
  }
  const trimmedBase = baseUrl.replace(/\/+$/, '');
  return `${trimmedBase}/${encodeURIComponent(fileName)}`;
}

module.exports = {
  buildFileUrl
};
