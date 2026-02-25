# Document Authoring Migration Guide

This guide helps you migrate nav and footer content from git to Document Authoring (DA) at [da.live](https://da.live/edit#/blofft1/boilerplatecursor/en).

## Content to Migrate

### Nav Document

Create a `nav` document in your DA workspace at the **root level** (same level as `footer` and `index`), not inside `en/`.

**Important:** Do NOT paste markdown syntax. DA does not convert `[text](url)` to HTML links. Use the DA editor's native formatting:

1. **Section 1 (brand):** Type "Unknown, Untitled", select it, then use **Insert > Link** (or Cmd+K) to make it link to `/`
2. Use **Insert > Horizontal Line** (or type `---` on its own line) to create a section break
3. **Section 2 (nav links):** Use the **bullet list** button, then add each item:
   - "About" (Insert > Link → `/en/about`)
   - "<3" (Insert > Link → `/en/lab`)
4. Add another horizontal line
5. **Section 3 (tools):** Add "中文" (Insert > Link → `/zh`)

The header block expects: (1) a single link for brand, (2) a bullet list of links, (3) a third section. Using native links and lists instead of markdown ensures the pipeline outputs proper `<a>` and `<ul><li>` elements.

### Footer Document

Create a `footer` document in your DA workspace. Paste this content:

```
Contact@unknown-untitled.com

20 rue Rampal, F-75019 Paris, France

Social: [Instagram](https://www.instagram.com/unknown____untitled), [Are.na](https://www.are.na/unknown-untitled)
```

## Steps

1. Open [da.live/edit#/blofft1/boilerplatecursor/en](https://da.live/edit#/blofft1/boilerplatecursor/en)
2. Create `nav` (at root level) and `footer` documents
3. For nav: use Insert > Link and bullet list (see Nav Document above). For footer: paste the content
4. Use the AEM Sidekick to **Preview** and **Publish** both documents
5. Verify at https://main--boilerplatecursor--blofft1.aem.page that nav and footer load correctly
6. The git cleanup (removal of nav.md, footer.md, etc.) has been done in a separate commit

## Fragment Paths

EDS expects `nav` and `footer` at specific paths. If your DA structure uses `en/nav` or `fragments/nav`, ensure the content source configuration matches. Projects created via da.live Author Kit typically configure this automatically.

## Content Source Configuration

Projects created via [da.live/start](https://da.live/start) (Author Kit) have the content source configured automatically when you connect the GitHub repo. No fstab.yaml is required.

If you need to configure manually:
- **Admin API**: Use [admin.hlx.page](https://admin.hlx.page) or the AEM Cloud Manager to set the content source for `blofft1/boilerplatecursor` to the DA/AuthorBus endpoint
- **Verification**: After configuration, `curl https://main--boilerplatecursor--blofft1.aem.page/nav.plain.html` should return content from DA

## Troubleshooting: Nav Not Showing

If the footer works but the nav does not:

1. **Document location:** The nav must be at the **root level** (`/nav`), not inside `en/` (`/en/nav`). The header block expects `/nav.plain.html` by default.

2. **Content format:** DA does not convert markdown to HTML. If you pasted `- [text](url)`, the pipeline returns literal text in `<p>` tags instead of `<a>` links. The header block needs real `<a>` and `<ul><li>` elements. Use the DA editor's **Insert > Link** and **bullet list** formatting instead of markdown.

3. **Re-publish:** After fixing the nav document, use the Sidekick to **Publish** the nav again. Unpublished changes may not appear.
