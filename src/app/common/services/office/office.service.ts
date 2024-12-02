import { Injectable } from '@angular/core';

declare const Office: any;
declare const OfficeRuntime: any;

@Injectable({
    providedIn: 'root'
})
export class OfficeService {
    /**
     * @function getIDToken
     * @async
     * @description Calls the Azure Active Directory V 2.0 endpoint to get an access token to your add-in's web application
     * @see https://learn.microsoft.com/en-us/office/dev/add-ins/develop/sso-in-office-add-ins
     * @see https://learn.microsoft.com/en-us/javascript/api/office-runtime/officeruntime.auth?view=common-js-preview#office-runtime-officeruntime-auth-getaccesstoken-member(1)
     */
    async getIDToken$() {
        try {
            const userTokenEncoded = await OfficeRuntime.auth.getAccessToken({
                allowSignInPrompt: true,
                allowConsentPrompt: true,
                forMSGraphAccess: true,
            });
            return { error: undefined, ssoToken: userTokenEncoded }
        } catch (err) {
            return { error: err, ssoToken: undefined }
        }
    }

    /**
     * @description open dialog boxes in your Office Add-in
     * @param {string} startAddress Accepts the initial full HTTPS URL that opens in the dialog. Relative URLs must not be used.
     * @param {*} callbackFunc Optional. Accepts a callback function to handle the dialog creation attempt. If successful, the AsyncResult.value is a Dialog object.
     * @see https://learn.microsoft.com/en-us/office/dev/add-ins/develop/dialog-api-in-office-add-ins
     * @see https://learn.microsoft.com/en-us/javascript/api/office/office.ui?view=common-js-preview#office-office-ui-displaydialogasync-member(2)
     * @see https://learn.microsoft.com/en-us/javascript/api/office/office.ui?view=common-js-preview#office-office-ui-messageparent-member(1)
     * @see https://learn.microsoft.com/en-us/office/dev/add-ins/develop/parent-to-dialog
     * @see https://learn.microsoft.com/en-us/javascript/api/office/office.eventtype?view=common-js-preview
     */
    openDialog(startAddress = 'https://appvity-nhan-excel.azurewebsites.net/index.html', callbackFunc?: any) {
        Office.context.ui.displayDialogAsync(
            startAddress,
            { height: 55, width: 45, displayInIframe: true },
        
            function (asyncResult) {
                const dialog = asyncResult.value;
                dialog.addEventHandler(Office.EventType.DialogEventReceived, function (arg) {
                    callbackFunc(arg);
                });
            }
          );
    }

    openDialogMessageReceived(startAddress = 'https://appvity-nhan-excel.azurewebsites.net/index.html', callbackFunc: (data: {message?: any, error?: any}) => void) {
        Office.context.ui.displayDialogAsync(startAddress,
            { height: 55, width: 45, displayInIframe: true },
        
            function (asyncResult) {
                if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
                    const dialog = asyncResult.value;
                    dialog.addEventHandler(Office.EventType.DialogMessageReceived, (arg) => {
                        callbackFunc({ message: JSON.parse(arg.message) });
                        dialog.close();
                    });
                    dialog.addEventHandler(Office.EventType.DialogEventReceived, (arg) => {
                        callbackFunc({ error: arg.error });
                    });
                }
            }
          );
    }

    openMessageParent() {
        Office.context.ui.messageParent('Hello from the dialog!');
    }
}
