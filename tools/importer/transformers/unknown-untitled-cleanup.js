/* eslint-disable */
/* global WebImporter */

/**
 * Transformer for Unknown, Untitled website cleanup
 * Purpose: Remove non-content elements and fix DOM for import
 * Applies to: unknown-untitled.com (all templates)
 * Tested: /en
 * Generated: 2026-02-25
 *
 * SELECTORS EXTRACTED FROM:
 * - Captured DOM during migration workflow of https://unknown-untitled.com/en
 * - Elements verified via Playwright snapshot and DOM evaluation
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform',
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove navigation menu
    // EXTRACTED: Found <div class="menu mobile-hidden"> in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.menu',
    ]);

    // Remove overlay background
    // EXTRACTED: Found <div class="overlay-background hidden"> in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.overlay-background',
    ]);

    // Remove decorative screensaver section
    // EXTRACTED: Found <div class="screensaver"> with animated layout images in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.screensaver',
    ]);

    // Re-enable scrolling
    // EXTRACTED: Captured DOM showed <body class="no-scroll">
    if (element.classList && element.classList.contains('no-scroll')) {
      element.classList.remove('no-scroll');
      element.setAttribute('style', 'overflow: scroll;');
    }
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove remaining non-content elements
    WebImporter.DOMUtils.remove(element, [
      'noscript',
      'link',
    ]);
  }
}
