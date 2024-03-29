import { htmlToElementsArr } from "../htmlToElementsArr";

describe("htmlToElementsArr", () => {
  test("Single element without className", () => {
    expect(htmlToElementsArr("<div></div>")).toStrictEqual([
      {
        selector: "div",
        modifiers: [],
        children: [],
      },
    ]);
  });

  test("Multiple elements with same selectors", () => {
    expect(
      htmlToElementsArr("<div></div><div></div><div></div>")
    ).toStrictEqual([
      {
        selector: "div",
        modifiers: [],
        children: [],
      },
      {
        selector: "div",
        modifiers: [],
        children: [],
      },
      {
        selector: "div",
        modifiers: [],
        children: [],
      },
    ]);
  });

  test("Multiple elements with different selectors", () => {
    expect(
      htmlToElementsArr(`<div></div><span></span><p></p><p class="big"></p>`)
    ).toStrictEqual([
      {
        selector: "div",
        modifiers: [],
        children: [],
      },
      {
        selector: "span",
        modifiers: [],
        children: [],
      },
      {
        selector: "p",
        modifiers: [],
        children: [],
      },
      {
        selector: ".big",
        modifiers: [],
        children: [],
      },
    ]);
  });

  test("Element with same selector children", () => {
    expect(
      htmlToElementsArr(`<div class="wrapper">
      <p class="text"><span class="red">hello</span></p>
      <p class="text"><span class="blue">hello blue!</span></p>
    </div>`)
    ).toStrictEqual([
      {
        selector: ".wrapper",
        modifiers: [],
        children: [
          {
            selector: ".text",
            modifiers: [],
            children: [
              {
                selector: ".red",
                modifiers: [],
                children: [],
              },
            ],
          },
          {
            selector: ".text",
            modifiers: [],
            children: [
              {
                selector: ".blue",
                modifiers: [],
                children: [],
              },
            ],
          },
        ],
      },
    ]);
  });

  test("Element with different selector children", () => {
    expect(
      htmlToElementsArr(`<div class="wrapper">
      <p class="text"><span class="red">hello</span></p>
      <p class="coolText"><span class="blue">hello blue!</span></p>
    </div>`)
    ).toStrictEqual([
      {
        selector: ".wrapper",
        modifiers: [],
        children: [
          {
            selector: ".text",
            modifiers: [],
            children: [
              {
                selector: ".red",
                modifiers: [],
                children: [],
              },
            ],
          },
          {
            selector: ".coolText",
            modifiers: [],
            children: [
              {
                selector: ".blue",
                modifiers: [],
                children: [],
              },
            ],
          },
        ],
      },
    ]);
  });

  test("Element with same selector children but with modifier (additional className)", () => {
    expect(
      htmlToElementsArr(`<div class="wrapper">
        <p class="text"><span class="red">hello</span></p>
        <p class="text text--active"><span class="red">hello</span></p>
      </div>`)
    ).toStrictEqual([
      {
        selector: ".wrapper",
        modifiers: [],
        children: [
          {
            selector: ".text",
            modifiers: [],
            children: [
              {
                selector: ".red",
                modifiers: [],
                children: [],
              },
            ],
          },
          {
            selector: ".text",
            modifiers: [".text--active"],
            children: [
              {
                selector: ".red",
                modifiers: [],
                children: [],
              },
            ],
          },
        ],
      },
    ]);
  });

  test("Multiple modifiers (additional classNames)", () => {
    expect(
      htmlToElementsArr(`<div class="wrapper">
        <p class="text text--active text--fixed"></p>
      </div>`)
    ).toStrictEqual([
      {
        selector: ".wrapper",
        modifiers: [],
        children: [
          {
            selector: ".text",
            modifiers: [".text--active", ".text--fixed"],
            children: [],
          },
        ],
      },
    ]);
  });

  test("Same selectors children with modifiers", () => {
    expect(
      htmlToElementsArr(`<div class="wrapper">
        <p class="text"><span class="red">hello</span></p>
        <p class="text"><span class="blue">hello blue!</span></p>
        <p class="text text--active"><span class="blue">hello blue!</span></p>
        <p class="text text--active"><span class="red">hello</span></p>
      </div>`)
    ).toStrictEqual([
      {
        selector: ".wrapper",
        modifiers: [],
        children: [
          {
            selector: ".text",
            modifiers: [],
            children: [
              {
                selector: ".red",
                modifiers: [],
                children: [],
              },
            ],
          },
          {
            selector: ".text",
            modifiers: [],
            children: [
              {
                selector: ".blue",
                modifiers: [],
                children: [],
              },
            ],
          },
          {
            selector: ".text",
            modifiers: [".text--active"],
            children: [
              {
                selector: ".blue",
                modifiers: [],
                children: [],
              },
            ],
          },
          {
            selector: ".text",
            modifiers: [".text--active"],
            children: [
              {
                selector: ".red",
                modifiers: [],
                children: [],
              },
            ],
          },
        ],
      },
    ]);
  });

  test("Real life example - navbar menu.", () => {
    expect(
      htmlToElementsArr(`<nav id="navbar" class="navbar">
      <a href="https://test.link/" class="navbar__logo">
          <img src="https://test.link/" alt="">
      </a>
      <div id="menus-wrapper" class="menus-wrapper">
          <ul class="navbar__menu">
              <li>
                  <a class="menu-link menu-link--active" href="https://test.link/">Welcome</a>
              </li>
              <li>
                  <a class="menu-link" href="https://test.link/">Blog</a>
              </li>
              <li>
                  <a class="menu-link" href="https://test.link/">Contact</a>
              </li>
          </ul>
          <ul class="navbar__lang">
              <li>
                  <a class="link link--active" href="https://test.link/">PL</a>
              </li>
              <li>
                  <a class="link" href="https://test.link/">EN</a>
              </li>
              <li>
                  <a class="link" href="https://test.link/">FR</a>
              </li>
          </ul>
          <div class="burger-wrapper">
              <div id="burger" class="navbar__burger">
                  <span></span>
                  <span></span>
                  <span></span>
              </div>
          </div>
      </div>
  </nav>`)
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
    ]);
  });
  test(`Real life example - navbar menu WITH "tagNamesOnly" option.`, () => {
    expect(
      htmlToElementsArr(
        `<nav id="navbar" class="navbar">
      <a href="https://test.link/" class="navbar__logo">
          <img src="https://test.link/" alt="">
      </a>
      <div id="menus-wrapper" class="menus-wrapper">
          <ul class="navbar__menu">
              <li>
                  <a class="menu-link menu-link--active" href="https://test.link/">Welcome</a>
              </li>
              <li>
                  <a class="menu-link" href="https://test.link/">Blog</a>
              </li>
              <li>
                  <a class="menu-link" href="https://test.link/">Contact</a>
              </li>
          </ul>
          <ul class="navbar__lang">
              <li>
                  <a class="link link--active" href="https://test.link/">PL</a>
              </li>
              <li>
                  <a class="link" href="https://test.link/">EN</a>
              </li>
              <li>
                  <a class="link" href="https://test.link/">FR</a>
              </li>
          </ul>
          <div class="burger-wrapper">
              <div id="burger" class="navbar__burger">
                  <span></span>
                  <span></span>
                  <span></span>
              </div>
          </div>
      </div>
  </nav>`,
        { tagNamesOnly: true }
      )
    ).toStrictEqual([
      {
        selector: "nav",
        modifiers: [],
        children: [
          {
            selector: "a",
            modifiers: [],
            children: [{ selector: "img", modifiers: [], children: [] }],
          },
          {
            selector: "div",
            modifiers: [],
            children: [
              {
                selector: "ul",
                modifiers: [],
                children: [
                  {
                    selector: "li",
                    modifiers: [],
                    children: [{ selector: "a", modifiers: [], children: [] }],
                  },
                  {
                    selector: "li",
                    modifiers: [],
                    children: [{ selector: "a", modifiers: [], children: [] }],
                  },
                  {
                    selector: "li",
                    modifiers: [],
                    children: [{ selector: "a", modifiers: [], children: [] }],
                  },
                ],
              },
              {
                selector: "ul",
                modifiers: [],
                children: [
                  {
                    selector: "li",
                    modifiers: [],
                    children: [{ selector: "a", modifiers: [], children: [] }],
                  },
                  {
                    selector: "li",
                    modifiers: [],
                    children: [{ selector: "a", modifiers: [], children: [] }],
                  },
                  {
                    selector: "li",
                    modifiers: [],
                    children: [{ selector: "a", modifiers: [], children: [] }],
                  },
                ],
              },
              {
                selector: "div",
                modifiers: [],
                children: [
                  {
                    selector: "div",
                    modifiers: [],
                    children: [
                      { selector: "span", modifiers: [], children: [] },
                      { selector: "span", modifiers: [], children: [] },
                      { selector: "span", modifiers: [], children: [] },
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
