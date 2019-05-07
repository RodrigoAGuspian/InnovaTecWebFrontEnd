import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor() { }

    // This uses the new custom-element method to add the popup to the DOM.
    CreateElementToast(message: string | number) {
        // Create element
        const toast = document.createElement('a');

        toast.setAttribute('onclick', `M.toast({html: '${message}'})`);
        toast.click();
        setTimeout(() => { toast.remove() }, 4000);

        // Add to the DOM
        document.body.appendChild(toast);
    }
}
