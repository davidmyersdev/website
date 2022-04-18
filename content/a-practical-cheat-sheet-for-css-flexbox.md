# A Practical Cheat Sheet for CSS Flexbox (Containers)

I originally posted this Flexbox cheat sheet [on Twitter](https://twitter.com/voraciousdev/status/1419769440938364928), but the response was so positive that I decided to write it up here too! We will cover the (in my opinion) most common scenarios for Flexbox.

If you just want the cheat sheet (pictured above), [you can download it here](https://imgur.com/a/zhG7Yoj)!

### Table of Contents

- [A Practical Cheat Sheet for CSS Flexbox (Containers)](#a-practical-cheat-sheet-for-css-flexbox-containers)
    - [Table of Contents](#table-of-contents)
  - [Horizontal Alignment](#horizontal-alignment)
    - [Anchor group to the center (horizontally)](#anchor-group-to-the-center-horizontally)
    - [Anchor group to the right side](#anchor-group-to-the-right-side)
    - [Add space around all items](#add-space-around-all-items)
    - [Add space between all items](#add-space-between-all-items)
  - [Vertical Alignment](#vertical-alignment)
    - [Anchor group to the center (vertically)](#anchor-group-to-the-center-vertically)
    - [Anchor group to the top](#anchor-group-to-the-top)
    - [Anchor group to the bottom](#anchor-group-to-the-bottom)
  - [Perfect (Vertical and Horizontal) Center Alignment](#perfect-vertical-and-horizontal-center-alignment)
  - [Content Direction](#content-direction)
    - [Reverse the flow of content (horizontally)](#reverse-the-flow-of-content-horizontally)
    - [Flow content vertically instead of horizontally](#flow-content-vertically-instead-of-horizontally)
    - [Reverse the flow of content (vertically)](#reverse-the-flow-of-content-vertically)
  - [Content Wrapping](#content-wrapping)
    - [Wrap content to next lines (flow down)](#wrap-content-to-next-lines-flow-down)
    - [Wrap content to previous lines (flow up)](#wrap-content-to-previous-lines-flow-up)
  - [Default Behavior](#default-behavior)

## Horizontal Alignment

You can align items horizontally as a group or individually.

### Anchor group to the center (horizontally)

```css
.container {
  display: flex;
  justify-content: center;
}
```

![](https://i.imgur.com/DXQx513.png)

### Anchor group to the right side

```css
.container {
  display: flex;
  justify-content: flex-end;
}
```

![](https://i.imgur.com/jsBsnlq.png)

### Add space around all items

```css
.container {
  display: flex;
  justify-content: space-around;
}
```

![](https://i.imgur.com/YkwhcTE.png)

### Add space between all items

```css
.container {
  display: flex;
  justify-content: space-between;
}
```

![](https://i.imgur.com/FuFXnmh.png)

## Vertical Alignment

You can align items vertically as a group.

### Anchor group to the center (vertically)

```css
.container {
  display: flex;
  align-items: center;
}
```

![](https://i.imgur.com/Ar3SGwr.png)

### Anchor group to the top

```css
.container {
  display: flex;
  align-items: flex-start;
}
```

![](https://i.imgur.com/FPE2iwN.png)

### Anchor group to the bottom

```css
.container {
  display: flex;
  align-items: flex-end;
}
```

![](https://i.imgur.com/XvJuZBl.png)

## Perfect (Vertical and Horizontal) Center Alignment

You can combine selectors to get your desired layout. Perfect centering is a breeze with Flexbox.

```css
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

![](https://i.imgur.com/szacZbz.png)

## Content Direction

You can change the overall content flow (column or row), and you can even change the arrangement of content.

### Reverse the flow of content (horizontally)

```css
.container {
  display: flex;
  flex-direction: row-reverse;
}
```

![](https://i.imgur.com/4WZXnbY.png)

### Flow content vertically instead of horizontally

```css
.container {
  display: flex;
  flex-direction: column;
}
```

![](https://i.imgur.com/4C0f7kF.png)

### Reverse the flow of content (vertically)

```css
.container {
  display: flex;
  flex-direction: column-reverse;
}
```

![](https://i.imgur.com/uqVFhKd.png)

## Content Wrapping

By default, all items are put on a single line.

```css
.container {
  display: flex;
}
```

![](https://i.imgur.com/utYDsX5.png)

### Wrap content to next lines (flow down)

```css
.container {
  display: flex;
  flex-wrap: wrap;
}
```

![](https://i.imgur.com/tNyEkEi.png)

### Wrap content to previous lines (flow up)

```css
.container {
  display: flex;
  flex-wrap: wrap-reverse;
}
```

![](https://i.imgur.com/Bj5Xmz2.png)

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

![](https://i.imgur.com/WrZXttr.png)

Thanks for taking the time to check this out! If you think something is missing or you just want to say hello, please leave a comment below! ✌️
