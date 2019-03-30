import credentials from "./Credentials"
import {google} from "googleapis"
export default class GoogleDriveAccess {
    //https://developers.google.com/drive/api/v3/quickstart/nodejs
    constructor(fileUrl) {
        authorization()
        this.drive = new google.drive({
            version: 'v3',
            auth
        });
        drive.files.list({
            pagesSize: 5,
        })

    }

    authorization() {

    }

    listData(path = "")

    }
}