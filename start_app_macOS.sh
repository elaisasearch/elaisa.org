#!/bin/bash
osascript <<END 
tell application "Terminal"
    do script "cd \"`pwd`\" && pip3 install -r backend/requirements.txt;python backend/api/api.py"
end tell
END

osascript <<END 
tell application "Terminal"
    do script "cd \"`pwd`\" && cd frontend/;yarn && yarn start"
end tell
END

osascript <<END 
tell application "Terminal"
    do script "cd \"`pwd`\" && mongod"
end tell
END
