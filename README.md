<img src="https://user-images.githubusercontent.com/3495307/73133771-7ac37000-403e-11ea-97b3-3153ea95ae52.png" alt="icons" width="221"/>

# Sketch Dark Side Plugin

- Easily design light and dark themes in Sketch.
- Switch between themes.
- Export color assets for **Xcode** and **Android Studio**.

![Example App](https://user-images.githubusercontent.com/3495307/73133572-b14bbb80-403b-11ea-9935-ac765a3340a6.gif)


# Installation

- [Download](../../releases/latest/download/darkside.sketchplugin.zip) the latest release of the plugin
- Un-zip
- Double-click on darkside.sketchplugin

# Usage

Unfortunately Sketch doesn't have the color override feature. In order to use the plugin, we need to give the colors used in the design with layer styles.

You can [download the sample design file](https://github.com/receptiryaki/darkside/raw/master/examples/recipes.sketch) prepared with the method described below.

## Step 1: Create your color palette with layer styles

In order to easily make changes on the colors, you can prepare a page where all colors are defined.

You should name the layer styles of these colors as:

`
Themes/<Light or Dark>/<Your color name>
`

Plugin will be based on shared styles that start only with Themes, followed by Light or Dark when switching and exporting colors.

![Giving a shared style name](https://user-images.githubusercontent.com/3495307/73007827-45d8d280-3e1e-11ea-9b2a-d74f9919d192.gif)

## Step 2: Assign shared styles to layers

You should make sure that all the color of layers and texts in the document come from the shared styles you define.

![Assign shared styles to layers](https://user-images.githubusercontent.com/3495307/73009201-23948400-3e21-11ea-9f87-a149ef7af1df.gif)

Coloring the text layers with shared styles a little bit tricky. You can [read this article](https://medium.com/@liebmann.helen/sketch-tutorial-how-to-color-override-text-layers-using-layer-styles-a-dream-coming-true-62aa874c42af) for detailed explanation.

![Assign shared styles to text layers](https://user-images.githubusercontent.com/3495307/73010663-d82fa500-3e23-11ea-8092-fc610c467a73.gif)

## Step 3: Switch Theme

**Your design is ready!** You can switch between Light and Dark themes by pressing Switch theme from plugins menu.

![Testing your design](https://user-images.githubusercontent.com/3495307/73011959-5ee58180-3e26-11ea-9f40-53a755773c8c.gif)

## Step 4: Export your color assets for developers

You can export the theme from the plugin menu for developers. They can use the exported files in **Xcode** or **Android Studio** and they do not spend extra effort to adapt your applications to the system theme.
