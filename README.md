BitcoinExchangeRateWidget
=========================

OSX dashboard widget showing latest USD/BTC rate

![Widget Snapshot](source/Default.png)

### Instalación ###

Clone the repo, then...

Install various modules and components:
`npm install`
`bower install`

Generate the "default" image by taking a screen cap of the widget:
`./phantom_screenshot.js`

Copy the bower component dependencies into the source folder:
`grunt bowercopy`

Copy the source files into "BitcoinRate.wdgt" folder:
`grunt copy`

The target folder "BitcoinRate.wdgt" is now a clickable widget you can install into dashboard.
