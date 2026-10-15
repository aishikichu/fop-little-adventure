import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./tests/browser',timeout:180000,workers:1,use:{baseURL:'http://127.0.0.1:4173',headless:true,viewport:{width:1280,height:900},launchOptions:{channel:'msedge'}},webServer:{command:'npm run preview -- --port 4173',url:'http://127.0.0.1:4173',reuseExistingServer:true},reporter:'list'});
