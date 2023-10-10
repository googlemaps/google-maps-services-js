#!/usr/bin/env bash

failed=0

cjsCode='const {Client} = require("./dist/"); new Client();'
esmCode='import {Client} from "./dist/index.js"; new Client();'

echo "test loading as commonJS..."
if ! node -e "${cjsCode}" ; then
  failed=1
  echo 'Loading package as commomJS failed' >&2
fi

echo "test loading as ESM..."
if ! node --input-type module -e "${esmCode}" ; then
  failed=1
  echo 'Loading package as ESM failed' >&2
fi

if [ $failed -eq 1 ] ; then exit 1 ; fi
