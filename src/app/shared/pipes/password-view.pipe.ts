import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'passwordViewPipe'
})
export class PasswordViewPipe implements PipeTransform {

    transform(password: any): string {
        let paswwordView = "";
        if (password) {
            for (let i = 0; i < 5; i++) {
                paswwordView += "*";
            }
        }
        return paswwordView;

    }
}
