# Sneaker Manager

An app to keep track and manage your sneaker inventory and sales.
Keep track of inventory, sales, and shipments as your collection grows. 
Easily view upcoming releases as well as sitelists straight from the app.

## To-Do
- [ ] Finish UI
    - [x] Setup Undux Store
- [ ] Functionality for the backend
    - [x] Setup storage files
    - [ ] StockX Login
    - [ ] Goat Login
    - [ ] Shipping sites
        - [ ] USPS
        - [ ] UPS
        - [ ] Fedex
        - [ ] OR Try and find a shipment tracking API
    - [ ] Refresh market value
    - [ ] Grab drop info from Droplist endpoint
        - [ ] Tie in with SoleLinks to provide links for the drops? 
- [ ] Figure out sales. When you sync with StockX, there should be a popup with the new sales. If any of the sales overlap with inventory items (by style code), ask user if they want to create a new item or save it.

## Changes to make
- [ ] On add item form, make it so that if it's a StockX item, AutoSync is automatically enabled.
    - [ ] Change AutoSync to StockX? -> Custom items should not be AutoSynced
    - [ ] Save StockX Ticker

## Ideas to Implement
- [ ] List on StockX