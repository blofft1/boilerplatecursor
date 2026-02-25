/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-portfolio block
 *
 * Source: https://unknown-untitled.com/en
 * Base Block: cards
 *
 * Block Structure (from Cards markdown example):
 * - Row 1: Block name header ("Cards-Portfolio")
 * - Row 2-N: Each row = one card with [image | link text]
 *
 * Source HTML Pattern (from .home-layout-inner):
 * <div class="home-layout-inner">
 *   <div class="line media-line">
 *     <a href="/en/work/wind-turbines">
 *       <figure><div class="image-wrapper"><img src="..." alt="..."></div></figure>
 *     </a>
 *     <a href="/en/work/hardware-research-lab">
 *       <figure><div class="image-wrapper"><img src="..." alt="..."></div></figure>
 *     </a>
 *   </div>
 *   ... more .line rows
 * </div>
 *
 * Some items use <video> instead of <img> inside figure.
 * Project titles come from footer index but are not visible in grid.
 *
 * Generated: 2026-02-25
 */
export default function parse(element, { document }) {
  // Extract all project links from the grid
  // VALIDATED: Each project is an <a> wrapping a <figure> inside .line.media-line rows
  const projectLinks = Array.from(element.querySelectorAll('.line.media-line a'));

  const cells = [];

  projectLinks.forEach((link) => {
    const href = link.getAttribute('href') || '';

    // Extract image from the figure
    // VALIDATED: Images are inside figure > .image-wrapper > img
    // Some use lazy loading with data-src attribute
    const img = link.querySelector('img');

    // Check for video (some projects use video instead of image)
    // VALIDATED: Found <video src="..."> in figure > .video-wrapper for some items
    const video = link.querySelector('video');

    // Build image cell
    const imageCell = document.createElement('div');
    if (img) {
      // Use data-src for lazy-loaded images, fallback to src
      const actualSrc = img.getAttribute('data-src') || img.getAttribute('src') || '';
      // Skip placeholder data URIs
      if (actualSrc && !actualSrc.startsWith('data:')) {
        const newImg = document.createElement('img');
        newImg.src = actualSrc;
        newImg.alt = img.alt || '';
        imageCell.appendChild(newImg);
      } else if (actualSrc.startsWith('data:') && img.getAttribute('data-src')) {
        const newImg = document.createElement('img');
        newImg.src = img.getAttribute('data-src');
        newImg.alt = img.alt || '';
        imageCell.appendChild(newImg);
      }
    } else if (video) {
      // For video items, create a placeholder note
      const videoSrc = video.getAttribute('src') || '';
      const p = document.createElement('p');
      p.textContent = `Video: ${videoSrc}`;
      imageCell.appendChild(p);
    }

    // Build link cell with project name derived from URL path
    const linkCell = document.createElement('div');
    const projectLink = document.createElement('a');
    projectLink.href = href;
    // Generate readable project name from URL slug
    const slug = href.split('/').pop() || '';
    const projectName = slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    projectLink.textContent = projectName;
    linkCell.appendChild(projectLink);

    // Only add card if we have content
    if (imageCell.hasChildNodes()) {
      cells.push([imageCell, linkCell]);
    }
  });

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, {
    name: 'Cards-Portfolio',
    cells,
  });

  // Replace original element with structured block table
  element.replaceWith(block);
}
