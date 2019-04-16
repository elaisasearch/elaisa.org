#!/bin/bash
osascript <<END 
tell application "Terminal"
    do script "cd \"`pwd`\" && pip3 install -r ../requirements.txt;python ../services/service-api/api.py"
end tell
END

osascript <<END 
tell application "Terminal"
    do script "cd \"`pwd`\" && cd ../services/service-ui/;yarn && yarn start"
end tell
END

osascript <<END 
tell application "Terminal"
    do script "cd \"`pwd`\" && mongod"
end tell
END
