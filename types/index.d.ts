import {TUser}  from "@/Model/user.model";

declare global {
    namespace Express {
        interface User extends TUser {}
    }
         interface Navigator{
            msSaveBlob:(blob: Blob,fileName:string) => boolean
        }
 }