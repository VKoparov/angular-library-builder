# ngx-socksjs

SocksJS module for Angular

## Description

Socket.IO inspired wrapper over Stomp Websocket for Angular.

## Install

Since this is a wrapper of already existing Angular Stomp library, first install the core one:

1. `npm i @stomp/ng2-stompjs`

and then the wrapper.

2. `npm install ngx-socksjs`

## How to use

### Import and configure SocksJSModule

```ts
import { SocksJSModule } from 'ngx-socksjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SocksJSModule.forRoot({ url: 'ws://<domain>:<port>/<server_endpoint>', options: {} })
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

We need to configure `SocksJSModule` module using the object `config` of type `SocksConfig`.

Now we pass the configuration to the static method `forRoot` of `SocksJSModule`

### Using your SocksJS Instance

The `SocksJSModule` provides now a configured `Socket` service that can be injected anywhere inside the `AppModule`.

```typescript
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SocksJS } from 'ngx-socksjs';

@Injectable({ providedIn: 'root' })
export class SocketService {

  constructor(
    private socksJS: SocksJS
  ) { }

  onEvent(): Observable<any> {
    return this.socksJS.fromEvent<any>('/receive');
  }

  send(payload: any): void {
    this.socksJS.emit('/send', payload);
  }
}
```

## API

Most of the functionalities here you are already familiar with.

The only addition is the `fromEvent` method, which returns an `Observable` that you can subscribe to.

### `socksJS.emit(eventName: string, payload: any): void`

Sends a message to the server.
Works the same as in Socket.IO.

### `socksJS.fromEvent<T>(eventName: string): Observable<T>`

Takes an event name and returns an Observable that you can subscribe to.

## LICENSE

MIT
