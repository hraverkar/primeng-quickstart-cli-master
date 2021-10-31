import { HttpHeaders } from "@angular/common/http";

export class constantFile {
    static getHeaders(): HttpHeaders | { [header: string]: string | string[]; } {
        const token = sessionStorage.getItem("ACCESS_TOKEN");
        const header = new HttpHeaders({
            'x-access-token': `${token}`
        });
        return header;
    }

}