import { selectorsObjectToScss } from "../selectorsObjectToScss";

describe("selectorsObjectToScss", () => {
  test("Single element selector", () => {
    expect(
      selectorsObjectToScss(
        [{ selector: "div", modifiers: [], children: [] }],
        { includeModifiers: false }
      )
    ).toEqual("div{}");
  });

  test("Single element selector modifier classNames WITH includeModifiers option", () => {
    expect(
      selectorsObjectToScss(
        [
          {
            selector: ".box",
            modifiers: [".box--big", ".box--small"],
            children: [],
          },
        ],
        { includeModifiers: true }
      )
    ).toEqual(".box{&.box--big{}&.box--small{}}");
  });

  test("Single element selector modifier classNames WITHOUT includeModifiers option", () => {
    expect(
      selectorsObjectToScss(
        [
          {
            selector: ".box",
            modifiers: [".box--big", ".box--small"],
            children: [],
          },
        ],
        { includeModifiers: false }
      )
    ).toEqual(".box{}");
  });

  test("Element with nested children and WITH includeModifiers option", () => {
    expect(
      selectorsObjectToScss(
        [
          {
            selector: ".box",
            modifiers: [".box--big", ".box--small"],
            children: [
              {
                selector: ".red",
                modifiers: [".red--dark"],
                children: [{ selector: "span", modifiers: [], children: [] }],
              },
              {
                selector: ".blue",
                modifiers: [".blue--dark"],
                children: [{ selector: "p", modifiers: [], children: [] }],
              },
            ],
          },
        ],
        { includeModifiers: true }
      )
    ).toEqual(
      ".box{.red{span{}&.red--dark{span{}}}.blue{p{}&.blue--dark{p{}}}&.box--big{.red{span{}&.red--dark{span{}}}.blue{p{}&.blue--dark{p{}}}}&.box--small{.red{span{}&.red--dark{span{}}}.blue{p{}&.blue--dark{p{}}}}}"
    );
  });

  test("Element with nested children and WITHOUT includeModifiers option", () => {
    expect(
      selectorsObjectToScss(
        [
          {
            selector: ".box",
            modifiers: [".box--big", ".box--small"],
            children: [
              {
                selector: ".red",
                modifiers: [".red--dark"],
                children: [{ selector: "span", modifiers: [], children: [] }],
              },
              {
                selector: ".blue",
                modifiers: [".blue--dark"],
                children: [{ selector: "p", modifiers: [], children: [] }],
              },
            ],
          },
        ],
        { includeModifiers: false }
      )
    ).toEqual(".box{.red{span{}}.blue{p{}}}");
  });

  test("Real life example - navbar menu WITH includeModifiers option", () => {
    expect(
      selectorsObjectToScss(
        [
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
        ],
        { includeModifiers: true }
      )
    ).toEqual(
      ".navbar{.navbar__logo{img{}}.menus-wrapper{.navbar__menu{li{.menu-link{&.menu-link--active{}}}}.navbar__lang{li{.link{&.link--active{}}}}.burger-wrapper{.navbar__burger{span{}}}}}"
    );
  });

  test("Real life example - navbar menu WITHOUT includeModifiers option", () => {
    expect(
      selectorsObjectToScss(
        [
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
        ],
        { includeModifiers: false }
      )
    ).toEqual(
      ".navbar{.navbar__logo{img{}}.menus-wrapper{.navbar__menu{li{.menu-link{}}}.navbar__lang{li{.link{}}}.burger-wrapper{.navbar__burger{span{}}}}}"
    );
  });
});
