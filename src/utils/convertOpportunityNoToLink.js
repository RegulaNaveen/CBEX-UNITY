const convertOpportunityNoToLink = text => {
  const urlRegex = /[A-Z]{3}[0-9]{5}/gm;

  return text.replace(urlRegex, OPP => {
    const url = `${window.location.pathname}/opportunities/${OPP}`;
    return `<a href="${url}">${OPP}</a>`;
  });
};

export default convertOpportunityNoToLink;
