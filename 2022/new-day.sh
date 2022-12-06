#!/bin/bash

# create a new directory for the day
dir=day-$(printf "%02d" $1)
mkdir $dir

# get number after - from dir
day=$(echo $dir | cut -d- -f2)

# create index.js, input.txt, smol.txt and start.sh in the directory
touch $dir/index.ts
touch $dir/input.txt
touch $dir/smol.txt
touch $dir/start.sh

chmod +x $dir/start.sh

# runs index.ts
echo "#!/bin/bash" >> $dir/start.sh
echo "node -r esbuild-register index.ts" >> $dir/start.sh

day=$(echo $dir | cut -d- -f2)
echo "console.log('Day $day')" >> $dir/index.ts