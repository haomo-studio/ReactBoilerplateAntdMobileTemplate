#!/bin/bash
npm run build
rsync -avz build/* member@haomo-studio.com:/var/www/html/pt/rbamt/
