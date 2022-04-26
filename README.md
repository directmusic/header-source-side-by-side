# Header/Source Side-By-Side

[![View on Marketplace](https://vsmarketplacebadge.apphb.com/version/JosephLyncheski.header-source-side-by-side.svg
)](https://marketplace.visualstudio.com/items?itemName=JosephLyncheski.header-source-side-by-side) ![Install banner](https://vsmarketplacebadge.apphb.com/installs/JosephLyncheski.header-source-side-by-side.svg
)

Made by [Direct](https://twitter.com/directmusic) :)

![Preview GIF](https://raw.githubusercontent.com/directmusic/header-source-side-by-side/main/assets/preview_gif.gif)

This extension will attempt to open a related file (myFile.cpp / myFile.h) in a tab group to the left and right. Running the command again will swap the cursor location from these two groups. This is similar to Xcode.

## Features

- Open the header and implementation files (or any similarly named files) side-by-side.

## Extension Settings

This extension contributes the following settings:

* `header-source-side-by-side.side-by-side`: Open a tab group to the right or left with the related file.
* `header-source-side-by-side.switch_file_in_same_window`: Swap between the related file in the same group.

## Release Notes

#### 0.2.2 - 04/26/2022
- Fixed regression.

#### 0.2.1 - 04/26/2022
- Further improved the glitchiness when first opening a new editor.

#### 0.2.0 - 04/25/2022
- Renamed `do` to `side-by-side`
- Fixed glitchiness when swapping between two groups.
- Added `switch_file_in_same_window` as an alternative to the C/C++ extension's Header/Implementation swap.

**0.1.0** Switched to Node's fs for speed and the ability to filter easier.

**0.0.1** Initial release.

