## StylesPuller

<a href="https://stylespuller.tk">
<img src="./public/logo.png" alt="StylesPuller"/>
</a>

## 🤔 What is it?

It's an online tool which will help you in your frontend development!

It will pull all classNames (or tagNames if element has no class specified) out of provided html code string and create empty scss (or css) template for you.

## 🎯 Why I've created this?

When I create new website I always start with html structure, then I'm filling it with some content (text and images) and then looking on html code I'm preparing my css selectors to make styling faster. To make my life a little bit easier I've decided to create a tool which will do it for me. So after writing html I can just jump to defining my styles.

## 💡 How it works?

You've got two text editors on the page - you write your html code in the left one, click **`CONVERT`** button and your scss (or css) selectors are generated, displayed in the right one and ready to copy.

## ⚙️ Available convertion options

You can change the way your selectors are generated using **`options`** button.

Convertion options:

<ol>
<li><b>include modifier class names.</b></li>
<li><b>Use tag names only.</b></li>
<li><b>SCSS or CSS convertion mode.</b></li>
</ol>

## ✔️ PWA

This app is **PWA friendly** - you can install it on your device!

## 💻 Run it locally

```bash

git clone https://github.com/PatrykBuniX/styles-puller.git

npm install

npm run dev
```

## 🚀 Live

https://stylespuller.tk
