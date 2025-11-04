import { APIRequestContext, request, expect } from "@playwright/test";

export class ApiClient {
  private context!: APIRequestContext;
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async init() {
    this.context = await request.newContext({
      baseURL: this.baseUrl,
      extraHTTPHeaders: {
        "Content-Type": "application/json",
      },
    });
  }

  async get(endpoint: string, params?: Record<string, string>) {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    const response = await this.context.get(`${endpoint}${query}`);
    //expect(response.ok()).toBeTruthy();
    return response;
  }

  async post(endpoint: string, body: object) {
    const response = await this.context.post(endpoint, { data: body });
    expect(response.ok()).toBeTruthy();
    return response;
  }

  async put(endpoint: string, body: object) {
    const response = await this.context.put(endpoint, { data: body });
    expect(response.ok()).toBeTruthy();
    return response;
  }

  async delete(endpoint: string) {
    const response = await this.context.delete(endpoint);
    expect(response.ok()).toBeTruthy();
    return response;
  }

  async close() {
    await this.context.dispose();
  }
}