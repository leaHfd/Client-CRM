import { ResolutionType } from '../model/enums';

let AppResolutionType = ResolutionType.Desktop;
if (navigator.userAgent.toLowerCase().indexOf('android') >= 0 ||

    navigator.userAgent.toLowerCase().indexOf('iphone') >= 0) {
    AppResolutionType = ResolutionType.Mobile;
}

export { AppResolutionType };