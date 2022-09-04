---
title: A Practical Cheat Sheet for CSS Flexbox (for Flex Items)
tags: [css]
banner:
  alt: The Flexbox Cheat Sheet (for Flex Items)
  url: https://voracious.dev/sheets/flexbox-items.png
createdAt: 2022-07-31T04:00:00.000Z
updatedAt: 2022-07-31T04:00:00.000Z
---

This guide is a follow-up to my previous [CSS Flexbox post on Flex Containers]().

<!-- more -->

## Default Behavior

The default behavior of Flexbox will...

- Treat the container as block (full width)
- Left align all items
- Stretch each item's height to fit the container
- Fit all items on a single line

```css
.container {
  display: flex;
}
```

::flex-container
  :::flex-item{class="highlighted"}
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
::

## Main Axis Alignment

You can align flex content along the main axis with the **justify-content** property. In typical layouts, this will be _horizontal_ alignment.

### Anchor content to the center of the main axis

```css
.container {
  display: flex;
  justify-content: center;
}
```

::flex-container{class="justify-center"}
  :::flex-item{class="highlighted"}
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
::

### Anchor content to the end of the main axis

```css
.container {
  display: flex;
  justify-content: flex-end;
}
```

::flex-container{class="justify-end"}
  :::flex-item{class="highlighted"}
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
::

### Add space around content along the main axis

```css
.container {
  display: flex;
  justify-content: space-around;
}
```

::flex-container{class="justify-around"}
  :::flex-item{class="highlighted"}
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
::

### Add space between content along the main axis

```css
.container {
  display: flex;
  justify-content: space-between;
}
```

::flex-container{class="justify-between"}
  :::flex-item{class="highlighted"}
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
::

## Cross Axis Alignment

You can align flex content along the cross axis with the **align-items** property. In typical layouts, this will be _vertical_ alignment.

### Anchor content to the center of the cross axis

```css
.container {
  display: flex;
  align-items: center;
}
```

::flex-container{class="items-center"}
  :::flex-item{class="highlighted"}
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
::

### Anchor content to the start of the cross axis

```css
.container {
  display: flex;
  align-items: flex-start;
}
```

::flex-container{class="items-start"}
  :::flex-item{class="highlighted"}
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
::

### Anchor content to the end of the cross axis

```css
.container {
  display: flex;
  align-items: flex-end;
}
```

::flex-container{class="items-end"}
  :::flex-item{class="highlighted"}
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
::

## Perfect Center Alignment (vertical and horizontal)

You can combine selectors to get your desired layout. Perfect centering is a breeze with Flexbox.

```css
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

::flex-container{class="items-center justify-center"}
  :::flex-item{class="highlighted"}
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
::

## Content Flow Direction

You can change the direction content flows (column or row), and you can even change the arrangement of content. The content flow will affect how other flex properties are applied. With **column** or **column-reverse**, the axes are swapped (see the final example in this section).

### Reverse the flow of content along the main axis (horizontal reversed)

```css
.container {
  display: flex;
  flex-direction: row-reverse;
}
```

::flex-container{class="flex-row-reverse"}
  :::flex-item{class="highlighted"}
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
::

### Flow content along the opposite axis (vertical)

```css
.container {
  display: flex;
  flex-direction: column;
}
```

::flex-container{class="flex-col"}
  :::flex-item{class="highlighted"}
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
::

### Reverse the flow of content along the opposite axis (vertical reversed)

As an added bonus, we'll also center the content along the new _main_ axis. Compare this to the first example in **Cross Axis Alignment** above.

```css
.container {
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
}
```

::flex-container{class="flex-col-reverse items-center"}
  :::flex-item{class="highlighted"}
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
::

## Content Wrapping

By default, all items will stay on a single line regardless of overflow.

_Note: These examples have been set to `overflow: scroll` to prevent the page from being distorted._

```css
.container {
  display: flex;
}
```

::flex-container
  :::flex-item{class="highlighted"}
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
::

### Wrap content to next lines (flow down)

```css
.container {
  display: flex;
  flex-wrap: wrap;
}
```

::flex-container{class="flex-wrap"}
  :::flex-item{class="highlighted"}
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
::

### Wrap content to previous lines (flow up)

```css
.container {
  display: flex;
  flex-wrap: wrap-reverse;
}
```

::flex-container{class="flex-wrap-reverse"}
  :::flex-item{class="highlighted"}
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
  :::flex-item
  :::
::

## Closing

Thanks for taking the time to check this out! I'd love to hear about how you're using Flexbox, so feel free to leave a comment below or reach out [on Twitter](https://twitter.com/voraciousdev) or [on GitHub](https://github.com/voraciousdev/community/discussions/1)! ✌️
