# Design direction

These are first-pass interpretations of the supplied reference images, not exact color sampling or final brand decisions. Every visual style has a light and dark mode. Button accent color is independent of style and mode.

## Themes

| Style | Reference direction | Light and dark treatments |
| --- | --- | --- |
| `poster` | Dark editorial poster | Warm off-white and charcoal surfaces with strong ink contrast |
| `paper` | Old paper, newspaper layout, colorful neo-brutalist controls | Beige and ink-brown surfaces with coral, teal, yellow, pink, and purple decorative highlights |
| `electric` | High-contrast contemporary interfaces | Light graphite and deep black surfaces with lime and purple decorative highlights |

The available Button accents are red, turquoise, yellow, lime, purple, and pink. Each style has a suggested default accent, but consumers can select any accent for a provider or one Button.

## Shared visual rules

- Use strict grids, conspicuous borders, square or slightly softened corners, and hard offset shadows. Shadows are solid color blocks, with no blur.
- Use a heavy sans display face for headlines, a readable sans for controls and body copy, and editorial serif or mono faces for occasional labels and supporting text.
- Preserve the raw poster and newspaper feel through rules, labels, numbering, and compact metadata. Keep long-form reading surfaces calmer than promotional surfaces.
- Treat bright accents as emphasis, not as a replacement for readable text. Semantic colors keep the same role in every theme.
- Keep touch targets at least the shared medium component size and make keyboard focus visible on web.
- Add texture and grain only as optional decoration. Core controls must remain clear and usable without image assets.

## Implementation boundary

`packages/tokens/src/tokens.json` is the source of truth. The token build generates CSS variables for web; native components consume the same values directly. Web and native components may use different rendering techniques to produce the same design intent.

The library name, fonts, precise palette values, and full component catalog remain open decisions. The style identifiers are working names and can be changed before npm publication.
