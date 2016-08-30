import {OpaqueToken} from '@angular/core';

export const FIREBASE: OpaqueToken = new OpaqueToken('firebase');
export * from './services/database.service';
