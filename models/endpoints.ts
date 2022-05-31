type MethodTypes = 'GET' | 'POST' | 'PUT' | 'DELETE';
export interface IEndpoints {
  methods: MethodTypes;
  endpoint: string;
  body?: string;
}

export interface IUpdateEndpointsRequest {
  endpoint: string;
  update: {
    methods: MethodTypes;
    endpoint?: string;
  };
}
export interface ICreateEndpointsRequest {
  endpoint: string;
  methods: MethodTypes;
  body: string;
}

export interface IDeleteEndpointsRequest {
  endpoint: string;
}

export interface IFrontendConfigRequest {
  group: number;
  url: string;
  name: string;
}
