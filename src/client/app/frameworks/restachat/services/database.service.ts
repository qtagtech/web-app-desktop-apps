import {Injectable, Inject, NgZone} from '@angular/core';
import {FIREBASE} from '../../restachat/index';


@Injectable()
export class DatabaseService {
    private database: any;
    private onSync: Function;
    private userID: string;

    constructor(@Inject(FIREBASE) firebase: any, private ngZone: NgZone){
        console.log('constructung DatabaseService');

        //Initialize firebase
        var config = {
            apiKey: "AIzaSyD5i_flNE710tN-_k8oJsRG6G8i1MR3lK4",
            authDomain: "restachat-df3c5.firebaseapp.com",
            databaseURL: "https://restachat-df3c5.firebaseio.com",
            storageBucket: "restachat-df3c5.appspot.com"
        };
        firebase.initializeApp(config);
        this.database = firebase.database();
    }

    sync(path: string, onValueReceived: Function):void{
        this.database.ref(path).on('value', (snapshot: any)=>{
            this.ngZone.run(()=>{
                onValueReceived(snapshot.val());
            });
        });
    }

    addChild(path: string, data: any, callback?:Function):void{
        this.database.ref(path).push(data, (err: any)=>{
            if(callback && !err){
                this.ngZone.run(()=>{
                    callback();
                });
            }
        });
    }
}