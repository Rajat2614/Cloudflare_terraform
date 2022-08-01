const POSTKEY = null;

const DELETEKEY = null;

const KV_NAMESPACE = KV;

async function handleRequest(request) {
  try {
    const host = request.headers.get("host");

    const path = new URL(request.url).pathname;

    function getUrlParam(key) {
      return new URL(request.url).searchParams.get(key);
    }

    switch (request.method) {
      case "OPTIONS": {
        /**  Handle Preflight */
        return jsonResponse({
          data: { msg: "Preflight request success 🤝" },
        });
      }
      case "POST": {
        /**  Handle POST */
        if (POSTKEY && getUrlParam("key") !== POSTKEY) {
          /**  Unauthorized */
          return jsonResponse({
            data: { status: false, msg: "Invalid key, Unauthorized!" },
            status: 403,
          });
        } else {
 
          var payload = await request.json();

          var save = await savePayload(payload);

          /**  Send response */
          return jsonResponse({
            data: {
              status: true,
              _id: save._id,
              query: `https://${host}/${save._id}`,
              data: save,
            },
          });
        }
      }
      case "GET": {
        /**  Handle GET */
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
      }
      case "DELETE": {
        if (DELETEKEY && getUrlParam("key") !== DELETEKEY) {
          /**  Unauthorized */
          return jsonResponse({
            data: { status: false, msg: "Invalid key, Unauthorized!" },
            status: 403,
          });
        } else {
          /**  Authorized to delete payload */

          await KV_NAMESPACE.delete(path.substring(1));
          return jsonResponse({
            data: {
              status: true,
              msg: "Deleted Successfully",
            },
          });
        }
      }
      default: {
        /**  Handle unknown request */
        throw new Error("Invalid request method");
      }
    }
  } catch (error) {
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
    payload._id =
      new Date().getTime() + Math.random().toString(36).substring(9);
  await KV_NAMESPACE.put(payload._id, JSON.stringify(payload));
  return payload;
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});