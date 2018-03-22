# dotastalk

## What is this?
As soon as you accept a match you can see your opponents ranks. Additionally you can quickly access their opendota page to see your win+loss ratio vs them or to check their most picked heroes.

## Setup
If you are looking for an easy install go to releases there is a windows installer.
If running from source a quick npm install and npm start.

## Once its running
Go to setup and locate the server_log.txt (its usually found at C:/Program Files (x86)/Steam/steamapps/common/dota 2 beta/game/dota/server_log.txt)
Enjoy

## WILL I GET VAC BANNED THO?????
Nope, what the app does is watch the server_log.txt file for changes. When you join a match that file gets updated with a list of the players in the match. I then use OpenDota's api to check each player's rank. No packet sniffing, no interaction with the Dota client at all.
