---
outline: deep
---

# Markdown Extension Examples

This page demonstrates some of the built-in markdown extensions provided by VitePress.

## Syntax Highlighting

VitePress provides Syntax Highlighting powered by [Shiki](https://github.com/shikijs/shiki), with additional features like line-highlighting:

**Input**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## Custom Containers

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## Lists

- 1
  - 1-1
  - 1-2
  - 1.3
- 2
- 3

1. one
2. two
3. three
4. three-one
5. three-two
6. four

## Headings

## Heading 2

## Heading 2

### Heading 3

### Heading 3

### Heading 3

#### Heading 4

#### Heading 4

## More

![preview image of a document page with light and dark theme](https://github.com/hesprs/vitepress-theme-trito/raw/main/assets/preview2.png)

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown).
