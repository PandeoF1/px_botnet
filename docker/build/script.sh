#!/bin/bash

# Start the first process
mysqld &

# Start the second process
#apachectl -D FOREGROUND &
apache2-foreground &
# Wait for any process to exit
wait -n
  
# Exit with status of process that exited first
exit $?

