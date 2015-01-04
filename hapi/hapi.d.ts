// Type definitions for hapi v8.x.x
// Project: https://github.com/hapijs/hapi
// Definitions by: Giovanni Carnel <http://github.com/g10>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../node/node.d.ts" />

declare module "hapi" {

    import events = require("events");
    import http = require("http");

    /**
     * Server
     */

    export class Server extends events.EventEmitter {

        app: any;

        connections: ServerConnection[];

        info: ServerInfo;

        load: ServerLoad;

        listener: http.Server;

        methods: any;

        mime: any;

        plugins: {

            [name: string]: any;
        };

        realm: ServerRealm;

        root: any;

        settings: any;

        version: string;

        new(options?: ServerConfig): Server;

        after(method: (plugin: any, next: (err: any) => void) => void, dependencies?: any) : void;

        auth: {

            default(options: string) : void;
            default(options: AuthStrategy) : void;
            default(options: AuthStrategy[]) : void;

            scheme(name: string, scheme: (server: Server, options?: any) => AuthScheme): void;

            strategy(name: string, scheme: string, mode?: boolean, options?: any): void;
            strategy(name: string, scheme: string, mode?: string, options?: any): void;

            test(strategy: string, request: Request, next: (err: any, credentials: any) => void) : void;
        };

        bind(context: any): void;

        cache(options: CachePolicy): void;

        connection(options?: ServerConnection): Server;

        decorate(type: string, property: string, method: () => void): void;

        dependency(dependencies: string, after?: (server: string, next: (err: any) => void) => void): void;

        expose(key: string, value: any): void;
        expose(obj: any): void;

        ext(event: string, method: (request: Request, reply: Reply, bind?: any) => void, options?: {before: string; after: string; bind: any}): void;
        ext(event: string, method: (request: Request, reply: Reply, bind?: any) => void, options?: {before: string[]; after: string[]; bind: any}): void;
        ext(event: string, method: Array<(request: Request, reply: Reply, bind?: any) => void>, options?: {before: string; after: string; bind: any}): void;
        ext(event: string, method: Array<(request: Request, reply: Reply, bind?: any) => void>, options?: {before: string[]; after: string[]; bind: any}): void;

        handler(name: string, method: (route: Route, options: any) => any): void;

        inject(options: string, callback: (res: ServerInjectResponse) => any): void;
        inject(options: ServerInjectConfig, callback: (res: ServerInjectResponse) => any): void;

        log(tags: string, data?: string, timestamp?: number): void;
        log(tags: string, data?: any, timestamp?: number): void;
        log(tags: string[], data?: string, timestamp?: number): void;
        log(tags: string[], data?: any, timestamp?: number): void;

        lookup(id: string): Route;

        match(method: string, path: string, host?: string): Route;

        method(name: string, method: ServerMethod, options?: ServerMethodConfig): void;
        method(name: string, method: any, options?: ServerMethodConfig): void;
        method(methods: any): void;

        path(relativeTo: string): void;

        register(plugins: any, callback: (err: any) => any): void;
        register(plugins: any, options: any, callback: (err: any) => any): void;

        render(template: string, callback: (err: any, rendered: string, config: any) => any);
        render(template: string, context: any, callback: (err: any, rendered: string, config: any) => any);
        render(template: string, context: any, options: any, callback: (err: any, rendered: string, config: any) => any);

        route(options: RouteConfig): void;
        route(options: RouteConfig[]): void;

        select(labels: string): Server;
        select(labels: string[]): Server;

        start(callback?: (err: any) => any): void;

        state(name: string, options?: CookieConfig): void;

        stop(callback: () => any): void;
        stop(options: { timeout: number }, callback: () => any): void;

        table(host?: string): RoutingTable;

        views(options: ViewsConfig): void;

        on(event: string, listener: Function): events.EventEmitter;
        on(event: "log", listener: (event: ServerEvent, tags: { [key:string]: boolean }) => void): events.EventEmitter;
        on(event: "request", listener: (request: Request, event: ServerEvent, tags: { [key:string]: boolean }) => void): events.EventEmitter;
        on(event: "request-internal", listener: (request: Request, event: ServerEvent, tags: { [key:string]: boolean }) => void): events.EventEmitter;
        on(event: "request-error", listener: (request: Request, err: any) => void): events.EventEmitter;
        on(event: "response", listener: (request: Request) => void): events.EventEmitter;
        on(event: "tail", listener: (request: Request) => void): events.EventEmitter;

    }

    export interface ServerEvent {

        timestamp: number;

        request?: number;

        server?: string;

        tags: string[];

        data?: any;

        internal: boolean;
    }

    export interface ServerConfig {

        app?: any;

        cache?: any;

        connections?: any;

        debug?: any;

        files?: {

            etagsCacheMaxSize?: number;
        };

        load?: {

            sampleInterval?: number;
        };

        mime?: any;

        minimal?: boolean;

        plugins?: any;
    }

    export interface ServerConnection {

        host?: string;

        address?: string;

        //port?: number;
        //port?: string;
        port?: any;

        uri?: string;

        //listener?: http.Server;
        listener?: any;

        autoListen?: boolean;

        cache?: {

            statuses: number[];
        };

        //labels?: string;
        //labels?: string[];
        labels?: any;

        tls: any;

        table(): Route[];
    }

    export interface ServerInfo {

        id: string;

        created: number;

        started: number;

        port: number;

        host: string;

        address: string;

        protocol: string;

        uri: string;
    }

    export interface ServerLoad {

        eventLoopDelay: number;

        heapUsed: number;

        rss: number;
    }

    export interface ServerRealm {

        modifiers: {

            route: {

                prefix: string;

                vhost: any;
            };

            plugin: string;

            plugins: {

                [name: string]: any;
            };

            settings: {

                files: {

                    relativeTo: any;
                };

                bind: any;
            };
        };
    }

    export interface AuthStrategy {

    }

    export interface AuthScheme {

        authenticate: (request: Request, reply: Reply) => any;

        payload?: (request: Request, reply: Reply) => any;

        response?: (request: Request, reply: Reply) => any;

        options?: {

            payload: boolean;
        };
    }

    export interface CachePolicy {

        expiresIn?: number;

        expiresAt?: string;

        generateFunc?: (id: string, next: (err: any, value: any, ttl: number) => void) => any;

        staleIn?: number;

        staleTimeout?: number;

        generateTimeout?: number;

        cache?: string;

        segment?: string;

        shared?: boolean;
    }

    export interface ServerInjectConfig {

        method: string;

        url: string;

        headers?: {

            [key: string]: string;
        };

        //payload?: string;
        payload?: any;

        credentials?: any;

        simulate: {

            error?: boolean;

            close?: boolean;

            end?: boolean;
        }
    }

    export interface ServerInjectResponse {

        statusCode: number;

        headers: {

            [key: string]: string;
        };

        payload: string;

        rawPayload: any;

        raw: {

            req: Request;

            res: any;
        };

        result: any;
    }

    export interface ServerMethod {

    }

    export interface ServerMethodConfig {

        bind?: any;

        cache?: any;

        callback?: any;

        generateKey?: any;
    }

    export interface CookieConfig {

        ttl?: number;

        isSecure?: boolean;

        isHttpOnly?: boolean;

        path?: string;

        domain?: string;

        autoValue?: (request: Request, next: (err: any, value: any) => any) => any;

        encoding?: string;

        sign?: {

            integrity?: any;

            password: any;
        };

        password?: any;

        iron?: any;

        ignoreErrors?: boolean;

        clearInvalid?: boolean;

        strictHeader?: boolean;

        passThrough?: any;
    }

    export interface RoutingTable {

        [uri: string]: Route;
    }

    export interface ViewsConfig {

        engines: {

            [ext: string]: any;
        };

        defaultExtension?: string;

        path?: string;

        partialsPath?: string;

        helpersPath?: string;

        relativeTo?: string;

        //layout?: boolean;
        //layout?: string;
        layout?: any;

        layoutPath?: string;

        layoutKeyword?: string;

        encoding?: string;

        isCached?: boolean;

        allowAbsolutePaths?: boolean;

        allowInsecureAccess?: boolean;

        compileOptions?: any;

        runtimeOptions?: any;

        contentType?: string;

        compileMode?: string;

        //context?: () => any;
        context?: any;
    }


    /**
     * Requests
     */

    export class Request extends events.EventEmitter {

        app: any;

        auth: {

            isAuthenticated: boolean;

            credentials: any;

            artifacts: any;

            mode: string;

            error: any;

            session: any;
        };

        domain: any;

        headers: any;

        id: string;

        info: {

            received: number;

            responded: number;

            remoteAddress: string;

            remotePort: number;

            referrer: string;

            host: string;

            hostname: string;
        };

        method: string;

        mime: string;

        orig: {

            params: any;

            query: any;

            payload: any;
        };

        params: {

            [key:string]: string;
        };

        paramsArray: string[];

        path: string;

        payload: any;

        plugins: {

            [name: string]: string;
        };

        pre: {

            [key: string]: string;
        };

        //response: Response;
        response: any;

        preResponses: {

            [key: string]: string;
        };

        query: any;

        raw: {

            req: any;

            res: any;
        };

        route: Route;

        server: Server;

        session: any;

        state: {

            [cookie: string]: string;
        };

        url: string;

        setUrl(url: string): void;

        setMethod(method: string): void;

        log(tags: string, data?: string, timestamp?: number): void;
        log(tags: string, data?: any, timestamp?: number): void;
        log(tags: string[], data?: string, timestamp?: number): void;
        log(tags: string[], data?: any, timestamp?: number): void;

        getLog(): string[];
        getLog(tags: string, internal?: boolean): string[];
        getLog(tags: string[], internal?: boolean): string[];
        getLog(internal: boolean): string[];

        tail(name?: string): Function;

        on(event: string, listener: Function): events.EventEmitter;
        on(event: "peek", listener: (chunk: string, encoding: string) => void): events.EventEmitter;
    }

    export interface Route {

        path: string;

        method: string;

        vhost?: any;

        realm?: ServerRealm;

        settings: RouteConfig;
    }

    export interface RouteConfig {

        path: string;

        method: string;

        //vhost?: string;
        //vhost?: string[];
        vhost?: any;

        //handler?: string;
        //handler?: (request: Request, reply: Reply) => void;
        //handler?: {

        //  [type: string]: string;
        //  [type: string]: (request: Request) => string;
        //"file": FileRouteHandler;
        //"directory": DirectoryRouteHandler;
        //"proxy": ProxyRouteHandler;
        //"view": ViewRouteHandler;
        //};
        handler?: any;

        config?: RouteConfigOptions;
    }

    export interface RouteConfigOptions {

        description?: string;

        //notes?: string;
        //notes?: string[];
        notes?: any;

        tags?: string[];

        //

        app?: string;

        //auth?: boolean;
        //auth?: string;
        //auth?: {

        //  mode?: string;

        //  strategies?: string[];

        //  payload?: boolean;
        //  payload?: string;

        //  scope?: string;
        //  scope?: string[];

        //  entity?: string;
        //};
        auth?: any;

        bind?: any;

        cache?: {

            privacy?: string;

            expiresIn?: number;

            expiresAt?: number;
        };

        //cors?: boolean;
        //cors?: {

        //  origin: string[];

        //  matchOrigin?: boolean;

        //  isOriginExposed?: boolean;

        //  maxAge?: number;

        //  headers?: string[];

        //  additionalHeaders?: string[];

        //  methods?: string[];

        //  additionalMethods?: string[];

        //  exposedHeaders?: string[];

        //  additionalExposedHeaders?: string[];

        //  credentials?: boolean;

        //  override?: boolean;
        //};
        cors?: any;

        files?: {

            relativeTo: string;
        }

        //handler?: string;
        //handler?: (request: Request, reply: Reply) => void;
        //handler?: {

        //  [type:string]: any;
        //};
        handler?: any;

        //id?: string;
        //id?: number;
        id?: any;

        json?: {

            replacer?: any;

            space?: number;

            suffix?: string;
        }

        jsonp?: string;

        payload?: {

            output?: string;

            //parse?: boolean;
            //parse?: string;
            parse?: any;

            //allow?: string;
            //allow?: string[];
            allow?: any;

            override?: string;

            maxBytes?: number;

            //client?: boolean;
            //client?: number;
            client?: any;

            uploads?: string;

            failAction?: string;
        };

        plugins?: any;

        response?: {

            schema?: any;

            status?: any;

            sample?: number;

            failAction?: string;

            modify?: boolean;

            options?: any;
        };

        //security?: boolean;
        //security?: {

        //  hsts?: boolean;
        //  hsts?: {

        //    maxAge?: number;

        //    includeSubdomains?: boolean;
        //  };

        //  xframe?: boolean;
        //  xframe?: {

        //    rule?: string;

        //    source?: string;
        //  }

        //  xss?: boolean;

        //  noOpen?: boolean;

        //  noSniff?: boolean;
        //};
        security?: any;

        state?: {

            parse?: boolean;

            failAction?: string;
        };

        validate?: {

            //headers?: boolean;
            //headers?: (value: any, options: any, next: (err: any, value: any) => void) => void;
            headers?: any;

            //params?: boolean;
            //params?: (value: any, options: any, next: (err: any, value: any) => void) => void;
            params?: any;

            //query?: boolean;
            //query?: (value: any, options: any, next: (err: any, value: any) => void) => void;
            query?: any;

            //payload?: boolean;
            //payload?: (value: any, options: any, next: (err: any, value: any) => void) => void;
            payload?: any;

            errorFields?: any;

            //failAction?: string;
            //failAction?: (request: Request, reply: Reply, source: string, error: any) => void;
            failAction?: any;

            options?: any;
        };

        timeout?: {

            //server?: boolean;
            //server?: number;
            server?: any;

            //socket?: boolean;
            //socket?: number;
            socket?: any;
        };

    }

    export interface FileRouteHandler {

        //path: string;
        //path: (request: Request) => string;
        path: any;

        filename?: string;

        //mode?: boolean;
        //mode?: string;
        mode?: any;

        lookupCompressed?: boolean;
    }

    export interface DirectoryRouteHandler {

        //path: string;
        //path: string[];
        //path: (request: Request) => string;
        //path: (request: Request) => string[];
        path: any;

        index?: boolean;

        listing?: boolean;

        showHidden?: boolean;

        redirectToSlash?: boolean;

        lookupCompressed?: boolean;

        defaultExtension?: string;
    }

    export interface ProxyRouteHandler {

        host?: string;

        port?: number;

        protocol?: string;

        uri?: string;

        passThrough?: boolean;

        localStatePassThrough?: boolean;

        acceptEncoding?: boolean;

        rejectUnauthorized?: boolean;

        xforward?: boolean;

        //redirects?: boolean;
        //redirects?: number;
        redirects?: any;

        timeout?: number;

        mapUri?: (request: Request, callback: (err: any, uri: string, headers?: {
            [key: string]: string;
        }) => void) => void;

        onResponse?: (err: any, res: any, request: Request, reply: Reply, settings: ProxyRouteHandler, ttl: number) => void;

        ttl?: number;

        agent?: any;

        //maxSockets?: boolean;
        //maxSockets?: number;
        maxSockets?: any;
    }

    export interface ViewRouteHandler {

        template: string;

        context?: {
            payload: any;
            params: any;
            query: any;
            pre: any;
        }

        options?: any;
    }


    /**
     * Reply interface
     */

    export interface Reply {

        (err?: any, result?: any): Response;
        (err?: any, result?: any, data?: any): Response;

        continue(data?: any): void;

        file(path: string, options?: {

            filename?: string;

            //mode?: boolean;
            //mode?: string;
            mode?: any;

            lookupCompressed?: boolean;
        }): void;

        view(template: string, context?: any, options?: any): Response;

        close(options?: {

            end?: boolean;
        }): void;

        proxy(options: ProxyRouteHandler): void;

        redirect(uri: string): Response;
    }

    export class Response extends events.EventEmitter {

        statusCode: number;

        source: any;

        variety: string;

        app: any;

        plugins: any;

        settings: {

            charset: string;

            encoding: string;

            passThrough: boolean;

            stringify: any;

            ttl: number;

            varyEtag: boolean;
        };

        bytes(length: number): Response;

        charset(charset: string): Response;

        code(statusCode: number): Response;

        created(uri: string): Response;

        encoding(encoding: string): Response;

        etag(tag: string, options: {
            weak?: boolean;
            vary?: boolean;
        }): Response;

        header(name: string, value: string, options?: {
            append?: boolean;
            separator?: string;
            override?: boolean;
        }): Response;

        location(uri: string): Response;

        redirect(uri: string): Response;

        replacer(method: Function): Response;
        replacer(method: Function[]): Response;

        spaces(count: number): Response;

        state(name: string, value: string, options?: {
            [key: string]: any;
        }): Response;

        suffix(suffix: string): Response;

        ttl(msec: number): Response;

        type(mimeType: string): Response;

        unstate(name: string, options?: {
            [key: string]: any;
        }): Response;

        vary(header: string): Response;

        //

        on(event: string, listener: Function): events.EventEmitter;
        on(event: "peek", listener: (chunk: string, encoding: string) => void): events.EventEmitter;

        //

        temporary(isTemporary: boolean): Response;

        permanent(isPermanent: boolean): Response;

        rewritable(isRewritable: boolean): Response;

        //

        hold(): void;

        send(): void;
    }


}
