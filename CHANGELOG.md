# Change log

## [0.2.0](https://github.com/dreiparrent/kahani/compare/0.1.2...0.2.0) (03-03-2019)
### Features
* **Dash:** Located at ~/dash
* **Client Information:** Dash includes email, phone, and website. (Created with room for more information)
* **Client Information Editing:** Editing  will arrive with notes update (undetermined version) or database update (0.3.0)
* **Client Class:** A Client is now its own object containing campaigns and notes.
* **Starred:** All cards are draggable - created to move cards to starred section. (working implementation in next patch).
* **Notes:** A start to note taking within the dash to expedite client meetings
* **Campaigns:** Listed cards with Client's campaigns. Cards have basic details. "Edit" allows changes.
* **Campaign Details:** A container with simle interface for campaign configuration.
* **Campaign Content:** The main configuration of a client.
* **Campaign Themes:** A layout for making changes to a campaigns themes. (working implementation in patch ^0.3.0)
* **Campaign Responses:** A layout for responses. (working implementation in patch ^0.3.1)

#### Hidden Features
* **Dash Page:** Because there is no "button," can be found [here](https://kahani.aparrent.com/dash)
* **Clients Nav:** Can be accessed by clicking "CLIENT" in header or by clicking any far-left edge of dash
* **Details:** Opened/Closed though "Edit" in each campaign card. Also closed by clicking campaign name sub-header
* **Details Folding:** Clicking the text "Content," "Themes," or "Responses" folds the details

## Performance Improvements
* **Lazy Loading/Chunks:** Each client page is ~1mb. Dash is ~200kb.

### Bug Fixes
* **Project Structure:** Reorganized and nested - Components, Layouts, Shared are noew top-level
* **Loading:** Lazy-loading added (seperate chunks)
* **Loading Chunks:** Dash, Client Home, and Client Record are now seperate chunks
* **Dynamic Form Dependency:** Dynamic forms can show/hide dependent on responses
* **Dynamic Form Class:** Removed Question object decleration in test variables
* **Dynamic Form Types:** Number and Color added for dash
* **Dynamic Form Layout:** Each input/question is now forced to one line
* **Text/Font Types:** Text, Image, (and Video) are now selectable types
* **Background Object:** Now included in cofig: Color, Image, Video; content and bg color

### Breaking Changes
* **Firebase CLI:** Now located in seperate repo
* **Redirects** The anything redirect was removed. Pages will 404 if incorrect path is provided.
* **Dynamic Form Layout:** No configuration exists to flex layout inputs
* **Testing:** Project structure changes likely to hinder all tests 
* **Karma:** No spec files were checked.
* **Material Stub:** New material modules were not stubbed.
* **e2e:** No changes made to suite project structure.


## [0.1.2](https://github.com/dreiparrent/kahani/compare/master...0.1.2) (02-16-2019)

### Features
* **Change Log:** Change log created
* **Version Number:** The every page now displays a version number relative to this document
* **Colors:** The background of questions now matches the theme colors
* **Button Design:** The record, play, and submit button are inline circular designs
* **Button Animation:** The buttons now animate in and out
* **Mobile Support:** Resizing is simplified

### Bug Fixes
* **Resize Support:** The record page properly resizes
* **Full Screen Design:** The page uses all space based on the size of the recording element
* **Time Removal:** The time indicator has been redesigned so that it's not so intrusive
* **TOS Click:** The area to click the TOS link now includes the entire text