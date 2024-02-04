// remember user location if they are redirected to login screen
let goto = "";
export const setRedirectedFrom = (from: string) => (goto = from);
export const getRedirectedFrom = () => goto;
