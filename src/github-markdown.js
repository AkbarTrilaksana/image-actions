const { filesize } = require("humanize");

const optimisedImages = processedImages => {
  return processedImages
    .filter(image => image.compressionWasSignificant)
    .map(image => {
      const beforeSize = filesize(image.beforeStats);
      const afterSize = filesize(image.afterStats);
      const formattedPercentage = `${image.percentChange.toFixed(1)}%`;

      return `| \`${
        image.name
      }\` | ${beforeSize} | ${afterSize} | ${formattedPercentage} |`;
    })
    .join("\n");
};

const unoptimisedImages = processedImages => {
  const nonOptimisable = processedImages.filter(
    image => !image.compressionWasSignificant
  );

  if (nonOptimisable.length > 0) {
    const items = nonOptimisable
      .map(image => {
        return `* \`${image.name}\``;
      })
      .join("\n");

    return `

<details>
<summary>Some images were already optimised</summary>

${items}
</details>
    `;
  } else {
    return "";
  }
};

const generateMarkdownReport = processedImages => {
  return `
Images automagically compressed by [Calibre](https://calibreapp.com)'s [image-actions](https://) ✨

| Filename | Before | After | Improvement |
| --- | --- | --- | --- |
${optimisedImages(processedImages)}
${unoptimisedImages(processedImages)}
  `;
};

module.exports = generateMarkdownReport;
