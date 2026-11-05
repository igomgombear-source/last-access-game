import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const app=path.join(root,'../site');
const baseline=JSON.parse(fs.readFileSync(path.join(root,'v12-preservation.json'),'utf8'));
for(const [name,hash] of Object.entries(baseline)) assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(app,name))).digest('hex'),hash,name);
const manifest=JSON.parse(fs.readFileSync(path.join(app,'version.json'),'utf8'));
for(const [name,hash] of Object.entries(manifest.hashes)) assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(app,name))).digest('hex'),hash,name);
const html=fs.readFileSync(path.join(app,'index.html'),'utf8');
const scripts=[...html.matchAll(/<script src="([^"]+)"/g)].map(m=>m[1]);
for(const file of scripts){const result=spawnSync(process.execPath,['--check',path.join(app,file)],{encoding:'utf8'});assert.equal(result.status,0,result.stderr);}
new vm.Script(scripts.map(file=>fs.readFileSync(path.join(app,file),'utf8')).join('\n'));
const addon=fs.readFileSync(path.join(app,'deduction-v13.js'),'utf8');
// Execute only the isolated new pure decision function, never the local game or DOM.

const pure=addon.slice(0,addon.indexOf('const V13previousPuzzle'));
const rules=vm.runInNewContext(pure+'\nV13Evidence;',Object.create(null));
const seen=['B21','B22','B23','B24','B25'];
const cases=[
 ['meeting','B24',seen,true,'supported'],
 ['meeting','B25',seen,true,'supported'],
 ['meeting','B22',seen,true,'plan'],
 ['meeting','B21',seen,true,'sync'],
 ['','B24',seen,true,'incomplete'],
 ['meeting','',seen,true,'incomplete'],
 ['meeting','B24',[],true,'unseen'],
 ['meeting','B99',seen,true,'unseen'],
 ['murder','B24',seen,true,'claim'],
 ['meeting','B24',seen,false,'locked'],
 ['meeting','B25',seen,false,'locked']
];
for(const [claim,evidence,read,ready,expected] of cases)assert.equal(rules.assess(claim,evidence,read,ready),expected);
assert(addon.includes("V13previousHandle({act:'b9-verify', id:'BP5'})"));
assert(addon.includes("state.bpuzzle !== 'BP5' || B9DONE('BP5')"));
console.log(JSON.stringify({preservedFiles:Object.keys(baseline).length,manifestFiles:Object.keys(manifest.hashes).length,decisionCases:cases.length,localGameExecuted:false,httpsGameplay:'pending'},null,2));
