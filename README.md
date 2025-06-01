# ds-html-assignment
assignment given by the company

This is a demo project based on the instruction provided.The web app takes a fixed user name and password for Log in.

Login Page (index.html) Includes form validation and checks the username and password against a predefined set.

#username : testUser
#password : MySecret@123

The welcome page contains two links,one to the configuration page,another to the site data page which simulates a tabular data.

In configuration page user can change app's color theme and navbar style.I used localStorage to store user preferences so that they persist even after navigating between pages (except on the login page).

For site data page we have used a public API to fetch and display data for a table.All the components of the application follows color theme according to the choosen theme.Since we have used a public API to simulate data,none of these datas are actually editable,so the action buttons are designed and will prompt for action,but won't actually modify the data.But the export button will download the table data into a excel sheet.We are using xlxs.js library to  export the data in excel format.

I added a nav menu option too to visit the multi tab page along with the add button from the site data page.The multitab page shows a form to add a user info to the site and another tab will show the data collected from the form.These data are saved in the localstorage and will be shown in tabular format .The user will be able to edit and delete the data for a row.Upon clicking edit button a pop up modal appears populating the row data and allows user to edit it.

The log out button allows logging out of the application

# how to run the file
simply extract the zip and run the file index.html.
Github repo link : 
