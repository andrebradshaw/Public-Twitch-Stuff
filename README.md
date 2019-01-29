# Public-Twitch-Stuff

This scipt can be used as a bookmarklet. 

Executing the script gives a user the ability to save and search live chats as they appear on a channel.


How it works:
Initializing the script adds a mutation observer to the chat window pane.
New chats are pushed into an array. chatArr = [[badges], username, first_mention, chat_text, timestamp, html_data]

A small search window allows users to earch by chat text or username


Notes: 
Chats are only saved from the time you execute the script. 
I intentionnaly avoided using forEach and map functions to reduce operation time, but I built and tested this script on a high end machine, so your results may vary.

Search button is redundant. Script automatically starts searching on the 3rd character.
Saving logs saves the entire log as a multi-dimentional array. 

