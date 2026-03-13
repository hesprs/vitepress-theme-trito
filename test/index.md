---
home: true
layout: home
hero:
  name: Trito
  text: visually refurbished VitePress default theme
  tagline: Some stuff that is very long so that it can be a tagline.
  actions:
    - theme: brand
      text: API Examples
      link: /api-examples
    - theme: alt
      text: Markdown Examples
      link: /markdown-examples
features:
  - title: Lorum ipsum ...
    icon: 🧪
    details: With link and linkText
    link: /api-examples
    linkText: API Examples
  - title: Lorum ipsum ...
    icon: 🐣
    details: With link only
    link: /api-examples
  - title: Lorum ipsum ...
    icon: 🧩
    details: Lorum ipsum ...
  - title: Lorum ipsum ...
    icon: 🦾
    details: Lorum ipsum ...
---

<script setup>
import { VPTeamMembers } from '@'

const members = [
  {
    avatar: 'https://www.github.com/yyx990803.png',
    name: 'Evan You',
    title: 'Developer',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  },
]
</script>

<VPTeamMembers size="small" :members />
