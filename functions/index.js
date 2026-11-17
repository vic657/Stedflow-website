export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.hostname === 'www.stedflo.com') { url.hostname = 'stedflo.com'; return Response.redirect(url.toString(), 308); }
  return context.next();
}
