import { mergeDuplicates } from "../mergeDuplicates";

describe("mergeDuplicates", () => {
  test("Works when there are no duplicates", () => {
    expect(
      mergeDuplicates([
        { selector: "div", modifiers: [], children: [] },
        { selector: "span", modifiers: [], children: [] },
        { selector: "p", modifiers: [], children: [] },
      ])
    ).toStrictEqual([
      { selector: "div", modifiers: [], children: [] },
      { selector: "span", modifiers: [], children: [] },
      { selector: "p", modifiers: [], children: [] },
    ]);
  });
  test("Single duplicates", () => {
    expect(
      mergeDuplicates([
        { selector: "div", modifiers: [], children: [] },
        { selector: "div", modifiers: [], children: [] },
      ])
    ).toStrictEqual([{ selector: "div", modifiers: [], children: [] }]);
  });
  test("Two duplicates", () => {
    expect(
      mergeDuplicates([
        { selector: "div", modifiers: [], children: [] },
        { selector: "div", modifiers: [], children: [] },
        { selector: "span", modifiers: [], children: [] },
        { selector: "span", modifiers: [], children: [] },
      ])
    ).toStrictEqual([
      { selector: "div", modifiers: [], children: [] },
      { selector: "span", modifiers: [], children: [] },
    ]);
  });
  test("Merges duplicates children", () => {
    expect(
      mergeDuplicates([
        {
          selector: "div",
          modifiers: [],
          children: [{ selector: ".red", modifiers: [], children: [] }],
        },
        {
          selector: "div",
          modifiers: [],
          children: [{ selector: ".blue", modifiers: [], children: [] }],
        },
      ])
    ).toStrictEqual([
      {
        selector: "div",
        modifiers: [],
        children: [
          { selector: ".red", modifiers: [], children: [] },
          { selector: ".blue", modifiers: [], children: [] },
        ],
      },
    ]);
  });
  test("Merges duplicates modifiers (additional classNames)", () => {
    expect(
      mergeDuplicates([
        {
          selector: ".box",
          modifiers: [".box--big"],
          children: [],
        },
        {
          selector: ".box",
          modifiers: [".box--small"],
          children: [],
        },
      ])
    ).toStrictEqual([
      {
        selector: ".box",
        modifiers: [".box--big", ".box--small"],
        children: [],
      },
    ]);
  });
  test("Merges both - duplicates children and modifiers", () => {
    expect(
      mergeDuplicates([
        {
          selector: ".box",
          modifiers: [".box--small"],
          children: [{ selector: ".red", modifiers: [], children: [] }],
        },
        {
          selector: ".box",
          modifiers: [".box--big"],
          children: [],
        },
        {
          selector: ".box",
          modifiers: [".box--big"],
          children: [{ selector: ".blue", modifiers: [], children: [] }],
        },
      ])
    ).toStrictEqual([
      {
        selector: ".box",
        modifiers: [".box--small", ".box--big"],
        children: [
          { selector: ".red", modifiers: [], children: [] },
          { selector: ".blue", modifiers: [], children: [] },
        ],
      },
    ]);
  });
  test("Merges nested duplicates", () => {
    expect(
      mergeDuplicates([
        {
          selector: "div",
          modifiers: [],
          children: [{ selector: "span", modifiers: [], children: [] }],
        },
        {
          selector: "div",
          modifiers: [],
          children: [{ selector: "span", modifiers: [], children: [] }],
        },
      ])
    ).toStrictEqual([
      {
        selector: "div",
        modifiers: [],
        children: [{ selector: "span", modifiers: [], children: [] }],
      },
    ]);
  });
  test("Real life example - navbar menu", () => {
    expect(
      mergeDuplicates([
        {
          selector: ".navbar",
          modifiers: [],
          children: [
            {
              selector: ".navbar__logo",
              modifiers: [],
              children: [
                {
                  selector: "img",
                  modifiers: [],
                  children: [],
                },
              ],
            },
            {
              selector: ".menus-wrapper",
              modifiers: [],
              children: [
                {
                  selector: ".navbar__menu",
                  modifiers: [],
                  children: [
                    {
                      selector: "li",
                      modifiers: [],
                      children: [
                        {
                          selector: ".menu-link",
                          modifiers: [".menu-link--active"],
                          children: [],
                        },
                      ],
                    },
                    {
                      selector: "li",
                      modifiers: [],
                      children: [
                        {
                          selector: ".menu-link",
                          modifiers: [],
                          children: [],
                        },
                      ],
                    },
                    {
                      selector: "li",
                      modifiers: [],
                      children: [
                        {
                          selector: ".menu-link",
                          modifiers: [],
                          children: [],
                        },
                      ],
                    },
                  ],
                },
                {
                  selector: ".navbar__lang",
                  modifiers: [],
                  children: [
                    {
                      selector: "li",
                      modifiers: [],
                      children: [
                        {
                          selector: ".link",
                          modifiers: [".link--active"],
                          children: [],
                        },
                      ],
                    },
                    {
                      selector: "li",
                      modifiers: [],
                      children: [
                        {
                          selector: ".link",
                          modifiers: [],
                          children: [],
                        },
                      ],
                    },
                    {
                      selector: "li",
                      modifiers: [],
                      children: [
                        {
                          selector: ".link",
                          modifiers: [],
                          children: [],
                        },
                      ],
                    },
                  ],
                },
                {
                  selector: ".burger-wrapper",
                  modifiers: [],
                  children: [
                    {
                      selector: ".navbar__burger",
                      modifiers: [],
                      children: [
                        {
                          selector: "span",
                          modifiers: [],
                          children: [],
                        },
                        {
                          selector: "span",
                          modifiers: [],
                          children: [],
                        },
                        {
                          selector: "span",
                          modifiers: [],
                          children: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ])
    ).toStrictEqual([
      {
        selector: ".navbar",
        modifiers: [],
        children: [
          {
            selector: ".navbar__logo",
            modifiers: [],
            children: [
              {
                selector: "img",
                modifiers: [],
                children: [],
              },
            ],
          },
          {
            selector: ".menus-wrapper",
            modifiers: [],
            children: [
              {
                selector: ".navbar__menu",
                modifiers: [],
                children: [
                  {
                    selector: "li",
                    modifiers: [],
                    children: [
                      {
                        selector: ".menu-link",
                        modifiers: [".menu-link--active"],
                        children: [],
                      },
                    ],
                  },
                ],
              },
              {
                selector: ".navbar__lang",
                modifiers: [],
                children: [
                  {
                    selector: "li",
                    modifiers: [],
                    children: [
                      {
                        selector: ".link",
                        modifiers: [".link--active"],
                        children: [],
                      },
                    ],
                  },
                ],
              },
              {
                selector: ".burger-wrapper",
                modifiers: [],
                children: [
                  {
                    selector: ".navbar__burger",
                    modifiers: [],
                    children: [
                      {
                        selector: "span",
                        modifiers: [],
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ]);
  });
});
