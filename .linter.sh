#!/bin/bash
cd /home/kavia/workspace/code-generation/simplestudenteats-27082-c6e81338/simplestudent_eats
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

