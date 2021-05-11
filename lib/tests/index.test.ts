import { htmlStringToStyles } from "../index";

describe("htmlStringToStyles", () => {
  test("Single element without className", () => {
    expect(htmlStringToStyles("<div></div>")).toEqual("div{}");
  });

  test("Multiple elements with same selectors", () => {
    expect(htmlStringToStyles("<div></div><div></div><div></div>")).toEqual(
      "div{}"
    );
  });

  test("Multiple elements with different selectors", () => {
    expect(
      htmlStringToStyles(`<div></div><span></span><p></p><p class="big"></p>`)
    ).toEqual("div{}span{}p{}.big{}");
  });

  test("Element with same selector children", () => {
    expect(
      htmlStringToStyles(`<div class="wrapper">
      <p class="text"><span class="red">hello</span></p>
      <p class="text"><span class="blue">hello blue!</span></p>
    </div>`)
    ).toEqual(".wrapper{.text{.red{}.blue{}}}");
  });

  test("Element with different selector children", () => {
    expect(
      htmlStringToStyles(`<div class="wrapper">
      <p class="text"><span class="red">hello</span></p>
      <p class="coolText"><span class="blue">hello blue!</span></p>
    </div>`)
    ).toEqual(".wrapper{.text{.red{}}.coolText{.blue{}}}");
  });

  test("Element with same selector children but with modifier (additional className)", () => {
    expect(
      htmlStringToStyles(`<div class="wrapper">
        <p class="text"><span class="red">hello</span></p>
        <p class="text text--active"><span class="red">hello</span></p>
      </div>`)
    ).toEqual(".wrapper{.text{.red{}&.text--active{.red{}}}}");
  });

  test("Multiple modifiers (additional classNames)", () => {
    expect(
      htmlStringToStyles(`<div class="wrapper">
        <p class="text text--active text--fixed"></p>
      </div>`)
    ).toEqual(".wrapper{.text{&.text--active{}&.text--fixed{}}}");
  });

  test("Same selectors children with modifiers", () => {
    expect(
      htmlStringToStyles(`<div class="wrapper">
        <p class="text"><span class="red">hello</span></p>
        <p class="text"><span class="blue">hello blue!</span></p>
        <p class="text text--active"><span class="blue">hello blue!</span></p>
        <p class="text text--active"><span class="red">hello</span></p>
      </div>`)
    ).toEqual(".wrapper{.text{.red{}.blue{}&.text--active{.red{}.blue{}}}}");
  });

  test("Real life example - navbar menu (SCSS MODE WITH MODIFIERS)", () => {
    expect(
      htmlStringToStyles(`<nav id="navbar" class="navbar">
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
    ).toEqual(
      ".navbar{.navbar__logo{img{}}.menus-wrapper{.navbar__menu{li{.menu-link{&.menu-link--active{}}}}.navbar__lang{li{.link{&.link--active{}}}}.burger-wrapper{.navbar__burger{span{}}}}}"
    );
  });

  test("Real life example - navbar menu (SCSS MODE WITHOUT MODIFIERS)", () => {
    expect(
      htmlStringToStyles(
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
        { includeModifiers: false, mode: "scss" }
      )
    ).toEqual(
      ".navbar{.navbar__logo{img{}}.menus-wrapper{.navbar__menu{li{.menu-link{}}}.navbar__lang{li{.link{}}}.burger-wrapper{.navbar__burger{span{}}}}}"
    );
  });

  test("Real life example - navbar menu (CSS MODE WITH MODIFIERS)", () => {
    expect(
      htmlStringToStyles(
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
        { includeModifiers: true, mode: "css" }
      )
    ).toEqual(
      ".navbar{}.navbar>.navbar__logo{}.navbar>.navbar__logo>img{}.navbar>.menus-wrapper{}.navbar>.menus-wrapper>.navbar__menu{}.navbar>.menus-wrapper>.navbar__menu>li{}.navbar>.menus-wrapper>.navbar__menu>li>.menu-link{}.navbar>.menus-wrapper>.navbar__menu>li>.menu-link.menu-link--active{}.navbar>.menus-wrapper>.navbar__lang{}.navbar>.menus-wrapper>.navbar__lang>li{}.navbar>.menus-wrapper>.navbar__lang>li>.link{}.navbar>.menus-wrapper>.navbar__lang>li>.link.link--active{}.navbar>.menus-wrapper>.burger-wrapper{}.navbar>.menus-wrapper>.burger-wrapper>.navbar__burger{}.navbar>.menus-wrapper>.burger-wrapper>.navbar__burger>span{}"
    );
  });

  test("Real life example - navbar menu (CSS MODE WITHOUT MODIFIERS)", () => {
    expect(
      htmlStringToStyles(
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
        { includeModifiers: false, mode: "css" }
      )
    ).toEqual(
      ".navbar{}.navbar>.navbar__logo{}.navbar>.navbar__logo>img{}.navbar>.menus-wrapper{}.navbar>.menus-wrapper>.navbar__menu{}.navbar>.menus-wrapper>.navbar__menu>li{}.navbar>.menus-wrapper>.navbar__menu>li>.menu-link{}.navbar>.menus-wrapper>.navbar__lang{}.navbar>.menus-wrapper>.navbar__lang>li{}.navbar>.menus-wrapper>.navbar__lang>li>.link{}.navbar>.menus-wrapper>.burger-wrapper{}.navbar>.menus-wrapper>.burger-wrapper>.navbar__burger{}.navbar>.menus-wrapper>.burger-wrapper>.navbar__burger>span{}"
    );
  });
});
