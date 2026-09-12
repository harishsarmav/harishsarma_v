---
layout: default
title: Notes
permalink: /notes/
description: Notes and writing from Harish Sarma.
---

<section class="page-hero shell">
  <div class="reveal"><p class="eyebrow">NOTEBOOK · 03</p><h1>Thoughts, <span class="gradient-text">lessons</span> & rabbit holes.</h1><p class="page-deck">Writing is how I turn scattered ideas into something I can revisit.</p></div>
</section>

<section class="section shell">
  <div class="notes-archive">
    {% for post in site.posts %}
    <a class="note-row note-row-large{% if forloop.first %} note-row-featured{% endif %} reveal" href="{{ post.url | relative_url }}">
      <span class="note-bg" style="background-image:url('{{ post.cover-img | relative_url }}')" aria-hidden="true"></span>
      <span class="note-overlay" aria-hidden="true"></span>
      <span class="note-ghost-title" aria-hidden="true">{{ post.title }}</span>
      <span class="note-content">
        <span class="note-date">{{ post.date | date: "%b %Y" }}</span>
        <span class="note-title">{{ post.title }}</span>
        {% if post.subtitle %}<span class="note-subtitle">{{ post.subtitle }}</span>{% endif %}
      </span>
      <span class="note-arrow">↗</span>
    </a>
    {% endfor %}
  </div>
</section>
