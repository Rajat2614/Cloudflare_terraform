const KV_NAMESPACE = KV;

async function handleRequest(request) {
    try {
        const path = new URL(request.url).pathname;
        await KV_NAMESPACE.delete(path.substring(1));
        return jsonResponse({
            data: {
                status: true,
                msg: "Deleted Successfully",
            },
        });
    } catch (error) {
        return jsonResponse({
            data: { status: false, msg: error.message },
            status: 500,
        });
    }
}

function jsonResponse({ data = null, status = 200 }) {
    return new Response(JSON.stringify(data), {
        status,
    });
}

addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
});