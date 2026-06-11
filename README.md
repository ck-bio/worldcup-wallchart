# World Cup 2026 interactive wallchart

A browser-only interactive wall chart for the 2026 FIFA World Cup. Works offline, installable as a PWA, and prints to a clean two-column poster for those nostalgic pen \& paper vibes.

## Features

* **Live countdown** - ticking clock to the next kick-off, right in the header. Flips to a pulsing ● LIVE indicator when a match is in progress
* **Auto-updating scores** - polls two public API endpoints every 120 seconds. Falls back gracefully if both are unreachable
* **W/D/L result pills** - completed group matches get a coloured left or right border (green = winner's side, grey = draw) so you can read the result before you read the score
* **Real-time standings** - group tables update instantly with FIFA H2H tiebreaking rules applied (rules 1–6: points, GD, GF, H2H points, H2H GD, H2H GF)
* **Best third-place tracker** - a ranked table of all 12 third-placed teams, updated live as group results come in, showing which Round of 32 slot each provisionally fills. Disappears automatically once the group stage is complete
* **Print poster** - @media print stylesheet collapses to a clean two-column group-stage wall chart with score boxes as circles
* **Collapsible sections** - Group Stage, Best 3rd, and R32 can be collapsed with a single click, keeping the page manageable deep into the tournament

### Score entry

* Click any match - group stage or knockout - to enter or edit a score manually
* Manual scores persist across sessions via localStorage and take precedence over API data
* Simulation mode for playing around, testing, or leaving your next bet to chance

