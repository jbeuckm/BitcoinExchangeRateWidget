BitcoinExchangeRateWidget
=========================

OSX dashboard widget showing latest USD/BTC rate

![Widget Snapshot](source/Default.png)

### Instalación ###

Download the repo. The `BitcoinRate.wdgt` folder is ready to click and install.

### Build the Project ###

Clone the repo, then...

* Install various modules and components:
`npm install`
`bower install`

* Build the widget:

`grunt build`
The target folder "BitcoinRate.wdgt" is now a clickable widget you can install into dashboard.

* Install the widget:

`./install.sh`

### Sub-tasks: ###

Generate the "default" image by taking a screen cap of the widget:
`./phantom_screenshot.js`

Copy the bower component dependencies into the source folder:
`grunt bowercopy`

Copy the source files into "BitcoinRate.wdgt" folder:
`grunt copy`

