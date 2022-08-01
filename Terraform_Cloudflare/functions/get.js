const KV_NAMESPACE = KV;

async function handleRequest(request) {
  try 
  {
    const path = new URL(request.url).pathname;

    if (path === "/") {
      const getAll = await KV_NAMESPACE.list();
      return jsonResponse({
        data: getAll.keys,
      });
    } else {
        var getData = await KV_NAMESPACE.get(path.substring(1));
        if (getData) {
            return jsonResponse({
                data: JSON.parse(getData),
            });
        } else {
            return jsonResponse({
                data: {
                    status: false,
                    msg: "Not Found",
                },
                status: 404,
            });
        }
    }
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

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});