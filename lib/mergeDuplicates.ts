import { ElementsArr } from "./index";

export const mergeDuplicates = (arr: ElementsArr): ElementsArr => {
  return arr.reduce<ElementsArr>((acc, curr, i, self) => {
    if (acc.find((el) => el.selector === curr.selector)) return acc; //if object already merged - skip
    const duplicates = self.filter((o) => curr.selector === o.selector);

    //merge same selectors children to one array
    const allChildren: ElementsArr = [];
    duplicates.forEach((d) => {
      allChildren.push(...d.children);
    });

    //merge all modifiers to one array
    const allModifiers: string[] = [];
    duplicates.forEach((d) => {
      d.modifiers.forEach((m) => {
        if (!allModifiers.includes(m)) {
          allModifiers.push(m);
        }
      });
    });

    //create merged object and merge its children the same way
    const newElement = {
      selector: duplicates[0].selector,
      modifiers: allModifiers,
      children: mergeDuplicates(allChildren),
    };
    acc.push(newElement);
    return acc;
  }, []);
};
