=== AaronDSAMakes Scraper ===
Contributors: aaron
Tags: static site, github pages, export, backup, git
Requires at least: 5.9
Tested up to: 6.6
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Crawl every public route on this WordPress site into a static HTML/CSS/JS
copy under wp-content/scraper, then push it to a GitHub repo wired up to
GitHub Pages.

== Description ==

* Discovers every published post, page, custom post type entry, and
  taxonomy term archive (plus any extra paths you list) and fetches the
  fully rendered HTML for each over HTTP.
* Mirrors theme, plugin, and core CSS/JS assets into the export.
* Symlinks (or NTFS-junctions on Windows) `wp-content/uploads` into the
  export instead of duplicating your media library on disk.
* One-click push of the static export to a GitHub repository, ready for
  GitHub Pages. Because GitHub Pages does not serve symlinks, the push
  step mirrors the export into a separate git working tree and resolves
  symlinks to real files only at that point.

See README.md in the plugin folder for full setup instructions, including
the GitHub Pages / project-subpath URL caveat and the Windows symlink
fallback behavior.

== Installation ==

1. Copy this folder to `wp-content/plugins/aarondsamakes-scraper`.
2. Activate it under Plugins.
3. Go to Static Scraper in the admin menu, fill in Settings, click
   "Build Static Site", then "Push to GitHub".

== Changelog ==

= 1.0.0 =
* Initial release.
