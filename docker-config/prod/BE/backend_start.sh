#!/bin/sh
sleep 10

# Start the application in the background
# npm start &

# # Wait for a few seconds to ensure the app is running
# sleep 5

# # Run the setup script
# npm run setup

# Keep the container running    
# wait

npm run build

node ./dist/src/server.js

sleep 5

node ./dist/src/scripts/createDb.js

./node_modules/typeorm/cli.js migration:run  -d ./dist/ormconfig.js


node ./dist/src/seeders/index.js

wait