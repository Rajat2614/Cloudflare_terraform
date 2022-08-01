const KV_NAMESPACE = KV;

async function handleRequest(request) {
  try 
  {
    const host = request.headers.get("host");
    var payload = await request.json();
    // {"data" : "Bye World"}
    var save = await savePayload(payload);
    // {"_id" : "123whdakhwdka", "data" : "Bye World"}
    return jsonResponse({
      data: {
        status: true,
        _id: save._id,
        query: `https://${host}/${save._id}`,
        data: save,
      },
    });
  }catch (error) {
    return jsonResponse({
      data: { status: false, msg: error.message },
      status: 500,
    });
  }
}

function jsonResponse({ data = null, status = 200}) {
  return new Response(JSON.stringify(data), {
    status,
  });
}

async function savePayload(payload) {
  if (!payload._id)
    payload._id = new Date().getTime() + Math.random().toString(36).substring(9);
  await KV_NAMESPACE.put(payload._id, JSON.stringify(payload));
  return payload;
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});