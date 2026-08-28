export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let response = await env.ASSETS.fetch(request);
    if (response.status === 404 && !url.pathname.split('/').pop().includes('.')) {
      const path = url.pathname.endsWith('/') ? url.pathname + 'index.html' : url.pathname + '/index.html';
      response = await env.ASSETS.fetch(new Request(new URL(path, url), request));
    }
    return response;
  }
};
