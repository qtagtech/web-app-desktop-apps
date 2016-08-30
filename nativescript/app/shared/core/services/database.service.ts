import {Injectable, Inject, NgZone} from '@angular/core';
import {FIREBASE} from '../../../app/frameworks/restachat/index';

@Injectable
export class NSDatabaseService{
    private database: any;
    private onSync: Function;
    private userID: string;
    

    constructor(@Inject(FIREBASE) firebase: any, private NgZone: NgZone){
        console.log('Constructing NSDatabaseService');
        this.database = firebase;
        this.database.init({
            persist: true //Allow disl persistance, Default FALSE.
        }).then((instance: any)=>{
            console.log('Firebase.init successful');
        }, (error: any)=>{
            console.log('firebase.init error');
        });
    }

    sync(path: string, onValueReceived: Function):void{
        this.database.addValueEventListener((result:any)=>{
            this.NgZone.run(()=>{
                onValueReceived(result.value);
            });
        }, path);
    }

    addChild(path: string, data: any, callback?:Function):void{
        this.database.push(path, data).then((result:any)=>{
            console.log('created key: '+ result.key);
            if(callback){
                this.NgZone.run(()=>{
                    callback(result.key);
                });
            }
        });
    }
}