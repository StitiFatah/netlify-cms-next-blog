const nextUntilTest = (elem, selector, filter) => {
  elem = elem.nextElementSibling;
  siblings_list = [];

  while (elem) {
    if (elem.matches(selector)) {
      break;
    }

    if (filter) {
      if (elem.matches(filter)) {
        siblings_list.push(elem);
      }
    } else {
      siblings_list.push(elem);
    }

    elem = elem.nextElementSibling;
  }

  return siblings_list;
};
