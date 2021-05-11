import { selectorsObjectToCss } from "../selectorsObjectToCss";

describe("selectorsObjectToCss", () => {
  test("Single element selector", () => {
    expect(
      selectorsObjectToCss([{ selector: "div", modifiers: [], children: [] }], {
        includeModifiers: false,
      })
    ).toEqual("div{}");
  });

  test("Single element selector modifier classNames WITH includeModifiers option", () => {
    expect(
      selectorsObjectToCss(
        [
          {
            selector: ".box",
            modifiers: [".box--big", ".box--small"],
            children: [],
          },
        ],
        { includeModifiers: true }
      )
    ).toEqual(".box{}.box.box--big{}.box.box--small{}");
  });

  test("Single element selector modifier classNames WITHOUT includeModifiers option", () => {
    expect(
      selectorsObjectToCss(
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
      selectorsObjectToCss(
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
      ".box{}.box>.red{}.box>.red>span{}.box>.red.red--dark{}.box>.red.red--dark>span{}.box>.blue{}.box>.blue>p{}.box>.blue.blue--dark{}.box>.blue.blue--dark>p{}.box.box--big{}.box.box--big>.red{}.box.box--big>.red>span{}.box.box--big>.red.red--dark{}.box.box--big>.red.red--dark>span{}.box.box--big>.blue{}.box.box--big>.blue>p{}.box.box--big>.blue.blue--dark{}.box.box--big>.blue.blue--dark>p{}.box.box--small{}.box.box--small>.red{}.box.box--small>.red>span{}.box.box--small>.red.red--dark{}.box.box--small>.red.red--dark>span{}.box.box--small>.blue{}.box.box--small>.blue>p{}.box.box--small>.blue.blue--dark{}.box.box--small>.blue.blue--dark>p{}"
    );
  });

  test("Element with nested children and WITHOUT includeModifiers option", () => {
    expect(
      selectorsObjectToCss(
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
    ).toEqual(".box{}.box>.red{}.box>.red>span{}.box>.blue{}.box>.blue>p{}");
  });

  test("Real life example - navbar menu WITH includeModifiers option", () => {
    expect(
      selectorsObjectToCss(
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
      ".navbar{}.navbar>.navbar__logo{}.navbar>.navbar__logo>img{}.navbar>.menus-wrapper{}.navbar>.menus-wrapper>.navbar__menu{}.navbar>.menus-wrapper>.navbar__menu>li{}.navbar>.menus-wrapper>.navbar__menu>li>.menu-link{}.navbar>.menus-wrapper>.navbar__menu>li>.menu-link.menu-link--active{}.navbar>.menus-wrapper>.navbar__lang{}.navbar>.menus-wrapper>.navbar__lang>li{}.navbar>.menus-wrapper>.navbar__lang>li>.link{}.navbar>.menus-wrapper>.navbar__lang>li>.link.link--active{}.navbar>.menus-wrapper>.burger-wrapper{}.navbar>.menus-wrapper>.burger-wrapper>.navbar__burger{}.navbar>.menus-wrapper>.burger-wrapper>.navbar__burger>span{}"
    );
  });

  test("Real life example - navbar menu WITHOUT includeModifiers option", () => {
    expect(
      selectorsObjectToCss(
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
      ".navbar{}.navbar>.navbar__logo{}.navbar>.navbar__logo>img{}.navbar>.menus-wrapper{}.navbar>.menus-wrapper>.navbar__menu{}.navbar>.menus-wrapper>.navbar__menu>li{}.navbar>.menus-wrapper>.navbar__menu>li>.menu-link{}.navbar>.menus-wrapper>.navbar__lang{}.navbar>.menus-wrapper>.navbar__lang>li{}.navbar>.menus-wrapper>.navbar__lang>li>.link{}.navbar>.menus-wrapper>.burger-wrapper{}.navbar>.menus-wrapper>.burger-wrapper>.navbar__burger{}.navbar>.menus-wrapper>.burger-wrapper>.navbar__burger>span{}"
    );
  });
});
