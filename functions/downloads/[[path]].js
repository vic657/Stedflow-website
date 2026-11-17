import { handleDownload } from '../../lib/download-handler.js';
export const onRequest = ({request,env}) => { const url = new URL(request.url); if(url.hostname === 'www.stedflo.com'){url.hostname='stedflo.com';return Response.redirect(url.toString(),308);} return handleDownload(request,env); };
