export async function getDataFromAPI(url, method = "GET", headers = {}, body = null) {
  try {
      const options = {
          method,
          headers: {
              "Content-Type": "application/json",
          },
          
      };

      if (method === "POST" && body) {
          options.body = JSON.stringify(body);
      }

      const res = await fetch(url, options);

      if (!res.ok) {
          throw new Error("Failed to fetch data");
      }

      return await res.json();
  } catch (error) {
      return { error: error.message };
  }
}
