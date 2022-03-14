const toJson = (response: Response) => response.json();

export class Fetch {
  static get = (endpoint: string, options?: RequestInit) =>
    fetch(`${process.env.SERVICE_URL}/${endpoint}`, options).then(toJson);

  static post = (
    endpoint: string,
    body: Record<string, string | number | boolean>
  ) =>
    Fetch.get(endpoint, {
      body: JSON.stringify(body),
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    });

  static patch = (
    endpoint: string,
    body: Record<string, string | number | boolean>
  ) =>
    Fetch.get(endpoint, {
      body: JSON.stringify(body),
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
    });
}
