#!/usr/bin/env node 
const ingester = require('commander');

ingester
  .version('1.0.0')
  .name('ingest-prof')
  .description('CLI utility to ingest .cpuprofile files into the exiting mongo database')
  .usage('[.cpuprofile filepath]')
  .option('-n,--name [filename]', 'optional custom filename', 'current UTC timestamp')
  .parse(process.argv)