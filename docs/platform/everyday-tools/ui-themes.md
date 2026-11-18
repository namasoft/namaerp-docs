---
description: "Themes in the modern interface: picking a theme and switching between light and dark, the dark top bar and menu, setting a company's default theme, building custom themes, and the thirteen built-in system themes."
entities: [GUITheme]
menu: Administration → Display Customization → New GUI Theme
---

# Themes

A theme decides how the modern interface looks, and since people spend the whole working day in front of it, that is not cosmetic. It sets the main colour of buttons and highlights, the background shades of the page, cards and grids, the font colours, and — in a few themes — whether the top bar and the menu stay dark even when the rest of the screen is light.

Every theme comes in two versions, a **light** one and a **dark** one, and each user switches between them with a single toggle. Choosing a theme and choosing dark or light are two separate decisions: a user on the Green theme who turns on dark mode gets *Green, dark*, not a different theme.

The modern interface ships with **thirteen ready-made system themes**, shown in full at the end of this page. An administrator can also build custom themes, and can set the theme a company starts on.

This two-minute video walks through all thirteen, each in light and dark and in English and Arabic:

<iframe style="width:100%;max-width:800px;aspect-ratio:16/9;border:0" src="https://www.youtube.com/embed/4R_-jWcGN8k" title="Nama ERP themes" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Picking a theme

The quickest way is the user menu: click your name at the top of the screen and open **GUI Themes List**. Each theme is listed with four colour dots — the light main colour, the light background, the dark main colour and the dark background — so you can tell them apart before clicking. The new theme applies at once; nothing has to be saved or reloaded.

To keep the menu short, it lists only:

- the theme the administrator set for you, if any, first and marked **Assigned by Admin** (see [The company's default theme](#The-companys-default-theme));
- the custom themes defined in the system (see below);
- the system themes you pinned, and the theme you are using now.

**More Themes**, at the end of the list, opens **Settings** on the **GUI Themes List** page, where every theme is shown.

![The theme list in the user menu](../../ar/platform/images/themes/theme-user-menu-en.png)

The same menu holds the **Dark Mode** switch, just above the list.

**Settings → GUI Themes List** shows all the themes as cards. The card of the theme in use is outlined and marked **Active**. The groups are:

- **Assigned by Admin** — shown only when the administrator set a theme for you or for your security profile, so that after moving to another theme you can go back to it with one click.
- **System Themes** — the thirteen built-in themes. They are not in the user menu unless you pin them: click the pin on a card to add that theme to the menu, and again to remove it.
- **Custom Themes** — themes defined in the system (see below), followed by **Edit My Theme**.

The same page holds the **Dark Mode** and **Dark Nav Bar And Side Bar** switches.

![Theme cards on the GUI Themes List page](../../ar/platform/images/themes/theme-preferences-cards-en.png)

::: info The choice belongs to the browser
The theme a user picks, the dark-mode setting and the pinned themes are remembered by the browser on that device. The same user on another computer, or in another browser, starts again from the company default.
:::

## Dark top bar and menu

Three of the system themes — **Navy**, **Gold** and **Black & White** — keep the top bar and the side menu dark even in light mode, which frames a bright working area with a dark border. The other themes keep the bars in the same light shade as the page.

A user who wants the opposite can change it on the **GUI Themes List** page of **Settings** with **Dark Nav Bar And Side Bar** — "Always show the nav bar and side bar in dark mode, even in light mode". That personal setting wins until the user picks a theme again; picking a theme returns to whatever that theme says.

## The company's default theme

A user who has never picked a theme on this browser gets, in order:

1. Their own personal theme, if they have one (see **Edit My Theme** below).
2. The theme in **GUI Theme** `settings.guiTheme` on the user's own record.
3. The theme in **GUI Theme** `guiTheme` on the user's security profile — the way to give a whole department one look.
4. The theme chosen in **Default System Theme** `value.info.defaultGUITheme`, on the **Appearance** tab of the global configuration (**Administration → Settings → System Settings**, file `global`). It can be any theme: one of the system themes or a custom one.
5. A custom theme with **Default Theme** ticked.
6. Otherwise, the built-in **Default Theme** — Nama's familiar blue.

So a company can give every new user, and every new device, a consistent look without telling anyone to change anything.

A theme set on the **user** or on the **security profile** is also applied **once** to users who already picked a theme of their own: the next time they open the system they find the new theme, and from then on they are free to pick another. Changing the theme there again applies it once more. The global configuration theme never overrides a theme the user picked.

## Custom themes

When none of the built-in themes fits — a company that wants its own brand colours, for example — themes can be defined as records on the **GUI Theme** screen (**Administration → Display Customization → New GUI Theme**). A theme record holds a full set of colours for the light version and another for the dark version, the font size and density, whether the toolbar shows labels, and the **Dark Nav Bar And Side Bar** default.

**Edit My Theme**, on the **GUI Themes List** page of **Settings**, opens the user's own theme for editing. A theme that has **Only For User** filled in is visible to that user alone. Creating a theme that everyone can see needs the **Can Create Theme For All Users** permission in the user's security profile, so one person's experiment does not end up in everybody's list.

## Reports in the theme's colour

The theme reaches beyond the screen. A report built with the Report Wizard prints by default in the **Theme colors** design, which fills the column titles with the theme's main colour and shades the rows to match, so a user on the Pink theme gets a pink report. The report always uses the light-mode colour and prints on white, even in dark mode. A result that is already open keeps its colours: after switching themes, press F5 in the report viewer to see it in the new ones. See [Report Designs](/platform/reports/report-designs).

## The system themes

Each theme below is shown on the same Sales Invoice, with the main menu open, first in light mode and then in dark mode.

### Default Theme

![Default Theme theme, light mode](../../ar/platform/images/themes/theme-namaDefaultTheme-light-en.png)

![Default Theme theme, dark mode](../../ar/platform/images/themes/theme-namaDefaultTheme-dark-en.png)

### Pink

![Pink theme, light mode](../../ar/platform/images/themes/theme-nm-rose-light-en.png)

![Pink theme, dark mode](../../ar/platform/images/themes/theme-nm-rose-dark-en.png)

### Navy

Keeps the top bar and the menu dark in light mode.

![Navy theme, light mode](../../ar/platform/images/themes/theme-nm-admiral-light-en.png)

![Navy theme, dark mode](../../ar/platform/images/themes/theme-nm-admiral-dark-en.png)

### Teal

![Teal theme, light mode](../../ar/platform/images/themes/theme-nm-confetti-light-en.png)

![Teal theme, dark mode](../../ar/platform/images/themes/theme-nm-confetti-dark-en.png)

### Fuchsia

![Fuchsia theme, light mode](../../ar/platform/images/themes/theme-nm-fuchsia-light-en.png)

![Fuchsia theme, dark mode](../../ar/platform/images/themes/theme-nm-fuchsia-dark-en.png)

### Red

![Red theme, light mode](../../ar/platform/images/themes/theme-nm-crimson-light-en.png)

![Red theme, dark mode](../../ar/platform/images/themes/theme-nm-crimson-dark-en.png)

### Light Blue

![Light Blue theme, light mode](../../ar/platform/images/themes/theme-nm-ocean-light-en.png)

![Light Blue theme, dark mode](../../ar/platform/images/themes/theme-nm-ocean-dark-en.png)

### Green

![Green theme, light mode](../../ar/platform/images/themes/theme-nm-forest-light-en.png)

![Green theme, dark mode](../../ar/platform/images/themes/theme-nm-forest-dark-en.png)

### Gold

Keeps the top bar and the menu dark in light mode.

![Gold theme, light mode](../../ar/platform/images/themes/theme-nm-midnight-light-en.png)

![Gold theme, dark mode](../../ar/platform/images/themes/theme-nm-midnight-dark-en.png)

### Orange

![Orange theme, light mode](../../ar/platform/images/themes/theme-nm-sunset-light-en.png)

![Orange theme, dark mode](../../ar/platform/images/themes/theme-nm-sunset-dark-en.png)

### Blue

![Blue theme, light mode](../../ar/platform/images/themes/theme-nm-corporate-light-en.png)

![Blue theme, dark mode](../../ar/platform/images/themes/theme-nm-corporate-dark-en.png)

### Purple

![Purple theme, light mode](../../ar/platform/images/themes/theme-nm-violet-light-en.png)

![Purple theme, dark mode](../../ar/platform/images/themes/theme-nm-violet-dark-en.png)

### Black & White

Keeps the top bar and the menu dark in light mode.

![Black & White theme, light mode](../../ar/platform/images/themes/theme-nm-minimal-light-en.png)

![Black & White theme, dark mode](../../ar/platform/images/themes/theme-nm-minimal-dark-en.png)
