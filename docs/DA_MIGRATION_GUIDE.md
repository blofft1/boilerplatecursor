# Document Authoring Migration Guide

This guide helps you migrate nav and footer content from git to Document Authoring (DA) at [da.live](https://da.live/edit#/blofft1/boilerplatecursor/en).

## Content to Migrate

### Nav Document

Create a `nav` document in your DA workspace (e.g. at `en/nav` or root-level `nav`). Paste this content:

```
- [Unknown, Untitled](/)

---

- [About](/en/about)
- [<3](/en/lab)

---

- [中文](/zh)
```

**DA format notes:**
- Use `---` (three hyphens) on a single line for section breaks
- Links use markdown syntax: `[text](url)`
- DA supports similar structure to the source; you may need to adapt to block tables if your project uses custom blocks

### Footer Document

Create a `footer` document in your DA workspace. Paste this content:

```
Contact@unknown-untitled.com

20 rue Rampal, F-75019 Paris, France

Social: [Instagram](https://www.instagram.com/unknown____untitled), [Are.na](https://www.are.na/unknown-untitled)
```

## Steps

1. Open [da.live/edit#/blofft1/boilerplatecursor/en](https://da.live/edit#/blofft1/boilerplatecursor/en)
2. Create `nav` and `footer` documents in the appropriate folder
3. Paste the content above into each document
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
